import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { indexableRoutes, staticPrerenderRoutes } from '../src/data/prerenderRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const serverEntry = pathToFileURL(path.join(distDir, 'server', 'entry-server.js')).href;

const routes = staticPrerenderRoutes;

if (new Set(routes).size !== routes.length) {
  throw new Error('Duplicate prerender routes. Check the shared route manifest.');
}

const { render } = await import(serverEntry);
const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');

const injectHelmet = (html, helmet) => {
  if (!helmet) return html;
  const htmlAttrs = helmet.htmlAttributes?.toString() || ' lang="fr"';
  const normalizedHtmlAttrs = htmlAttrs.startsWith(' ') ? htmlAttrs : ` ${htmlAttrs}`;

  return html
    .replace(/<html[^>]*>/, `<html${normalizedHtmlAttrs}>`)
    .replace('</head>', `${helmet.title?.toString() || ''}${helmet.priority?.toString() || ''}${helmet.meta?.toString() || ''}${helmet.link?.toString() || ''}${helmet.script?.toString() || ''}</head>`);
};

for (const route of routes) {
  const { appHtml, helmet } = render(route);
  const html = injectHelmet(template, helmet).replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  if (indexableRoutes.includes(route) && (!appHtml.includes('<h1') || !helmet?.title?.toString())) {
    throw new Error(`Missing page content or title for ${route}`);
  }

  const targetDir = route === '/' ? distDir : path.join(distDir, route.replace(/^\//, ''));
  await fs.mkdir(targetDir, { recursive: true });
  await fs.writeFile(path.join(targetDir, 'index.html'), html, 'utf8');

  if (route === '/404') {
    await fs.writeFile(path.join(distDir, '404.html'), html, 'utf8');
  }
}
