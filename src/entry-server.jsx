import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { I18nProvider } from './i18n.jsx';
import { Home } from './pages/Home.jsx';
import { Services } from './pages/Services.jsx';
import { SeoLandingRoute } from './pages/SeoLandingRoute.jsx';
import { Projects } from './pages/Projects.jsx';
import { ProjectDetailPage } from './pages/ProjectDetail.jsx';
import { SectorPage } from './pages/SectorPage.jsx';
import { JobsPage } from './pages/Jobs.jsx';
import { Contact } from './pages/Contact.jsx';
import { AboutPage } from './pages/About.jsx';
import { BlogPage } from './pages/Blog.jsx';
import { BlogArticlePage } from './pages/BlogArticle.jsx';
import { Policy } from './pages/Policy.jsx';
import { PrivacyPolicy } from './pages/PrivacyPolicy.jsx';
import { CookiePolicy } from './pages/CookiePolicy.jsx';
import { MenuPage } from './pages/Menu.jsx';
import { AuthPage } from './pages/Auth.jsx';
import { AdminRoute } from './pages/AdminRoute.jsx';
import { NotFoundPage } from './pages/NotFound.jsx';

const serverPages = {
  Home,
  Services,
  SeoLandingRoute,
  Projects,
  ProjectDetailPage,
  SectorPage,
  JobsPage,
  Contact,
  AboutPage,
  BlogPage,
  BlogArticlePage,
  Policy,
  PrivacyPolicy,
  CookiePolicy,
  MenuPage,
  AuthPage,
  AdminRoute,
  NotFoundPage,
};

export function render(url) {
  const helmetContext = {};
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <ThemeProvider initialTheme="dark">
        <StaticRouter location={url}>
          <I18nProvider initialLang="fr">
            <App pages={serverPages} />
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
