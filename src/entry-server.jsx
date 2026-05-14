import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { I18nProvider } from './i18n.jsx';

export function render(url) {
  const helmetContext = {};
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <ThemeProvider initialTheme="dark">
        <StaticRouter location={url}>
          <I18nProvider initialLang="fr">
            <App />
          </I18nProvider>
        </StaticRouter>
      </ThemeProvider>
    </HelmetProvider>
  );

  return {
    appHtml,
    helmet: helmetContext.helmet,
  };
}
