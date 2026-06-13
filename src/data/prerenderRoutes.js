import { caseStudyProjects, sectorPages } from './projects.js';

export const indexableBlogSlugs = [
  'site-internet-professionnel-entreprise-france-2026',
  'combien-coute-creation-site-web-professionnel-france',
  'application-web-sur-mesure-rentable-entreprises',
  'automatisation-intelligence-artificielle-gagner-temps-chiffre-affaires',
  'etre-trouve-google-entreprise-locale-france',
  'combien-coute-creation-site-internet-beziers-2026',
  'comment-choisir-son-agence-web-beziers-pieges',
  'pourquoi-maintenance-site-professionnel-cruciale-tpe',
  'site-vitrine-ou-web-app-que-choisir-pour-son-activite',
  'comment-une-entreprise-locale-transforme-son-site-en-demandes-de-contact',
  'erreurs-qui-font-perdre-des-clients-sur-un-site-professionnel',
  'seo-local-entreprise-ce-qu-il-faut-vraiment-comprendre',
  'google-business-profile-et-site-web-comment-les-deux-travaillent-ensemble',
];

export const staticPrerenderRoutes = [
  '/',
  '/services',
  '/realisations',
  ...caseStudyProjects.map((project) => `/realisations/${project.slug}`),
  ...Object.keys(sectorPages).map((slug) => `/secteurs/${slug}`),
  '/a-propos',
  '/contact',
  '/blog',
  '/jobs',
  '/menu',
  '/auth',
  '/admin',
  '/404',
  '/policy',
  '/privacy-policy',
  '/cookie-policy',
];
