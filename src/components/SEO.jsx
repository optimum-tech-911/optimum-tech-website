import React from 'react';
import { Helmet } from 'react-helmet-async';
import { buildCanonicalUrl, buildEntityGraph } from '../data/schema';

export const SEO = ({
  path,
  title = '',
  description = '',
  image = 'https://optimutech.fr/apple-touch-icon.png',
  imageAlt,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  type = 'website',
  schema,
  keywords,
  publishedTime,
  modifiedTime,
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
      <meta property="og:image:alt" content={imageAlt || title || 'Optimum Tech'} />
      {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {modifiedTime ? <meta property="article:modified_time" content={modifiedTime} /> : null}

      {/* Twitter */}
      <meta name="twitter:card" content={type === 'article' ? 'summary_large_image' : 'summary'} />
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
