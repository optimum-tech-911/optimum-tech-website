import React from 'react';
import { Helmet } from 'react-helmet-async';
import { buildCanonicalUrl, buildEntityGraph } from '../data/schema';

export const SEO = ({
  path,
  title = '',
  description = '',
  image = 'https://optimutech.fr/apple-touch-icon.png',
  robots = 'index, follow',
  type = 'website',
  schema,
  keywords,
}) => {
  const canonical = buildCanonicalUrl(path);
  const schemaItems = Array.isArray(schema) ? schema : schema ? [schema] : [];
  const entityGraph = robots.startsWith('noindex') ? [] : buildEntityGraph();
  const allSchemaItems = [...entityGraph, ...schemaItems];

  return (
    <Helmet>
      <html lang="fr" />
      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="robots" content={robots} />
      <meta name="author" content="Optimum Tech" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Optimum Tech" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Optimum Tech" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {allSchemaItems.map((item, index) => (
        <script key={`${path || 'page'}-schema-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};
