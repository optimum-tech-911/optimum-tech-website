import React from 'react';
import ReactDOM from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App, { clientPages, getPageKeyForPath, pageLoaders } from './App.jsx';
import './index.css';
import { I18nProvider } from './i18n.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext.jsx';

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  window.location.reload();
});

const bootstrap = async () => {
  const rootElement = document.getElementById('root');
  const currentPageKey = getPageKeyForPath(window.location.pathname);
  const currentModule = await pageLoaders[currentPageKey]();
  const pages = {
    ...clientPages,
    [currentPageKey]: currentModule[currentPageKey],
  };
  const app = (
    <React.StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <BrowserRouter>
            <I18nProvider>
              <App pages={pages} />
            </I18nProvider>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </React.StrictMode>
  );

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app);
    return;
  }

  ReactDOM.createRoot(rootElement).render(app);
};

bootstrap();
