import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n, LANG_OPTIONS } from '../i18n.jsx';
import { ChevronDown, Globe, Menu, Sun, Moon, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PROJECT_CATEGORIES, publicProjects } from '../data/projects';

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
        className={`relative inline-flex items-center justify-center whitespace-nowrap rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-300 lg:px-6 lg:text-base ${
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

const NavDropdown = ({ label, overviewTo, groups, openMenu, setOpenMenu, variant }) => {
  const { theme } = useTheme();
  const isOpen = openMenu === label;
  const isProjectsMenu = variant === 'projects';
  const menuId = `nav-${label.toLowerCase()}-menu`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenMenu(label)}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <Link
        to={overviewTo}
        onFocus={() => setOpenMenu(label)}
        onClick={() => setOpenMenu(null)}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="true"
        className={`relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-300 lg:px-6 lg:text-base ${isOpen ? 'bg-black/5 !text-black' : ''} ${
          theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'
        }`}
      >
        <span>{label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Link>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-x-0 top-20 z-50 border-y border-black/10 bg-white text-black shadow-2xl ${isProjectsMenu ? 'max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain' : ''}`}
            onMouseEnter={() => setOpenMenu(label)}
          >
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-3 gap-8 px-8 py-7">
              {groups.map((group) => (
                <div key={group.title} className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/45">
                    {group.title}
                  </p>
                  <div className="space-y-2">
                    {group.links.map((item) => {
                      const content = (
                        <>
                          <span className="block text-sm font-semibold">{item.label}</span>
                          {item.description ? (
                            <span className="mt-1 block text-xs leading-5 text-black/50">{item.description}</span>
                          ) : null}
                        </>
                      );
                      const className = `block rounded-lg px-3 ${isProjectsMenu ? 'py-2' : 'py-3'} text-black/80 transition hover:bg-black/5 hover:text-black`;

                      return item.href ? (
                        <a
                          key={`${group.title}-${item.label}`}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenMenu(null)}
                          className={className}
                        >
                          {content}
                        </a>
                      ) : (
                        <Link
                          key={`${group.title}-${item.label}`}
                          to={item.to}
                          onClick={() => setOpenMenu(null)}
                          className={className}
                        >
                          {content}
                        </Link>
                      );
                    })}
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
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const current = LANG_OPTIONS.find((l) => l.code === lang) || LANG_OPTIONS[0];
  const overlayHeader = location.pathname === '/' && !scrolled && !openMenu && !mobileMenuOpen;

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

  React.useEffect(() => {
    let previousY = window.scrollY;
    const handleScroll = () => {
      const nextY = window.scrollY;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(nextY > 24);
      setScrollProgress(scrollableHeight > 0 ? Math.min(nextY / scrollableHeight, 1) : 0);
      setHidden(
        window.innerWidth >= 1280 &&
        nextY > previousY &&
        nextY > 180 &&
        !mobileMenuOpen &&
        !openMenu
      );
      previousY = nextY;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen, openMenu]);

  React.useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const primaryNavItems = [
    { to: "/", label: t('nav.home') },
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

  const projectsMenu = Object.entries(PROJECT_CATEGORIES)
    .map(([category, title]) => ({
      title,
      links: publicProjects
        .filter((item) => item.category === category)
        .map((item) => ({
          label: item.title,
          description: item.type,
          ...(item.caseStudy
            ? { to: `/realisations/${item.slug}` }
            : item.url
              ? { href: item.url }
              : { to: '/realisations' }),
        })),
    }))
    .filter((group) => group.links.length > 0);

  const mobileGroups = [
    { id: 'services', label: 'Services', overviewTo: '/services', groups: servicesMenu },
    {
      id: 'projects',
      label: t('nav.projects'),
      overviewTo: '/realisations',
      groups: projectsMenu.map((group) => ({ ...group, links: group.links.slice(0, 3) })),
    },
    { id: 'blog', label: 'Blog', overviewTo: '/blog', groups: blogMenu },
  ];

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 flex justify-center transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      onMouseEnter={() => setHidden(false)}
    >
      <motion.nav
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        aria-label="Navigation principale"
        className={`relative flex min-h-20 w-full items-center justify-between border-b px-5 py-3 backdrop-blur-xl transition-all duration-500 sm:px-8 lg:px-12 ${openMenu ? 'nav-menu-open bg-white shadow-xl' : overlayHeader ? 'home-nav-transparent shadow-none' :
          theme === 'dark'
            ? 'border-white/10 bg-[#050607]/95 shadow-xl'
            : `${scrolled ? 'border-[#050607]/10 bg-[#FFFFFF]/95 shadow-md' : 'border-[#050607]/10 bg-[#FFFFFF]/90'}`
        }`}
      >
        <Link to="/" aria-label="Optimum Tech — Accueil" className="group flex flex-shrink-0 items-center gap-3">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <img src="/android-chrome-192x192.png" alt="" width="42" height="42" className="h-10 w-10 rounded-xl shadow-sm sm:h-[42px] sm:w-[42px]" />
          </motion.div>
          <span className={`whitespace-nowrap text-lg font-bold transition-colors sm:text-xl ${
            theme === 'dark' ? 'text-white' : 'text-[#050607]'
          }`}>
            Optimum Tech
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-1 min-w-0 px-4">
          <NavLink to="/">{t('nav.home')}</NavLink>
          <NavDropdown label="Services" overviewTo="/services" groups={servicesMenu} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <NavDropdown label={t('nav.projects')} overviewTo="/realisations" groups={projectsMenu} openMenu={openMenu} setOpenMenu={setOpenMenu} variant="projects" />
          <NavDropdown label="Blog" overviewTo="/blog" groups={blogMenu} openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <NavLink to="/a-propos">À propos</NavLink>
          <NavLink to="/contact">{t('nav.contact')}</NavLink>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Login Button */}
          <Link
            to="/auth"
            className={`hidden items-center justify-center whitespace-nowrap rounded-lg px-6 py-3 text-base font-bold transition-all duration-300 xl:inline-flex ${
              theme === 'dark' ? 'border border-[#0A84FF] bg-[#0A84FF] text-[#050607]' : 'border border-[#050607] bg-[#050607] text-white hover:border-[#0A84FF]'
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
            className={`grid h-11 w-11 place-items-center rounded-xl p-0 transition-all duration-300 ${
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
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
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
            className={`grid h-11 w-11 place-items-center rounded-xl p-0 xl:hidden ${
              theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'
            }`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#0A84FF] transition-transform duration-150"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-[#050607]/[0.98] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-5 text-white shadow-2xl backdrop-blur-2xl xl:hidden"
          >
            <div className="mx-auto flex max-w-2xl flex-col gap-3">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-3 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
              {mobileGroups.map((section) => (
                <div key={section.id} className="rounded-2xl border border-white/10 bg-white/[0.035] p-2">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      to={section.overviewTo}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileSection(null);
                      }}
                      className="flex min-h-12 flex-1 items-center rounded-xl px-2 text-base font-semibold text-white transition hover:bg-white/5"
                    >
                      {section.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileSection(mobileSection === section.id ? null : section.id)}
                      aria-expanded={mobileSection === section.id}
                      aria-controls={`mobile-${section.id}-links`}
                      aria-label={`${mobileSection === section.id ? 'Fermer' : 'Ouvrir'} le menu ${section.label}`}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white transition hover:bg-white/10"
                    >
                      <ChevronDown className={`h-5 w-5 transition-transform ${mobileSection === section.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {mobileSection === section.id && (
                    <div id={`mobile-${section.id}-links`} className="mt-4 space-y-4">
                      {section.groups.map((group) => (
                        <div key={group.title} className="space-y-2">
                          <p className="px-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/45">
                            {group.title}
                          </p>
                          <div className="flex flex-col gap-2">
                            {group.links.map((item) => {
                              const closeMobileMenu = () => {
                                setMobileMenuOpen(false);
                                setMobileSection(null);
                              };
                              const className = 'flex min-h-11 items-center rounded-xl bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white';

                              return item.href ? (
                                <a
                                  key={`${group.title}-${item.label}`}
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={closeMobileMenu}
                                  className={className}
                                >
                                  {item.label}
                                </a>
                              ) : (
                                <Link
                                  key={`${group.title}-${item.label}`}
                                  to={item.to}
                                  onClick={closeMobileMenu}
                                  className={className}
                                >
                                  {item.label}
                                </Link>
                              );
                            })}
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
                className="flex min-h-12 items-center rounded-xl bg-[#0A84FF] px-4 text-base font-bold text-white"
              >
                Espace client
              </Link>
              <div className="flex flex-wrap gap-2">
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => { setLang(opt.code); setMobileMenuOpen(false); }}
                    className={`min-h-11 rounded-xl px-4 py-2 text-sm font-medium ${
                      lang === opt.code 
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-white/60'
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
