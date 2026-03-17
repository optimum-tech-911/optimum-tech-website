import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Logo.png';
import { useI18n, LANG_OPTIONS } from '../i18n.jsx';
import { Globe, Menu, Sun, Moon, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const active = location.pathname === to;
  const { theme } = useTheme();

  return (
    <Link
      to={to}
      onClick={(e) => {
        onClick?.(e);
      }}
      className={`relative inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'
      }`}
    >
      {active && (
        <motion.span
          layoutId="nav-active-bg"
          className={`absolute inset-0 rounded-full border backdrop-blur-md ${
            theme === 'dark' ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'
          }`}
          initial={false}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

export const Navbar = () => {
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const current = LANG_OPTIONS.find((l) => l.code === lang) || LANG_OPTIONS[0];

  const navItems = [
    { to: "/", label: t('nav.home') },
    { to: "/services", label: t('nav.services') || 'Services' },
    { to: "/projects", label: t('nav.projects') },
    { to: "/policy", label: t('nav.policy') || 'Politiques' },
    { to: "/contact", label: t('nav.contact') },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full border backdrop-blur-2xl transition-all duration-500 ${
          theme === 'dark' 
            ? 'bg-black/20 border-white/10 shadow-2xl' 
            : 'bg-gray-500/10 border-black/10 shadow-xl'
        }`}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <img src={Logo} alt="Logo" className="h-8 w-8 rounded-lg shadow-lg" />
          </motion.div>
          <span className={`text-lg font-bold tracking-tighter transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Optimum Tech
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Login Button */}
          <Link
            to="/auth"
            className={`hidden md:inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              theme === 'dark' ? 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white' : 'bg-black/5 text-black/80 hover:bg-black/10 hover:text-black'
            }`}
          >
            Log in
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              theme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'
            }`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setOpen(!open)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                theme === 'dark' ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-black hover:bg-black/10'
              }`}
            >
              <Globe size={14} />
              <span>{current.label}</span>
            </button>
            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute right-0 mt-2 w-32 rounded-2xl border p-1 shadow-2xl backdrop-blur-xl ${
                    theme === 'dark' ? 'bg-black/80 border-white/10' : 'bg-white/90 border-black/10'
                  }`}
                >
                  {LANG_OPTIONS.map((opt) => (
                    <li key={opt.code}>
                      <button
                        onClick={() => { setLang(opt.code); setOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors ${
                          lang === opt.code 
                            ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/5 text-black') 
                            : (theme === 'dark' ? 'text-white/60 hover:bg-white/5' : 'text-black/60 hover:bg-black/5')
                        }`}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full ${
              theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'
            }`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-20 left-6 right-6 p-6 rounded-[2rem] border shadow-2xl backdrop-blur-2xl md:hidden ${
              theme === 'dark' ? 'bg-black/90 border-white/10' : 'bg-white/95 border-black/10'
            }`}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px w-full bg-current opacity-10 my-2" />
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                Log in
              </Link>
              <div className="flex flex-wrap gap-2">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => { setLang(opt.code); setMobileMenuOpen(false); }}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      lang === opt.code 
                        ? (theme === 'dark' ? 'bg-white/20 text-white' : 'bg-black/10 text-black')
                        : (theme === 'dark' ? 'bg-white/5 text-white/60' : 'bg-black/5 text-black/60')
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
