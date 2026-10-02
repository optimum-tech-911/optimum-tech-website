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
  // Service providers and publishers refer to the same business identity.
  professionalService: `${baseUrl}/#organization`,
};

const businessDescription =
  'Optimum Tech accompagne les entreprises et cabinets dentaires de Montpellier, Sète et de l’Hérault : création de sites internet, plateformes et applications web sur mesure, logiciels métier et référencement local.';

const areasServed = [
  { '@type': 'City', name: 'Montpellier' },
  { '@type': 'City', name: 'Sète' },
  { '@type': 'City', name: 'Frontignan' },
  { '@type': 'City', name: 'Béziers' },
  { '@type': 'AdministrativeArea', name: 'Hérault' },
  { '@type': 'AdministrativeArea', name: 'Occitanie' },
  { '@type': 'Country', name: 'France' },
];

const serviceCatalog = {
  '@type': 'OfferCatalog',
  name: 'Services digitaux Optimum Tech',
  itemListElement: [
    ['Création de site web professionnel', '/creation-site-web'],
    ['Création de site internet pour cabinet dentaire', '/site-internet-dentiste'],
    ['Plateforme et application web sur mesure', '/application-web-sur-mesure'],
    ['Logiciel et outil métier sur mesure', '/logiciel-sur-mesure'],
    ['Référencement SEO local', '/referencement-seo'],
    ['Automatisation IA', '/automatisation-ia'],
  ].map(([name, path]) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      '@id': `${buildCanonicalUrl(path)}#service`,
      name,
      url: buildCanonicalUrl(path),
      provider: { '@id': schemaIds.organization },
    },
  })),
};

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
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteMeta.addressLocality,
      addressRegion: 'Occitanie',
      addressCountry: 'FR',
    },
    areaServed: areasServed,
    hasOfferCatalog: serviceCatalog,
    sameAs: [siteMeta.socialLinks.instagram, siteMeta.googleBusinessProfile],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteMeta.phone,
      email: siteMeta.email,
      contactType: 'customer service',
      areaServed: 'FR',
      availableLanguage: ['fr', 'en', 'es', 'ar'],
    },
    knowsAbout: [
      'Création de site web',
      'Site internet pour dentiste et cabinet dentaire',
      'Création de plateforme web',
      'Design UX et UI',
      'Application web sur mesure',
      'Logiciel métier',
      'Référencement SEO local',
      'Automatisation par intelligence artificielle',
    ],
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
];

export const buildWebPageSchema = ({ path, title, description, dateModified }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${buildCanonicalUrl(path)}#webpage`,
  url: buildCanonicalUrl(path),
  name: title,
  description,
  ...(dateModified ? { dateModified } : {}),
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
