import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { indexableRoutes } from '../src/data/prerenderRoutes.js';
import { buildCanonicalUrl } from '../src/data/schema.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const entries = [];
let imageCount = 0;
const uniqueImages = new Set();

const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const decodeHtml = (value) => value.replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
  .replace(/&#x([\da-f]+);/gi, (_, number) => String.fromCodePoint(parseInt(number, 16)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

// Read the actual built page so imported, fingerprinted images stay in sync.
// Meaningful main-content images qualify; decorative images and site chrome do not.
const contentImages = (html, canonical) => {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
  const images = new Set();
  for (const match of main.matchAll(/<img\b[^>]*>/gi)) {
    const attrs = Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)]
      .map((attr) => [attr[1].toLowerCase(), decodeHtml(attr[2])]));
    if (!attrs.src || !attrs.alt?.trim() || attrs['aria-hidden'] === 'true') continue;
    const image = new URL(attrs.src, canonical);
    if (image.origin !== new URL(canonical).origin || !/\.(?:avif|gif|jpe?g|png|webp)$/i.test(image.pathname)) continue;
    image.hash = '';
    images.add(image.href);
  }
  if (images.size > 1000) throw new Error(`Too many sitemap images on ${canonical}`);
  return [...images];
};

for (const route of indexableRoutes) {
  const html = await fs.readFile(path.join(distDir, route.slice(1), 'index.html'), 'utf8');
  // Use the authored content date. Omit unknown dates instead of guessing.
  const schemaItems = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
  const datedPage = schemaItems.find((item) => ['WebPage', 'AboutPage', 'CollectionPage', 'ContactPage', 'BlogPosting'].includes(item['@type']) && item.dateModified);
  const lastmod = datedPage?.dateModified;
  if (lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
    throw new Error(`Invalid content modification date for ${route}: ${lastmod}`);
  }
  const canonical = buildCanonicalUrl(route);
  const images = contentImages(html, canonical);
  for (const image of images) {
    // Fail the build if a sitemap would advertise an absent local image.
    await fs.access(path.join(distDir, decodeURIComponent(new URL(image).pathname).slice(1)));
    uniqueImages.add(image);
  }
  imageCount += images.length;
  const imageEntries = images.map((image) => `\n    <image:image>\n      <image:loc>${escapeXml(image)}</image:loc>\n    </image:image>`).join('');
  entries.push(`  <url>\n    <loc>${escapeXml(canonical)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}${imageEntries}\n  </url>`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`;

await fs.writeFile(path.join(rootDir, 'public', 'sitemap.xml'), xml, 'utf8');
await fs.writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
console.log(`Sitemap generated for ${entries.length} prerendered URLs, with ${imageCount} image references (${uniqueImages.size} distinct images).`);
