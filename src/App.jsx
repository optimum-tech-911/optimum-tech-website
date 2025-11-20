import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
const Home = React.lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const Contact = React.lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const Projects = React.lazy(() => import("./pages/Projects").then(m => ({ default: m.Projects })));
const Policy = React.lazy(() => import("./pages/Policy").then(m => ({ default: m.Policy })));
const MenuPage = React.lazy(() => import("./pages/Menu").then(m => ({ default: m.MenuPage })));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy").then(m => ({ default: m.PrivacyPolicy })));
const CookiePolicy = React.lazy(() => import("./pages/CookiePolicy").then(m => ({ default: m.CookiePolicy })));
import { CookieBanner } from "./components/CookieBanner.jsx";
import { ScrollToTop } from "./components/ScrollToTop.jsx";

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
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div />}> 
        <ScrollToTop />
        <CookieBanner />
        <Routes>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/policy" element={<PageWrapper><Policy /></PageWrapper>} />
          <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
          <Route path="/cookie-policy" element={<PageWrapper><CookiePolicy /></PageWrapper>} />
          <Route path="/menu" element={<PageWrapper><MenuPage /></PageWrapper>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
