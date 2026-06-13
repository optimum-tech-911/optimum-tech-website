import React, { Suspense } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { CookieBanner } from './components/CookieBanner.jsx';
import { ScrollToTop } from './components/ScrollToTop.jsx';
import { hasConsent } from './utils/cookies.js';
import { installClickTracking, trackFirstPartyPageView } from './utils/analytics.js';
import {
  initGTM,
  trackPageView,
  updateAnalyticsConsent,
  GA_MEASUREMENT_ID,
  GTM_CONTAINER_ID,
} from './utils/gtm.js';

const lazyPage = (loader, exportName) =>
  React.lazy(() => loader().then((module) => ({ default: module[exportName] })));

export const pageLoaders = {
  Home: () => import('./pages/Home.jsx'),
  Services: () => import('./pages/Services.jsx'),
  SeoLandingRoute: () => import('./pages/SeoLandingRoute.jsx'),
  Projects: () => import('./pages/Projects.jsx'),
  ProjectDetailPage: () => import('./pages/ProjectDetail.jsx'),
  SectorPage: () => import('./pages/SectorPage.jsx'),
  JobsPage: () => import('./pages/Jobs.jsx'),
  Contact: () => import('./pages/Contact.jsx'),
  AboutPage: () => import('./pages/About.jsx'),
  BlogPage: () => import('./pages/Blog.jsx'),
  BlogArticlePage: () => import('./pages/BlogArticle.jsx'),
  Policy: () => import('./pages/Policy.jsx'),
  PrivacyPolicy: () => import('./pages/PrivacyPolicy.jsx'),
  CookiePolicy: () => import('./pages/CookiePolicy.jsx'),
  MenuPage: () => import('./pages/Menu.jsx'),
  AuthPage: () => import('./pages/Auth.jsx'),
  AdminRoute: () => import('./pages/AdminRoute.jsx'),
  NotFoundPage: () => import('./pages/NotFound.jsx'),
};

const pageExports = {
  Home: 'Home',
  Services: 'Services',
  SeoLandingRoute: 'SeoLandingRoute',
  Projects: 'Projects',
  ProjectDetailPage: 'ProjectDetailPage',
  SectorPage: 'SectorPage',
  JobsPage: 'JobsPage',
  Contact: 'Contact',
  AboutPage: 'AboutPage',
  BlogPage: 'BlogPage',
  BlogArticlePage: 'BlogArticlePage',
  Policy: 'Policy',
  PrivacyPolicy: 'PrivacyPolicy',
  CookiePolicy: 'CookiePolicy',
  MenuPage: 'MenuPage',
  AuthPage: 'AuthPage',
  AdminRoute: 'AdminRoute',
  NotFoundPage: 'NotFoundPage',
};

export const clientPages = Object.fromEntries(
  Object.entries(pageLoaders).map(([key, loader]) => [key, lazyPage(loader, pageExports[key])])
);

export const getPageKeyForPath = (pathname) => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';

  if (normalizedPath === '/') return 'Home';
  if (normalizedPath === '/services') return 'Services';
  if (normalizedPath === '/projects' || normalizedPath === '/realisations') return 'Projects';
  if (normalizedPath.startsWith('/realisations/')) return 'ProjectDetailPage';
  if (normalizedPath.startsWith('/secteurs/')) return 'SectorPage';
  if (normalizedPath === '/jobs') return 'JobsPage';
  if (normalizedPath === '/contact') return 'Contact';
  if (normalizedPath === '/a-propos') return 'AboutPage';
  if (normalizedPath === '/blog') return 'BlogPage';
  if (normalizedPath.startsWith('/blog/')) return 'BlogArticlePage';
  if (normalizedPath === '/policy') return 'Policy';
  if (normalizedPath === '/privacy-policy') return 'PrivacyPolicy';
  if (normalizedPath === '/cookie-policy') return 'CookiePolicy';
  if (normalizedPath === '/menu') return 'MenuPage';
  if (normalizedPath === '/auth') return 'AuthPage';
  if (normalizedPath === '/admin') return 'AdminRoute';
  if (normalizedPath.split('/').filter(Boolean).length === 1) return 'SeoLandingRoute';

  return 'NotFoundPage';
};

const PageLoader = () => (
  <div className="page-loader" role="status" aria-live="polite">
    <span className="page-loader-dot" aria-hidden="true" />
    <span>Chargement de la page...</span>
  </div>
);

const PageWrapper = ({ children }) => (
  <div id="main-content" tabIndex={-1}>
    {children}
  </div>
);

export default function App({ pages = clientPages }) {
  const location = useLocation();
  const {
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
  } = pages;

  React.useEffect(() => {
    if (import.meta.env.DEV && import.meta.env.VITE_SEED_PROJECTS === 'true') {
      import('./utils/seedProjects.js').then(({ seedProjects }) => seedProjects());
    }
  }, []);

  React.useEffect(() => {
    initGTM({ gtmId: GTM_CONTAINER_ID, gaId: GA_MEASUREMENT_ID });

    if (hasConsent('analytics')) {
      updateAnalyticsConsent(true);
    }
  }, []);

  React.useEffect(() => installClickTracking(), []);

  React.useEffect(() => {
    if (!hasConsent('analytics')) return;

    trackPageView({
      gaId: GA_MEASUREMENT_ID,
      path: `${location.pathname}${location.search}`,
      location: window.location.href,
      title: document.title,
    });
    trackFirstPartyPageView();
  }, [location.pathname, location.search]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Aller au contenu principal
      </a>
      <Suspense fallback={<PageLoader />}>
        <ScrollToTop />
        <CookieBanner />
        <Routes location={location}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/projects" element={<Navigate to="/realisations" replace />} />
            <Route path="/realisations" element={<PageWrapper><Projects /></PageWrapper>} />
            <Route path="/realisations/:slug" element={<PageWrapper><ProjectDetailPage /></PageWrapper>} />
            <Route path="/secteurs/:sectorSlug" element={<PageWrapper><SectorPage /></PageWrapper>} />
            <Route path="/jobs" element={<PageWrapper><JobsPage /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/a-propos" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
            <Route path="/blog/:slug" element={<PageWrapper><BlogArticlePage /></PageWrapper>} />
            <Route path="/policy" element={<PageWrapper><Policy /></PageWrapper>} />
            <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
            <Route path="/cookie-policy" element={<PageWrapper><CookiePolicy /></PageWrapper>} />
            <Route path="/menu" element={<PageWrapper><MenuPage /></PageWrapper>} />
            <Route path="/auth" element={<PageWrapper><AuthPage /></PageWrapper>} />
            <Route path="/admin" element={<PageWrapper><AdminRoute /></PageWrapper>} />
            <Route path="/:slug" element={<PageWrapper><SeoLandingRoute /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
        </Routes>
      </Suspense>
    </>
  );
}
