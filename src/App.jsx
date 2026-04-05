import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
const Home = React.lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Contact = React.lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Projects = React.lazy(() =>
  import('./pages/Projects').then((m) => ({ default: m.Projects }))
);
const Policy = React.lazy(() => import('./pages/Policy').then((m) => ({ default: m.Policy })));
const Services = React.lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const JobsPage = React.lazy(() => import('./pages/Jobs').then((m) => ({ default: m.JobsPage })));
const MenuPage = React.lazy(() => import('./pages/Menu').then((m) => ({ default: m.MenuPage })));
const PrivacyPolicy = React.lazy(() =>
  import('./pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy }))
);
const CookiePolicy = React.lazy(() =>
  import('./pages/CookiePolicy').then((m) => ({ default: m.CookiePolicy }))
);
const BlogPage = React.lazy(() => import('./pages/Blog').then((m) => ({ default: m.BlogPage })));
const BlogArticlePage = React.lazy(() =>
  import('./pages/BlogArticle').then((m) => ({ default: m.BlogArticlePage }))
);
const AuthPage = React.lazy(() => import('./pages/Auth').then((m) => ({ default: m.AuthPage })));
const AdminPanel = React.lazy(() =>
  import('./pages/AdminPanel').then((m) => ({ default: m.AdminPanel }))
);
const SeoLandingPage = React.lazy(() =>
  import('./pages/SeoLandingPage').then((m) => ({ default: m.SeoLandingPage }))
);
const AboutPage = React.lazy(() =>
  import('./pages/About').then((m) => ({ default: m.AboutPage }))
);
import { CookieBanner } from './components/CookieBanner.jsx';
import { ScrollToTop } from './components/ScrollToTop.jsx';

import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { seedProjects } from './utils/seedProjects.js';
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
  React.useEffect(() => {
    if (import.meta.env.DEV && import.meta.env.VITE_SEED_PROJECTS === 'true') {
      seedProjects();
    }
  }, []);

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
