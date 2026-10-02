import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { indexableRoutes } from '../src/data/prerenderRoutes.js';
import { buildCanonicalUrl } from '../src/data/schema.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const entries = [];

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
  entries.push(`  <url>\n    <loc>${buildCanonicalUrl(route)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

await fs.writeFile(path.join(rootDir, 'public', 'sitemap.xml'), xml, 'utf8');
await fs.writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
console.log(`Sitemap generated for ${entries.length} prerendered URLs.`);
