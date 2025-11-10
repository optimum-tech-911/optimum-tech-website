import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useI18n } from "../i18n.jsx";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-white/10 bg-secondary/20 supports-[backdrop-filter]:bg-secondary/10 backdrop-blur-lg">
      <div className="container mx-auto py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Optimum Tech logo" className="h-6 w-6 rounded-md" />
          <p className="text-sm text-gray-400">© 2025 Optimum Tech. {t("footer.rights")}</p>
        </div>
        <nav className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-white text-gray-300">{t("nav.home")}</Link>
          <Link to="/projects" className="hover:text-white text-gray-300">{t("nav.projects")}</Link>
          <Link to="/policy" className="hover:text-white text-gray-300">{t("nav.policy")}</Link>
          <Link to="/contact" className="hover:text-white text-gray-300">{t("nav.contact")}</Link>
        </nav>
      </div>
    </footer>
  );
};
