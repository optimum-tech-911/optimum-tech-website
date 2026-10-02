import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { indexableRoutes, staticPrerenderRoutes } from '../src/data/prerenderRoutes.js';
import { buildCanonicalUrl } from '../src/data/schema.js';
import { siteMeta } from '../src/data/siteMeta.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const errors = [];
const titles = new Set();
const descriptions = new Set();
const incoming = new Map(indexableRoutes.map((route) => [route, new Set()]));
const htmlPath = (route) => path.join(distDir, route.slice(1), 'index.html');
const decode = (value) => value
  .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
  .replace(/&#x([\da-f]+);/gi, (_, number) => String.fromCodePoint(parseInt(number, 16)))
  .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ').trim();
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
const check = (condition, message) => { if (!condition) errors.push(message); };

assert.equal(new Set(indexableRoutes).size, indexableRoutes.length, 'Duplicate indexable routes');
assert.equal(new Set(staticPrerenderRoutes).size, staticPrerenderRoutes.length, 'Duplicate prerender routes');

for (const route of indexableRoutes) {
  let html;
  try { html = await fs.readFile(htmlPath(route), 'utf8'); }
  catch { errors.push(`${route}: missing prerendered HTML`); continue; }
  const meta = [...html.matchAll(/<meta\b[^>]*>/g)].map((match) => attributes(match[0]));
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map((match) => attributes(match[0])).filter((item) => item.rel === 'canonical');
  const pageTitles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/g)].map((match) => decode(match[1]));
  const description = meta.filter((item) => item.name === 'description');
  const robots = meta.filter((item) => item.name === 'robots');
  check(pageTitles.length === 1 && pageTitles[0]?.length > 0, `${route}: expected one nonempty title`);
  check(!titles.has(pageTitles[0]), `${route}: duplicate title`);
  titles.add(pageTitles[0]);
  check(description.length === 1 && description[0]?.content?.length > 0, `${route}: expected one description`);
  check(!descriptions.has(description[0]?.content), `${route}: duplicate description`);
  descriptions.add(description[0]?.content);
  check(canonical.length === 1 && canonical[0]?.href === buildCanonicalUrl(route), `${route}: canonical does not match sitemap URL`);
  check(robots.length === 1 && !/\bnoindex\b|\bnone\b/.test(robots[0]?.content || ''), `${route}: not indexable`);
  check((html.match(/<h1\b/g) || []).length === 1, `${route}: expected one H1`);
  check(html.includes('<html lang="fr"'), `${route}: expected French HTML`);

  const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '');
  const visibleText = decode(visibleHtml.replace(/<[^>]*>/g, ' '));
  check(visibleText.length > 300, `${route}: missing readable page content`);
  const structuredData = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  check(structuredData.some((item) => item['@type'] === 'Organization'), `${route}: missing organization data`);
  for (const schema of structuredData) {
    if (schema['@type'] === 'FAQPage') {
      for (const question of schema.mainEntity) {
        check(visibleText.includes(decode(question.name)), `${route}: FAQ question absent from HTML`);
        check(visibleText.includes(decode(question.acceptedAnswer.text)), `${route}: FAQ answer absent from HTML`);
      }
    }
    if (schema.dateModified) {
      check(/^\d{4}-\d{2}-\d{2}$/.test(schema.dateModified), `${route}: invalid modification date`);
    }
  }

  for (const match of visibleHtml.matchAll(/<(?:a|link)\b[^>]*href="([^"]*)"[^>]*>/g)) {
    const url = new URL(decode(match[1]), buildCanonicalUrl(route));
    if (url.origin !== siteMeta.url) continue;
    const target = url.pathname.replace(/\/+$/, '') || '/';
    if (staticPrerenderRoutes.includes(target)) {
      if (target !== route && incoming.has(target)) incoming.get(target).add(route);
      if (target === route && url.hash) {
        const fragment = decodeURIComponent(url.hash.slice(1));
        check(visibleHtml.includes(`id="${fragment}"`), `${route}: missing anchor #${fragment}`);
      }
      continue;
    }
    try { await fs.access(path.join(distDir, decodeURIComponent(url.pathname).slice(1))); }
    catch { errors.push(`${route}: broken internal link ${url.pathname}`); }
  }

  const localAssets = [...html.matchAll(/<(?:img|script|source)\b[^>]*src="([^"]+)"/g)].map((match) => match[1]);
  for (const match of html.matchAll(/<(?:img|source)\b[^>]*src[Ss]et="([^"]+)"/g)) {
    localAssets.push(...match[1].split(',').map((candidate) => candidate.trim().split(/\s+/)[0]));
  }
  for (const src of localAssets) {
    const url = new URL(decode(src), buildCanonicalUrl(route));
    if (url.origin !== siteMeta.url) continue;
    try { await fs.access(path.join(distDir, decodeURIComponent(url.pathname).slice(1))); }
    catch { errors.push(`${route}: missing asset ${url.pathname}`); }
  }
}

for (const [route, links] of incoming) {
  check(route === '/' || links.size > 0, `${route}: no crawlable inbound link`);
}

const sitemap = await fs.readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
check(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'), 'Incorrect sitemap namespace');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
check(sitemapUrls.length === indexableRoutes.length, 'Sitemap route count differs from indexable routes');
check(new Set(sitemapUrls).size === sitemapUrls.length, 'Duplicate sitemap URLs');
for (const route of indexableRoutes) check(sitemapUrls.includes(buildCanonicalUrl(route)), `${route}: absent from sitemap`);

const notFound = await fs.readFile(path.join(distDir, '404.html'), 'utf8');
check(/name="robots" content="noindex, follow"/.test(notFound), '404 page must be noindex');
for (const route of ['/auth', '/admin', '/menu']) {
  const html = await fs.readFile(htmlPath(route), 'utf8');
  check(/name="robots" content="noindex, nofollow"/.test(html), `${route}: internal page must be noindex`);
}
const robots = await fs.readFile(path.join(distDir, 'robots.txt'), 'utf8');
check(/User-agent: OAI-SearchBot\s+Allow: \//.test(robots), 'Missing explicit ChatGPT search crawler access');
check(robots.includes(`Sitemap: ${siteMeta.url}/sitemap.xml`), 'robots.txt sitemap URL is incorrect');

if (errors.length) {
  console.error([...new Set(errors)].join('\n'));
  process.exitCode = 1;
} else {
  console.log(`SEO audit passed: ${indexableRoutes.length} pages, unique metadata, canonicals, readable HTML, matching FAQs, internal links, assets, sitemap and crawler rules.`);
}
