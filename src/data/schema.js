import { siteMeta } from './siteMeta.js';

const baseUrl = siteMeta.url;
const logoUrl = `${baseUrl}/apple-touch-icon.png`;

export const normalizePath = (path = '/') => {
  if (!path || path === '/') return '/';

  return path.endsWith('/') ? path : `${path}/`;
};

export const buildCanonicalUrl = (path = '/') => `${baseUrl}${normalizePath(path)}`;

export const schemaIds = {
  organization: `${baseUrl}/#organization`,
  website: `${baseUrl}/#website`,
  professionalService: `${baseUrl}/#professional-service`,
};

const businessDescription =
  'Optimum Tech crée des sites web professionnels, améliore la visibilité SEO locale, développe des applications web et des outils sur mesure, et met en place des automatisations utiles pour les entreprises.';

export const buildEntityGraph = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': schemaIds.organization,
    name: siteMeta.name,
    url: siteMeta.url,
    description: businessDescription,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
    },
    telephone: siteMeta.phone,
    email: siteMeta.email,
    sameAs: [siteMeta.socialLinks.instagram, siteMeta.socialLinks.linkedin],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': schemaIds.website,
    url: siteMeta.url,
    name: siteMeta.name,
    description: businessDescription,
    publisher: {
      '@id': schemaIds.organization,
    },
    inLanguage: 'fr-FR',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': schemaIds.professionalService,
    name: siteMeta.name,
    url: siteMeta.url,
    description: businessDescription,
    image: logoUrl,
    telephone: siteMeta.phone,
    email: siteMeta.email,
    areaServed: ['Sète', 'Hérault', 'Occitanie', 'France'],
    provider: {
      '@id': schemaIds.organization,
    },
  },
];

export const buildWebPageSchema = ({ path, title, description }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${buildCanonicalUrl(path)}#webpage`,
  url: buildCanonicalUrl(path),
  name: title,
  description,
  isPartOf: {
    '@id': schemaIds.website,
  },
  about: {
    '@id': schemaIds.organization,
  },
  inLanguage: 'fr-FR',
});

export const buildCollectionPageSchema = ({ path, title, description }) => ({
  ...buildWebPageSchema({ path, title, description }),
  '@type': 'CollectionPage',
});

export const buildContactPageSchema = ({ path, title, description }) => ({
  ...buildWebPageSchema({ path, title, description }),
  '@type': 'ContactPage',
});
