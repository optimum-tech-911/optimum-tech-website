import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useI18n } from "../i18n.jsx";

export const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#0a0f18]/85 supports-[backdrop-filter]:bg-[#0a0f18]/60 backdrop-blur-xl">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="Optimum Tech logo" className="h-7 w-7 rounded-md" />
              <span className="font-semibold text-white">Optimum Tech</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              We build fast websites, apps, and AI‑powered workflows to help your business grow.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Menu</h4>
            <nav className="grid gap-2 text-sm">
              <Link to="/" className="hover:text-white text-gray-300">{t("nav.home")}</Link>
              <Link to="/projects" className="hover:text-white text-gray-300">{t("nav.projects")}</Link>
              <Link to="/policy" className="hover:text-white text-gray-300">{t("nav.policy")}</Link>
              <Link to="/contact" className="hover:text-white text-gray-300">{t("nav.contact")}</Link>
            </nav>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>Email: <a href="mailto:optimum.tech.911@gmail.com" className="underline">optimum.tech.911@gmail.com</a></li>
              <li>France • EU</li>
              <li>Mon‑Fri: 9:00–18:00 CET</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© 2025 Optimum Tech. {t("footer.rights")}</p>
          <div className="text-xs text-gray-400">Made with care — performance & accessibility first</div>
        </div>
      </div>
    </footer>
  );
};

