import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { localPages, servicePages } from '../src/data/seoPages.js';
import { indexableBlogSlugs } from '../src/data/prerenderRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');
const baseUrl = 'https://optimutech.fr';
const lastmod = '2026-05-15';

const urls = [
  ['/', 'weekly', '1.0'],
  ['/services', 'weekly', '0.95'],
  ['/projects', 'monthly', '0.75'],
  ['/a-propos', 'monthly', '0.8'],
  ['/contact', 'monthly', '0.85'],
  ['/blog', 'weekly', '0.95'],
  ['/policy', 'monthly', '0.5'],
  ['/privacy-policy', 'monthly', '0.5'],
  ['/cookie-policy', 'monthly', '0.5'],
  ...servicePages.map((page) => [`/${page.slug}`, 'weekly', '0.9']),
  ...localPages.map((page) => [`/${page.slug}`, 'weekly', '0.85']),
  ...indexableBlogSlugs.map((slug) => [`/blog/${slug}`, 'monthly', '0.8']),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ([route, changefreq, priority]) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

await fs.writeFile(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');
await fs.mkdir(distDir, { recursive: true });
await fs.writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
