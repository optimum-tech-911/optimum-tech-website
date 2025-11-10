import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Projects } from "./pages/Projects";
import { Policy } from "./pages/Policy";
import { MenuPage } from "./pages/Menu";

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
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/policy" element={<PageWrapper><Policy /></PageWrapper>} />
        <Route path="/menu" element={<PageWrapper><MenuPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}
