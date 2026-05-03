import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  const base = 'https://optimutech.fr';
  const canonical = `${base}${path || '/'}`;
  const schemaItems = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <html lang="fr" />
      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <meta name="robots" content={robots} />
      <meta name="author" content="Optimum Tech" />
      <meta name="msvalidate.01" content="F5677BF31E95B5616D068583AC27DC63" />
      <meta name="theme-color" content="#0A84FF" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Optimum Tech" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {schemaItems.map((item, index) => (
        <script key={`${path || 'page'}-schema-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};
