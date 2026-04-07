import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/Logo.png';
import { useI18n, LANG_OPTIONS } from '../i18n.jsx';
import { ChevronDown, Globe, Menu, Sun, Moon, X } from 'lucide-react';
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
      className={`relative inline-flex items-center justify-center whitespace-nowrap px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 ${
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

const NavDropdown = ({ label, groups, openMenu, setOpenMenu }) => {
  const { theme } = useTheme();
  const isOpen = openMenu === label;
  const isBlogMenu = label === 'Blog';

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(label)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button
        type="button"
        onClick={() => setOpenMenu(isOpen ? null : label)}
        className={`relative inline-flex items-center justify-center gap-1 whitespace-nowrap px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 ${
          theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'
        }`}
      >
        <span>{label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-4 rounded-[2rem] border p-5 lg:p-6 shadow-2xl backdrop-blur-2xl ${
              isBlogMenu
                ? 'right-0 max-w-[calc(100vw-4rem)]'
                : 'left-1/2 -translate-x-1/2 max-w-[calc(100vw-4rem)]'
            } ${
              theme === 'dark' ? 'border-white/10 bg-black/90' : 'border-black/10 bg-white/95'
            }`}
          >
            <div className={`grid gap-6 lg:gap-8 ${
              isBlogMenu
                ? 'w-[min(820px,calc(100vw-5rem))] grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'w-[min(720px,calc(100vw-5rem))] grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            }`}>
              {groups.map((group) => (
                <div key={group.title} className="space-y-3">
                  <p className={theme === 'dark' ? 'text-xs uppercase tracking-[0.16em] text-white/40' : 'text-xs uppercase tracking-[0.16em] text-black/40'}>
                    {group.title}
                  </p>
                  <div className="space-y-2">
                    {group.links.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setOpenMenu(null)}
                        className={`block rounded-2xl px-3 py-3 transition ${
                          theme === 'dark'
                            ? 'hover:bg-white/5 text-white/80 hover:text-white'
                            : 'hover:bg-black/5 text-black/80 hover:text-black'
                        }`}
                      >
                        <span className="block text-sm font-medium">{item.label}</span>
                        {item.description ? (
                          <span className={`mt-1 block text-xs leading-5 ${
                            theme === 'dark' ? 'text-white/45' : 'text-black/45'
                          }`}>
                            {item.description}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Navbar = () => {
  const { t, lang, setLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileSection, setMobileSection] = useState(null);
  const current = LANG_OPTIONS.find((l) => l.code === lang) || LANG_OPTIONS[0];

  const primaryNavItems = [
    { to: "/", label: t('nav.home') },
    { to: "/projects", label: t('nav.projects') },
    { to: "/a-propos", label: 'À propos' },
    { to: "/contact", label: t('nav.contact') },
  ];

  const servicesMenu = [
    {
      title: 'Pages services',
      links: [
        { to: '/services', label: 'Tous les services', description: 'Vue d ensemble des offres Optimum Tech.' },
        { to: '/creation-site-web', label: 'Création de site web', description: 'Sites vitrines, refontes et pages orientées conversion.' },
        { to: '/referencement-seo', label: 'Référencement SEO', description: 'SEO local, architecture et visibilité Google.' },
        { to: '/automatisation-ia', label: 'Automatisation IA', description: 'Workflows, leads et gains de temps utiles.' },
      ],
    },
    {
      title: 'Local',
      links: [
        { to: '/creation-site-web-sete', label: 'Création site web Sète' },
        { to: '/agence-web-herault', label: 'Agence web Hérault' },
        { to: '/referencement-seo-sete', label: 'SEO Sète' },
        { to: '/automatisation-ia-occitanie', label: 'Automatisation IA Occitanie' },
      ],
    },
    {
      title: 'Conversion',
      links: [
        { to: '/projects', label: 'Réalisations', description: 'Voir des exemples concrets de projets.' },
        { to: '/contact', label: 'Demander un devis', description: 'Parler de votre projet par message ou téléphone.' },
      ],
    },
  ];

  const blogMenu = [
    {
      title: 'Blog',
      links: [
        { to: '/blog', label: 'Tous les articles', description: 'Voir toute la bibliothèque de contenus.' },
        { to: '/blog/comment-choisir-son-agence-web-beziers-pieges', label: 'Choisir son agence web à Béziers' },
        { to: '/blog/combien-coute-creation-site-internet-beziers-2026', label: 'Prix d un site internet à Béziers' },
      ],
    },
    {
      title: 'Béziers & Hérault',
      links: [
        { to: '/blog/artisans-site-web-fiche-google-indispensables-herault', label: 'Artisans : site web + fiche Google' },
        { to: '/blog/vignerons-site-ecommerce-vendre-sans-intermediaire', label: 'Vignerons : vendre sans intermédiaire' },
        { to: '/blog/pourquoi-maintenance-wordpress-cruciale-tpe', label: 'Maintenance WordPress pour TPE' },
      ],
    },
    {
      title: 'Pages utiles',
      links: [
        { to: '/creation-site-web', label: 'Service création de site web' },
        { to: '/referencement-seo', label: 'Service référencement SEO' },
        { to: '/contact', label: 'Contact', description: 'Parler de votre projet.' },
      ],
    },
  ];

  const mobileGroups = [
    { id: 'services', label: 'Services', groups: servicesMenu },
    { id: 'blog', label: 'Blog', groups: blogMenu },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center justify-between w-full max-w-7xl px-5 lg:px-6 py-3 rounded-full border backdrop-blur-2xl transition-all duration-500 ${
          theme === 'dark' 
            ? 'bg-black/20 border-white/10 shadow-2xl' 
            : 'bg-gray-500/10 border-black/10 shadow-xl'
        }`}
      >
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <img src={Logo} alt="Optimum Tech logo" className="h-8 w-8 rounded-lg shadow-lg" />
          </motion.div>
          <span className={`text-lg font-bold tracking-tighter transition-colors whitespace-nowrap ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Optimum Tech
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-0.5 lg:gap-1 min-w-0 px-4">
          {primaryNavItems.map((item) => (
            <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
          ))}
          <NavDropdown label="Services" groups={servicesMenu} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <NavDropdown label="Blog" groups={blogMenu} openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Login Button */}
          <Link
            to="/auth"
            className={`hidden md:inline-flex items-center justify-center whitespace-nowrap px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 ${
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
              className={`flex items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
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
              {primaryNavItems.map((item) => (
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
              {mobileGroups.map((section) => (
                <div key={section.id} className="rounded-[1.5rem] border border-current/10 p-3">
                  <button
                    type="button"
                    onClick={() => setMobileSection(mobileSection === section.id ? null : section.id)}
                    className={`flex w-full items-center justify-between text-lg font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                  >
                    <span>{section.label}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${mobileSection === section.id ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSection === section.id && (
                    <div className="mt-4 space-y-4">
                      {section.groups.map((group) => (
                        <div key={group.title} className="space-y-2">
                          <p className={`text-xs uppercase tracking-[0.16em] ${
                            theme === 'dark' ? 'text-white/40' : 'text-black/40'
                          }`}>
                            {group.title}
                          </p>
                          <div className="flex flex-col gap-2">
                            {group.links.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileSection(null);
                                }}
                                className={`rounded-xl px-3 py-2 text-sm ${
                                  theme === 'dark' ? 'bg-white/5 text-white/80' : 'bg-black/5 text-black/80'
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
