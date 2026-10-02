import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { indexableRoutes } from '../src/data/prerenderRoutes.js';
import { buildCanonicalUrl } from '../src/data/schema.js';

// Public ownership token: deploy the matching public/*.txt file before submitting.
export const INDEXNOW_KEY = '19f0c6f5ec0a0c3928cd8e56ecad86fe';
const origin = 'https://optimutech.fr';
const endpoint = 'https://api.indexnow.org/indexnow';
const keyLocation = `${origin}/${INDEXNOW_KEY}.txt`;
const noindex = /\b(?:noindex|none)\b/i;
const usage = `Usage: node scripts/indexnow.mjs [--submit] [/route ...]

Default: list canonical URLs without making network requests.
--submit: check the deployed key, sitemap and pages, then send one IndexNow POST.
With no routes, select all current indexable routes for the initial rollout.
For later changes, list only the changed routes, e.g. --submit / /services.
Run manually after deployment; acceptance does not mean pages are indexed.`;

export function selectUrls(args) {
  const routes = [];
  let submit = false;
  for (const arg of args) {
    if (arg === '--submit') { submit = true; continue; }
    if (arg.startsWith('-')) throw new Error(`Unknown option: ${arg}. Use --help.`);
    const route = arg === '/' ? '/' : arg.replace(/\/$/, '');
    if (!indexableRoutes.includes(route)) {
      throw new Error(`Unknown or non-indexable route: ${arg}. Use a local route from src/data/prerenderRoutes.js.`);
    }
    routes.push(route);
  }
  const urls = [...new Set((routes.length ? routes : indexableRoutes).map(buildCanonicalUrl))];
  if (!urls.length || urls.length > 10000) throw new Error('IndexNow requires 1–10,000 URLs per submission.');
  for (const url of urls) checkOrigin(url, origin);
  return { submit, urls };
}

function checkOrigin(value, expectedOrigin) {
  const url = new URL(value);
  if (url.origin !== expectedOrigin || url.username || url.password || url.hash) {
    throw new Error(`Refusing URL outside the canonical site: ${value}`);
  }
}

function decode(value) {
  return value.replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map((match) => [match[1].toLowerCase(), decode(match[2] ?? match[3] ?? match[4])]));
}

function verifyPage(url, { body, response }) {
  if (!/^(?:text\/html|application\/xhtml\+xml)(?:\s*;|$)/i.test(response.headers.get('content-type') || '')) {
    throw new Error(`${url}: expected an HTML Content-Type.`);
  }
  if (noindex.test(response.headers.get('x-robots-tag') || '')) {
    throw new Error(`${url}: X-Robots-Tag prohibits indexing.`);
  }
  const html = body.replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|template|textarea|title)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1] || '';
  const links = [...head.matchAll(/<link\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi)]
    .map((match) => attributes(match[0]));
  const canonicals = links.filter((link) => /(?:^|\s)canonical(?:\s|$)/i.test(link.rel || ''));
  if (canonicals.length !== 1 || canonicals[0].href !== url) {
    throw new Error(`${url}: expected exactly one matching canonical link in the HTML head.`);
  }
  const meta = [...html.matchAll(/<meta\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi)]
    .map((match) => attributes(match[0]));
  if (meta.some((item) => (/(?:robots|bot|spider|slurp)/i.test(item.name || '')
      || /^x-robots-tag$/i.test(item['http-equiv'] || '')) && noindex.test(item.content || ''))) {
    throw new Error(`${url}: a robots meta directive prohibits indexing.`);
  }
}

