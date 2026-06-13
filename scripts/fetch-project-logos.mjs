import fs from 'node:fs/promises';
import path from 'node:path';
import { publicProjects } from '../src/data/projects.js';

const rootDir = path.resolve(import.meta.dirname, '..');
const auditDir = path.join(rootDir, '.audit', 'projects');
const logoDir = path.join(rootDir, 'public', 'projects', 'logos');
const manifestPath = path.join(rootDir, 'src', 'data', 'projectLogoManifest.json');

await fs.mkdir(logoDir, { recursive: true });

const extensionFor = (contentType, url) => {
  if (contentType.includes('svg')) return 'svg';
  if (contentType.includes('webp')) return 'webp';
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return 'jpg';
  if (contentType.includes('icon') || /\.ico(?:\?|$)/i.test(url)) return 'ico';
  return 'png';
};

const getIconHref = (html) => {
  const links = [
    ...html.matchAll(/<link[^>]+rel=["'][^"']*(?:apple-touch-icon|icon)[^"']*["'][^>]+href=["']([^"']+)/gi),
    ...html.matchAll(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*(?:apple-touch-icon|icon)/gi),
  ];
  return links[0]?.[1] || null;
};

const manifest = {};

for (const project of publicProjects) {
  const htmlPath = path.join(auditDir, `${project.id}.html`);

  try {
    const html = await fs.readFile(htmlPath, 'utf8');
    const href = getIconHref(html);
    if (!href || href.startsWith('data:')) continue;

    const iconUrl = new URL(href, project.url).href;
    const response = await fetch(iconUrl, { signal: AbortSignal.timeout(20000) });
    if (!response.ok) continue;

    const content = Buffer.from(await response.arrayBuffer());
    if (content.length < 100) continue;

    const extension = extensionFor(response.headers.get('content-type') || '', iconUrl);
    const filename = `${project.id}.${extension}`;
    await fs.writeFile(path.join(logoDir, filename), content);
    manifest[project.id] = `/projects/logos/${filename}`;
    process.stdout.write(`${project.id}: ${filename}\n`);
  } catch {
    // The project screenshot remains the visual fallback.
  }
}

for (const project of publicProjects) {
  if (manifest[project.id]) continue;
  try {
    await fs.access(path.join(logoDir, `${project.id}.png`));
    manifest[project.id] = `/projects/logos/${project.id}.png`;
  } catch {
    // No reliable standalone brand mark was published by this deployment.
  }
}

await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
