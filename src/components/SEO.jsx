import React from "react";
import { Helmet } from "react-helmet-async";

export const SEO = ({ path, title = "", description = "" }) => {
  const base = "https://optimutech.fr";
  const canonical = `${base}${path || "/"}`;
  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://optimutech.fr/assets/og-image.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://optimutech.fr/assets/og-image.png" />
    </Helmet>
  );
};