async function request(url, { fetchImpl, timeoutMs, method = 'GET', body }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let current = url;
  try {
    for (let redirects = 0; ; redirects++) {
      checkOrigin(current, method === 'POST' ? new URL(endpoint).origin : origin);
      const response = await fetchImpl(current, {
        method, redirect: 'manual', signal: controller.signal,
        headers: method === 'POST' ? { 'Content-Type': 'application/json; charset=utf-8' } : {},
        ...(body ? { body } : {}),
      });
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        await response.body?.cancel();
        if (method === 'POST') throw new Error('IndexNow redirected the POST; refusing to resend it.');
        if (redirects >= 5) throw new Error(`${url}: too many redirects.`);
        const location = response.headers.get('location');
        if (!location) throw new Error(`${current}: redirect has no Location header.`);
        current = new URL(location, current).href;
        continue;
      }
      const text = await response.text();
      if (method === 'GET' && response.status !== 200) {
        throw new Error(`${current}: expected HTTP 200, received ${response.status}. Deploy and verify the site first.`);
      }
      return { response, body: text };
    }
  } catch (error) {
    if (controller.signal.aborted) throw new Error(`${url}: request timed out after ${timeoutMs}ms.`);
    throw new Error(`${url}: ${error.message}`, { cause: error });
  } finally {
    clearTimeout(timer);
  }
}

async function checkPages(urls, options) {
  let next = 0;
  let failure;
  await Promise.all(Array.from({ length: Math.min(4, urls.length) }, async () => {
    while (!failure && next < urls.length) {
      const url = urls[next++];
      try { verifyPage(url, await request(url, options)); }
      catch (error) { failure ||= error; }
    }
  }));
  if (failure) throw failure;
}

export async function runIndexNow(args, { fetchImpl = globalThis.fetch, log = console.log, timeoutMs = 15000 } = {}) {
  if (args.length === 1 && ['--help', '-h'].includes(args[0])) { log(usage); return; }
  const { submit, urls } = selectUrls(args);
  const localKey = await fs.readFile(new URL(`../public/${INDEXNOW_KEY}.txt`, import.meta.url), 'utf8');
  if (localKey !== INDEXNOW_KEY) throw new Error('Local IndexNow key file must contain exactly the public token.');
  log(`${submit ? 'Selected' : 'Dry run:'} ${urls.length} canonical URL(s):\n${urls.join('\n')}`);
  if (!submit) {
    log(`No network requests made. Deploy ${keyLocation}, then run with --submit after deployment.\nAcceptance does not mean pages are indexed.`);
    return;
  }

  const options = { fetchImpl, timeoutMs };
  log('Checking the live key, sitemap and HTML before submitting…');
  const key = await request(keyLocation, options);
  if (key.body !== INDEXNOW_KEY) throw new Error(`${keyLocation}: live key must exactly match the public token.`);
  const sitemap = await request(`${origin}/sitemap.xml`, options);
  const xml = sitemap.body.replace(/<!--[\s\S]*?-->/g, '');
  if (!/<urlset\b/i.test(xml)) throw new Error('Live sitemap.xml must contain a URL set.');
  const locations = new Set([...xml.matchAll(/<loc\b[^>]*>([^<]+)<\/loc\s*>/gi)]
    .map((match) => decode(match[1].trim())));
  const missing = urls.filter((url) => !locations.has(url));
  if (missing.length) throw new Error(`Live sitemap is missing selected canonical URLs:\n${missing.join('\n')}`);
  await checkPages(urls, options);

  log(`Live checks passed. Submitting ${urls.length} URL(s) in one IndexNow request…`);
  const result = await request(endpoint, {
    ...options, method: 'POST',
    body: JSON.stringify({ host: new URL(origin).host, key: INDEXNOW_KEY, keyLocation, urlList: urls }),
  });
  if (![200, 202].includes(result.response.status)) {
    const reasons = { 400: 'invalid payload', 403: 'key verification failed', 422: 'URL or key mismatch', 429: 'rate limited; retry later' };
    throw new Error(`IndexNow returned HTTP ${result.response.status}: ${reasons[result.response.status] || 'submission failed'}. No automatic retry was made.`);
  }
  log(result.response.status === 202
    ? 'IndexNow received the URLs (HTTP 202); key validation is pending. Acceptance does not mean pages are indexed.'
    : 'IndexNow accepted the URLs (HTTP 200). Acceptance does not mean pages are indexed.');
  return result.response.status;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runIndexNow(process.argv.slice(2)).catch((error) => {
    console.error(`IndexNow: ${error.message}`);
    process.exitCode = 1;
  });
}
