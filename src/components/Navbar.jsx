import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
      aria-current={active ? 'page' : undefined}
      onClick={(e) => {
        onClick?.(e);
      }}
      className={`relative inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300 lg:px-5 lg:text-sm ${
        theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'
      }`}
    >
      {active && (
        <motion.span
          layoutId="nav-active-bg"
          className={`absolute inset-0 rounded-lg border backdrop-blur-md ${
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
  const menuId = `nav-${label.toLowerCase()}-menu`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(label)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <button
        type="button"
        onClick={() => setOpenMenu(isOpen ? null : label)}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="true"
        className={`relative inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300 lg:px-5 lg:text-sm ${
          theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'
        }`}
      >
        <span>{label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-4 rounded-lg border p-5 shadow-2xl backdrop-blur-2xl lg:p-6 ${
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
                        className={`block rounded-lg px-3 py-3 transition ${
                          theme === 'dark'
                            ? 'hover:bg-white/5 text-white/80 hover:text-white'
                            : 'hover:bg-black/5 text-black/80 hover:text-black'
                        }`}
                      >
                        <span className="block text-sm font-medium">{item.label}</span>
                        {item.description ? (
                          <span className={`mt-1 block text-xs leading-5 ${
                            theme === 'dark' ? 'text-white/50' : 'text-black/50'
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
  const location = useLocation();
  const current = LANG_OPTIONS.find((l) => l.code === lang) || LANG_OPTIONS[0];

  React.useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
    setMobileMenuOpen(false);
    setMobileSection(null);
  }, [location.pathname]);

  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      setOpenMenu(null);
      setMobileMenuOpen(false);
      setMobileSection(null);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const primaryNavItems = [
    { to: "/", label: t('nav.home') },
    { to: "/realisations", label: t('nav.projects') },
    { to: "/a-propos", label: 'À propos' },
    { to: "/contact", label: t('nav.contact') },
  ];

  const servicesMenu = [
    {
      title: 'Pages services',
      links: [
        { to: '/services', label: 'Tous les services', description: 'Vue d’ensemble des offres Optimum Tech.' },
        { to: '/creation-site-web', label: 'Création de site web', description: 'Sites vitrines, refontes et pages orientées conversion.' },
        { to: '/referencement-seo', label: 'Référencement SEO', description: 'SEO local, architecture et visibilité Google.' },
        { to: '/automatisation-ia', label: 'Automatisation IA', description: 'Automatisations utiles, workflows et intégrations métier.' },
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
      title: 'Besoins fréquents',
      links: [
        { to: '/site-internet-entreprise-locale', label: 'Site internet entreprise locale', description: 'Pour artisans, commerces, indépendants et PME.' },
        { to: '/site-internet-dentiste', label: 'Site internet dentiste', description: 'Pour cabinets dentaires et activités de santé locales.' },
        { to: '/application-web-sur-mesure', label: 'Application web sur mesure', description: 'Pour dashboards, portails et interfaces métiers utiles.' },
      ],
    },
  ];

  const blogMenu = [
    {
      title: 'Guides piliers',
      links: [
        { to: '/blog', label: 'Tous les articles', description: 'Voir toute la bibliothèque de contenus.' },
        { to: '/blog/site-vitrine-ou-web-app-que-choisir-pour-son-activite', label: 'Site vitrine ou web app' },
        { to: '/blog/seo-local-entreprise-ce-qu-il-faut-vraiment-comprendre', label: 'Comprendre le SEO local' },
      ],
    },
    {
      title: 'Visibilité locale',
      links: [
        { to: '/blog/google-business-profile-et-site-web-comment-les-deux-travaillent-ensemble', label: 'Google Business Profile + site web' },
        { to: '/blog/comment-une-entreprise-locale-transforme-son-site-en-demandes-de-contact', label: 'Transformer son site en demandes' },
        { to: '/blog/etre-trouve-google-entreprise-locale-france', label: 'Être trouvé sur Google' },
      ],
    },
    {
      title: 'Décider avant d’acheter',
      links: [
        { to: '/blog/erreurs-qui-font-perdre-des-clients-sur-un-site-professionnel', label: 'Erreurs qui font perdre des clients' },
        { to: '/blog/combien-coute-creation-site-web-professionnel-france', label: 'Budget d’un site professionnel' },
        { to: '/contact', label: 'Contact', description: 'Parler de votre projet.' },
      ],
    },
  ];

  const mobileGroups = [
    { id: 'services', label: 'Services', groups: servicesMenu },
    { id: 'blog', label: 'Blog', groups: blogMenu },
  ];

  return (
    <div className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3 sm:top-5 sm:px-5">
      <motion.nav
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        aria-label="Navigation principale"
        className={`flex w-full max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-2xl transition-all duration-500 lg:px-6 ${
          theme === 'dark' 
            ? 'border-white/10 bg-[#050607]/90 shadow-2xl' 
            : 'border-black/10 bg-white/90 shadow-xl'
        }`}
      >
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <img src="/android-chrome-192x192.png" alt="" width="32" height="32" className="h-8 w-8 rounded-lg shadow-lg" />
          </motion.div>
          <span className={`whitespace-nowrap text-lg font-bold transition-colors ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            Optimum Tech
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-1 min-w-0 px-4">
          <NavLink to="/">{t('nav.home')}</NavLink>
          <NavDropdown label="Services" groups={servicesMenu} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <NavLink to="/realisations">{t('nav.projects')}</NavLink>
          <NavDropdown label="Blog" groups={blogMenu} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <NavLink to="/a-propos">À propos</NavLink>
          <NavLink to="/contact">{t('nav.contact')}</NavLink>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Login Button */}
          <Link
            to="/auth"
            className={`hidden items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 xl:inline-flex ${
              theme === 'dark' ? 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white' : 'bg-black/5 text-black/80 hover:bg-black/10 hover:text-black'
            }`}
          >
            Espace client
          </Link>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
            title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
            className={`rounded-lg p-2 transition-all duration-300 ${
              theme === 'dark' ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'
            }`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Selector */}
          <div className="relative hidden xl:block">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="language-menu"
              aria-haspopup="true"
              aria-label="Choisir la langue"
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                theme === 'dark' ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-black hover:bg-black/10'
              }`}
            >
              <Globe size={14} />
              <span>{current.label}</span>
            </button>
            <AnimatePresence>
              {open && (
                <motion.ul
                  id="language-menu"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`absolute right-0 mt-2 w-32 rounded-lg border p-1 shadow-2xl backdrop-blur-xl ${
                    theme === 'dark' ? 'bg-black/80 border-white/10' : 'bg-white/90 border-black/10'
                  }`}
                >
                  {LANG_OPTIONS.map((opt) => (
                    <li key={opt.code}>
                      <button
                        type="button"
                        onClick={() => { setLang(opt.code); setOpen(false); }}
                        className={`w-full rounded-lg px-3 py-2 text-left text-xs transition-colors ${
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
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className={`rounded-lg p-2 xl:hidden ${
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
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute left-3 right-3 top-16 max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain rounded-2xl border p-5 shadow-2xl backdrop-blur-2xl xl:hidden sm:left-5 sm:right-5 ${
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
                <div key={section.id} className="rounded-lg border border-current/10 p-3">
                  <button
                    type="button"
                    onClick={() => setMobileSection(mobileSection === section.id ? null : section.id)}
                    aria-expanded={mobileSection === section.id}
                    aria-controls={`mobile-${section.id}-links`}
                    className={`flex w-full items-center justify-between text-lg font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-black'
                    }`}
                  >
                    <span>{section.label}</span>
                    <ChevronDown className={`h-5 w-5 transition-transform ${mobileSection === section.id ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSection === section.id && (
                    <div id={`mobile-${section.id}-links`} className="mt-4 space-y-4">
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
                                className={`rounded-lg px-3 py-2 text-sm ${
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
                Espace client
              </Link>
              <div className="flex flex-wrap gap-2">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => { setLang(opt.code); setMobileMenuOpen(false); }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${
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
