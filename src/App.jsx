import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Home as HomeSync } from './pages/Home';
import { Contact as ContactSync } from './pages/Contact';
import { Projects as ProjectsSync } from './pages/Projects';
import { Policy as PolicySync } from './pages/Policy';
import { Services as ServicesSync } from './pages/Services';
import { JobsPage as JobsPageSync } from './pages/Jobs';
import { MenuPage as MenuPageSync } from './pages/Menu';
import { PrivacyPolicy as PrivacyPolicySync } from './pages/PrivacyPolicy';
import { CookiePolicy as CookiePolicySync } from './pages/CookiePolicy';
import { BlogPage as BlogPageSync } from './pages/Blog';
import { BlogArticlePage as BlogArticlePageSync } from './pages/BlogArticle';
import { AuthPage as AuthPageSync } from './pages/Auth';
import { AdminPanel as AdminPanelSync } from './pages/AdminPanel';
import { SeoLandingPage as SeoLandingPageSync } from './pages/SeoLandingPage';
import { AboutPage as AboutPageSync } from './pages/About';
const isServer = typeof window === 'undefined';
const Home = isServer ? HomeSync : React.lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Contact = isServer ? ContactSync : React.lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Projects = isServer ? ProjectsSync : React.lazy(() =>
  import('./pages/Projects').then((m) => ({ default: m.Projects }))
);
const Policy = isServer ? PolicySync : React.lazy(() => import('./pages/Policy').then((m) => ({ default: m.Policy })));
const Services = isServer ? ServicesSync : React.lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const JobsPage = isServer ? JobsPageSync : React.lazy(() => import('./pages/Jobs').then((m) => ({ default: m.JobsPage })));
const MenuPage = isServer ? MenuPageSync : React.lazy(() => import('./pages/Menu').then((m) => ({ default: m.MenuPage })));
const PrivacyPolicy = isServer ? PrivacyPolicySync : React.lazy(() =>
  import('./pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy }))
);
const CookiePolicy = isServer ? CookiePolicySync : React.lazy(() =>
  import('./pages/CookiePolicy').then((m) => ({ default: m.CookiePolicy }))
);
const BlogPage = isServer ? BlogPageSync : React.lazy(() => import('./pages/Blog').then((m) => ({ default: m.BlogPage })));
const BlogArticlePage = isServer ? BlogArticlePageSync : React.lazy(() =>
  import('./pages/BlogArticle').then((m) => ({ default: m.BlogArticlePage }))
);
const AuthPage = isServer ? AuthPageSync : React.lazy(() => import('./pages/Auth').then((m) => ({ default: m.AuthPage })));
const AdminPanel = isServer ? AdminPanelSync : React.lazy(() =>
  import('./pages/AdminPanel').then((m) => ({ default: m.AdminPanel }))
);
const SeoLandingPage = isServer ? SeoLandingPageSync : React.lazy(() =>
  import('./pages/SeoLandingPage').then((m) => ({ default: m.SeoLandingPage }))
);
const AboutPage = isServer ? AboutPageSync : React.lazy(() =>
  import('./pages/About').then((m) => ({ default: m.AboutPage }))
);
import { CookieBanner } from './components/CookieBanner.jsx';
import { ScrollToTop } from './components/ScrollToTop.jsx';

import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { seedProjects } from './utils/seedProjects.js';
import { hasConsent } from './utils/cookies.js';
import { initGTM, trackPageView, GA_MEASUREMENT_ID } from './utils/gtm.js';
import { localPages, servicePages } from './data/seoPages.js';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const location = useLocation();

  React.useEffect(() => {
    if (import.meta.env.DEV && import.meta.env.VITE_SEED_PROJECTS === 'true') {
      seedProjects();
    }
  }, []);

  React.useEffect(() => {
    if (!hasConsent('analytics')) return;

    initGTM({ gaId: GA_MEASUREMENT_ID });
    trackPageView({
      gaId: GA_MEASUREMENT_ID,
      path: `${location.pathname}${location.search}`,
      location: window.location.href,
      title: document.title,
    });
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div />}>
        <ScrollToTop />
        <CookieBanner />
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/services"
            element={
              <PageWrapper>
                <Services />
              </PageWrapper>
            }
          />
          {servicePages.map((page) => (
            <Route
              key={page.slug}
              path={`/${page.slug}`}
              element={
                <PageWrapper>
                  <SeoLandingPage page={page} categoryLabel="Services" />
                </PageWrapper>
              }
            />
          ))}
          {localPages.map((page) => (
            <Route
              key={page.slug}
              path={`/${page.slug}`}
              element={
                <PageWrapper>
                  <SeoLandingPage page={page} categoryLabel="Local" />
                </PageWrapper>
              }
            />
          ))}
          <Route
            path="/projects"
            element={
              <PageWrapper>
                <Projects />
              </PageWrapper>
            }
          />
          <Route
            path="/jobs"
            element={
              <PageWrapper>
                <JobsPage />
              </PageWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageWrapper>
                <Contact />
              </PageWrapper>
            }
          />
          <Route
            path="/a-propos"
            element={
              <PageWrapper>
                <AboutPage />
              </PageWrapper>
            }
          />
          <Route
            path="/blog"
            element={
              <PageWrapper>
                <BlogPage />
              </PageWrapper>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <PageWrapper>
                <BlogArticlePage />
              </PageWrapper>
            }
          />
          <Route
            path="/policy"
            element={
              <PageWrapper>
                <Policy />
              </PageWrapper>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <PageWrapper>
                <PrivacyPolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/cookie-policy"
            element={
              <PageWrapper>
                <CookiePolicy />
              </PageWrapper>
            }
          />
          <Route
            path="/menu"
            element={
              <PageWrapper>
                <MenuPage />
              </PageWrapper>
            }
          />
          <Route
            path="/auth"
            element={
              <PageWrapper>
                <AuthPage />
              </PageWrapper>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <PageWrapper>
                  <AdminPanel />
                </PageWrapper>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
