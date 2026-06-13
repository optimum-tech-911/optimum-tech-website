import fs from 'node:fs/promises';
import path from 'node:path';
import { publicProjects } from '../src/data/projects.js';

const rootDir = path.resolve(import.meta.dirname, '..');
const auditDir = path.join(rootDir, '.audit', 'projects');
const reportPath = path.join(rootDir, '.audit', 'project-report.json');

const featureGroups = {
  booking: ['rendez-vous', 'rendez vous', 'réservation', 'reservation', 'booking', 'appointment', 'calendar', 'calendrier'],
  commerce: ['panier', 'cart', 'checkout', 'commande', 'commander', 'order', 'click & collect', 'click and collect'],
  delivery: ['livraison', 'delivery', 'transporteur', 'expéditeur', 'expediteur', 'tracking', 'suivi colis'],
  accounts: ['connexion', 'se connecter', 'login', 'sign in', 'register', 'inscription', 'mon compte', 'account', 'profil', 'profile'],
  backOffice: ['admin', 'dashboard', 'back-office', 'back office', 'gestion', 'manage', 'management', 'staff'],
  crm: ['crm', 'client', 'customer', 'patient', 'prospect', 'contact management'],
  tracking: ['tracking', 'suivi', 'statut', 'status', 'historique', 'history'],
  payments: ['paiement', 'payment', 'stripe', 'facture', 'invoice', 'devis', 'quote'],
  documents: ['document', 'pdf', 'excel', 'spreadsheet', 'télécharger', 'download'],
  messaging: ['message', 'messagerie', 'chat', 'sms', 'notification', 'email'],
  content: ['blog', 'actualité', 'actualités', 'news', 'galerie', 'gallery'],
  multilingual: ['fr / ar', 'fr/ar', 'language', 'langue', 'traduction', 'translation'],
};

const decode = (value = '') => value
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&#x27;/g, "'")
  .replace(/&nbsp;/g, ' ')
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const getMeta = (html, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const first = html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${escaped}["'][^>]+content=["']([^"']*)`, 'i'));
  const second = html.match(new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${escaped}["']`, 'i'));
  return decode(first?.[1] || second?.[1] || '');
};

const findFeatures = (source) => {
  const normalized = source.toLocaleLowerCase('fr');
  return Object.fromEntries(Object.entries(featureGroups).map(([group, terms]) => [
    group,
    terms.filter((term) => normalized.includes(term)),
  ]).filter(([, matches]) => matches.length));
};

const report = [];

for (const [index, project] of publicProjects.entries()) {
  process.stdout.write(`[${index + 1}/${publicProjects.length}] ${project.title} ... `);
  const htmlPath = path.join(auditDir, `${project.id}.html`);

  try {
    const html = await fs.readFile(htmlPath, 'utf8');
    const scriptSources = [...html.matchAll(/<script[^>]+src=["']([^"']+\.js(?:\?[^"']*)?)["']/gi)]
      .map((match) => new URL(match[1], project.url).href)
      .slice(0, 5);
    const sourceParts = [html];

    for (const scriptUrl of scriptSources) {
      try {
        const response = await fetch(scriptUrl, { signal: AbortSignal.timeout(20000) });
        if (!response.ok) continue;
        const contentLength = Number(response.headers.get('content-length') || 0);
        if (contentLength > 6_000_000) continue;
        const script = await response.text();
        if (script.length <= 6_000_000) sourceParts.push(script);
      } catch {
        // A public page can still be reviewed from its HTML and screenshot.
      }
    }

    const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
    const description = getMeta(html, 'description') || getMeta(html, 'og:description');
    report.push({
      id: project.id,
      requestedTitle: project.title,
      url: project.url,
      title,
      description,
      features: findFeatures(sourceParts.join('\n')),
      scriptsInspected: scriptSources.length,
      image: `/projects/${project.id}.jpg`,
    });
    process.stdout.write('analyzed\n');
  } catch (error) {
    report.push({ id: project.id, url: project.url, error: error.message });
    process.stdout.write('failed\n');
  }
}

await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
