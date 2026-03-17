import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import Logo from '../assets/Logo.png';
import { useI18n, LANG_OPTIONS } from '../i18n.jsx';
import { useTheme } from '../context/ThemeContext';

export const Footer = () => {
  const { t, lang, setLang } = useI18n();
  const { theme } = useTheme();
  const [openLang, setOpenLang] = React.useState(false);
  const current = LANG_OPTIONS.find((l) => l.code === lang) || LANG_OPTIONS[0];
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative mt-32 border-t backdrop-blur-2xl transition-colors duration-500 ${
      theme === 'dark' ? 'border-white/5 bg-black/40' : 'border-black/10 bg-gray-500/10'
    }`}>
      <div className="container mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={Logo}
                alt="Optimum Tech logo"
                className="h-10 w-10 rounded-xl transition-transform duration-500 group-hover:scale-110"
              />
              <span className={`text-xl font-bold tracking-tighter ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Optimum Tech
              </span>
            </Link>
            <p className={`text-base font-light leading-relaxed max-w-xs ${
              theme === 'dark' ? 'text-white/60' : 'text-black/60'
            }`}>
              {t('footer.description')}
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className={`text-sm font-semibold uppercase tracking-widest ${
              theme === 'dark' ? 'text-white/40' : 'text-black/40'
            }`}>
              {t('footer.menuTitle')}
            </h4>
            <nav className="flex flex-col gap-4">
              {[
                { to: '/', label: t('footer.links.home') },
                { to: '/projects', label: t('footer.links.projects') },
                { to: '/policy', label: t('footer.links.policy') },
                { to: '/contact', label: t('footer.links.contact') },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-base transition-colors duration-300 font-light ${
                    theme === 'dark' ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className={`text-sm font-semibold uppercase tracking-widest ${
              theme === 'dark' ? 'text-white/40' : 'text-black/40'
            }`}>
              {t('footer.contactTitle')}
            </h4>
            <div className={`flex flex-col gap-4 text-base font-light ${
              theme === 'dark' ? 'text-white/70' : 'text-black/70'
            }`}>
              <p>{t('footer.location')}</p>
              <p>{t('footer.hours')}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className={`text-sm font-semibold uppercase tracking-widest ${
              theme === 'dark' ? 'text-white/40' : 'text-black/40'
            }`}>
              Social
            </h4>
            <div className="flex flex-wrap items-center gap-4">
              {[
                { 
                  href: "https://www.instagram.com/ot.optimum_tech/", 
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
                  title: "Instagram"
                },
                { 
                  href: "https://wa.me/33745305113", 
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>,
                  title: "WhatsApp"
                },
                { 
                  href: "https://www.linkedin.com/in/sid-ahmed-larabi-09b328286/", 
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
                  title: "LinkedIn"
                },
                { 
                  href: "mailto:optimum.tech.911@gmail.com", 
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
                  title: "Email"
                }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  className={`h-10 w-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'border-white/10 text-white/60 hover:text-white hover:bg-white/10' 
                      : 'border-black/10 text-black/60 hover:text-black hover:bg-black/10'
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="relative pt-4">
              <button
                type="button"
                onClick={() => setOpenLang((v) => !v)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'border-white/10 text-white/70 hover:text-white hover:bg-white/5' 
                    : 'border-black/10 text-black/70 hover:text-black hover:bg-black/5'
                }`}
              >
                <Globe className="h-4 w-4" />
                <span>{current.label}</span>
              </button>
              {openLang && (
                <ul className={`absolute bottom-full left-0 mb-2 w-40 rounded-2xl border backdrop-blur-xl p-1 shadow-2xl overflow-hidden ${
                  theme === 'dark' ? 'border-white/10 bg-black/80' : 'border-black/10 bg-white/90'
                }`}>
                  {LANG_OPTIONS.map((opt) => (
                    <li key={opt.code}>
                      <button
                        type="button"
                        onClick={() => {
                          setLang(opt.code);
                          setOpenLang(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          lang === opt.code 
                            ? (theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/5 text-black') 
                            : (theme === 'dark' ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-black/60 hover:bg-black/5')
                        }`}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        <div className={`mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light ${
          theme === 'dark' ? 'border-white/5 text-white/40' : 'border-black/5 text-black/40'
        }`}>
          <p>© {currentYear} Optimum Tech. {t('footer.rights') || 'All rights reserved.'}</p>
          <div className="flex gap-8">
            <Link to="/privacy-policy" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Privacy Policy</Link>
            <Link to="/cookie-policy" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
