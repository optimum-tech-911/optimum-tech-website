import fs from 'node:fs/promises';
import path from 'node:path';
import { publicProjects } from '../src/data/projects.js';

const rootDir = path.resolve(import.meta.dirname, '..');
const captureDir = path.join(rootDir, 'public', 'projects');
const logoDir = path.join(captureDir, 'logos');
const auditDir = path.join(rootDir, '.audit', 'projects');

await fs.mkdir(captureDir, { recursive: true });
await fs.mkdir(logoDir, { recursive: true });
await fs.mkdir(auditDir, { recursive: true });

const requestedIds = new Set(process.argv.slice(2));
const projects = requestedIds.size
  ? publicProjects.filter((project) => requestedIds.has(project.id))
  : publicProjects;

for (const [index, project] of projects.entries()) {
  if (!project.url) continue;

  const imagePath = path.join(captureDir, `${project.id}.jpg`);
  const htmlPath = path.join(auditDir, `${project.id}.html`);

  process.stdout.write(`[${index + 1}/${projects.length}] ${project.title} ... `);

  try {
    const response = await fetch(project.url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
      headers: { 'user-agent': 'Mozilla/5.0 OptimumTechPortfolioAudit/1.0' },
    });
    const html = await response.text();
    await fs.writeFile(htmlPath, html, 'utf8');

    const screenshotUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=1200&h=800`;
    let screenshotResponse = await fetch(screenshotUrl, { signal: AbortSignal.timeout(60000) });
    let screenshot = Buffer.from(await screenshotResponse.arrayBuffer());

    if (!screenshotResponse.ok || screenshot.length < 15000) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      screenshotResponse = await fetch(screenshotUrl, { signal: AbortSignal.timeout(60000) });
      screenshot = Buffer.from(await screenshotResponse.arrayBuffer());
    }

    if (!screenshotResponse.ok || screenshot.length < 5000) {
      throw new Error(`Screenshot service returned ${screenshotResponse.status} (${screenshot.length} bytes)`);
    }

    await fs.writeFile(imagePath, screenshot);

    const logoResponse = await fetch(
      `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(project.url)}&sz=128`,
      { signal: AbortSignal.timeout(20000) }
    );
    const logo = Buffer.from(await logoResponse.arrayBuffer());
    if (logoResponse.ok && logo.length > 100) {
      await fs.writeFile(path.join(logoDir, `${project.id}.png`), logo);
    }
    process.stdout.write('captured\n');
  } catch (error) {
    const failure = {
      project: project.id,
      url: project.url,
      message: error.message,
      stdout: error.stdout,
      stderr: error.stderr,
    };
    await fs.writeFile(path.join(auditDir, `${project.id}.error.json`), JSON.stringify(failure, null, 2));
    process.stdout.write('failed\n');
  }
}
