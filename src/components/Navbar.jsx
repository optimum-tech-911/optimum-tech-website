import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/Logo.png";
import { useI18n, LANG_OPTIONS } from "../i18n.jsx";
import { Globe, Menu } from "lucide-react";

const NavLink = ({ to, children, onClick, solid = false }) => {
  const location = useLocation();
  const active = location.pathname === to;
  const [pulseKey, setPulseKey] = React.useState(0);
  return (
    <Link
      to={to}
      onClick={(e) => { setPulseKey((k) => k + 1); onClick?.(e); }}
      className="relative inline-flex items-center justify-center px-4 md:px-3.5 lg:px-3 py-2 md:py-1.75 lg:py-1.75 rounded-full text-xs font-semibold text-gray-200 hover:text-white transition-all duration-200 text-center"
    >
      {active && (
        <span className="absolute inset-0 -z-10 goo-wrap">
          <motion.span
            layoutId="nav-blob"
            className="nav-blob"
            initial={false}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          />
        </span>
      )}
      <span className={active ? "electric-text text-white" : "text-white"}>{children}</span>
      {/* Background pill for links */}
      <span className={`absolute inset-0 -z-20 rounded-full border backdrop-blur-sm transition-all duration-200 ${solid ? "border-white/20 bg-white/15" : "border-white/10 bg-white/0"}`} />
      {/* Click pulse */}
      <motion.span
        key={pulseKey}
        className="electric-pulse"
        initial={{ opacity: 0.0, scale: 0.8 }}
        animate={{ opacity: [0.25, 0.12, 0], scale: [0.95, 1.2, 1.45] }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </Link>
  );
};

export const Navbar = () => {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = React.useState(false);
  const current = LANG_OPTIONS.find((l) => l.code === lang) || LANG_OPTIONS[0];
  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-6 md:px-5 lg:px-4 py-4 md:py-3 lg:py-2 sticky top-0 z-50 border-b border-white/10 bg-secondary/30 supports-[backdrop-filter]:bg-secondary/20 backdrop-blur-lg shadow-lg transition-[padding] duration-200 ease-in-out"
    >
      <Link to="/" className="flex items-center gap-3 group">
        <img src={Logo} alt="Optimum Tech logo" className="h-8 w-8 md:h-7 md:w-7 lg:h-6 lg:w-6 rounded-md shadow-glow transition-all duration-200" />
        <span className="text-xl md:text-lg lg:text-base font-extrabold font-pixelify text-white group-hover:text-gray-100 transition-colors">Optimum Tech</span>
      </Link>
      <div className="relative flex items-center gap-3">
        {/* Desktop links */}
        <div className="relative hidden md:flex gap-2.5 lg:gap-2 items-center px-1 py-1 rounded-full">
          <NavLink to="/">{t("nav.home")}</NavLink>
          <NavLink to="/projects">{t("nav.projects")}</NavLink>
          <NavLink to="/contact">{t("nav.contact")}</NavLink>
          <NavLink to="/policy">{t("nav.policy")}</NavLink>
        </div>
        {/* Desktop language */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 md:px-3.5 lg:px-3 py-2 md:py-1.75 lg:py-1.75 text-xs text-white hover:bg-white/10 transition-all duration-200 text-center"
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <Globe className="h-4 w-4" />
            <span>{current.label}</span>
          </button>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-44 rounded-lg border border-white/10 bg-secondary/80 backdrop-blur p-1 shadow-lg z-50"
              role="menu"
            >
              {LANG_OPTIONS.map((opt) => (
                <li key={opt.code}>
                  <button
                    type="button"
                    onClick={() => {
                      setLang(opt.code);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      lang === opt.code ? "bg-white/10 text-white" : "text-gray-200 hover:bg-white/10"
                    }`}
                    role="menuitem"
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </div>
        {/* Mobile controls */}
        <Link
          to="/menu"
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Link>
      </div>
    </motion.nav>
  );
};
