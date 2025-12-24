import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import Logo from '../assets/Logo.png';
import { useI18n, LANG_OPTIONS } from '../i18n.jsx';

export const Footer = () => {
  const { t, lang, setLang } = useI18n();
  const [openLang, setOpenLang] = React.useState(false);
  const current = LANG_OPTIONS.find((l) => l.code === lang) || LANG_OPTIONS[0];
  return (
    <footer className="relative mt-24">
      <div
        className="relative z-10 container mx-auto px-5 py-20 md:py-12 rounded-2xl border border-[#1B2A49] supports-[backdrop-filter]:bg-[#0C1220]/40 bg-[#0C1220]/72 backdrop-blur-[3px] overflow-hidden transition-colors duration-200 ease-in-out"
        style={{ willChange: 'opacity' }}
      >
        <div aria-hidden="true" className="absolute inset-0 footer-glow-overlay" />
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={Logo}
                  alt="Optimum Tech logo"
                  className="h-10 w-10 md:h-7 md:w-7 rounded-md"
                />
                <span className="text-xl md:text-base font-semibold text-[#E6F1FF]">
                  Optimum Tech
                </span>
              </div>
              <div className="max-w-xs rounded-2xl border border-[#1B2A49] bg-white/5 px-6 py-5">
                <p className="text-lg md:text-sm text-[#E6F1FF] opacity-90">
                  {t('footer.description')}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-xl md:text-base text-[#E6F1FF] font-semibold mb-3">
                {t('footer.menuTitle')}
              </h4>
              <nav className="grid gap-4 md:gap-2 text-lg md:text-sm">
                <Link
                  to="/"
                  className="block rounded-2xl border border-[#1B2A49] bg-white/5 px-6 py-4 md:px-4 md:py-2 text-[#9CC3FF] hover:bg-white/10 hover:text-[#C5DCFF] active:text-[#6EA8FF] transition-colors"
                >
                  {t('footer.links.home')}
                </Link>
                <Link
                  to="/projects"
                  className="block rounded-2xl border border-[#1B2A49] bg-white/5 px-6 py-4 md:px-4 md:py-2 text-[#9CC3FF] hover:bg-white/10 hover:text-[#C5DCFF] active:text-[#6EA8FF] transition-colors"
                >
                  {t('footer.links.projects')}
                </Link>
                <Link
                  to="/policy"
                  className="block rounded-2xl border border-[#1B2A49] bg-white/5 px-6 py-4 md:px-4 md:py-2 text-[#9CC3FF] hover:bg-white/10 hover:text-[#C5DCFF] active:text-[#6EA8FF] transition-colors"
                >
                  {t('footer.links.policy')}
                </Link>
                <Link
                  to="/contact"
                  className="block rounded-2xl border border-[#1B2A49] bg-white/5 px-6 py-4 md:px-4 md:py-2 text-[#9CC3FF] hover:bg-white/10 hover:text-[#C5DCFF] active:text-[#6EA8FF] transition-colors"
                >
                  {t('footer.links.contact')}
                </Link>
              </nav>
            </div>
            <div>
              <h4 className="text-xl md:text-base text-[#E6F1FF] font-semibold mb-3">
                {t('footer.contactTitle')}
              </h4>
              <ul className="text-lg md:text-sm text-white/90 space-y-4 md:space-y-2">
                {[t('footer.location'), t('footer.hours')].map((text) => (
                  <li
                    key={text}
                    className="rounded-2xl border border-[#1B2A49] bg-white/5 px-6 py-4 md:px-4 md:py-2 text-[#E6F1FF] opacity-90"
                  >
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mt-4 relative">
                <button
                  type="button"
                  onClick={() => setOpenLang((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#1B2A49] bg-white/5 px-5 py-2.5 md:px-3 md:py-1.5 text-lg md:text-sm text-[#E6F1FF] hover:bg-white/10 transition-colors duration-200 ease-in-out btn-electric btn-heartbeat"
                  aria-haspopup="menu"
                  aria-expanded={openLang}
                  aria-label="Change language in footer"
                >
                  <Globe className="h-6 w-6 md:h-4 md:w-4" aria-hidden="true" />
                  <span>{current.label}</span>
                </button>
                {openLang && (
                  <ul
                    className="absolute left-0 mt-2 w-44 rounded-lg border border-white/10 bg-[#0a0f18]/85 supports-[backdrop-filter]:bg-[#0a0f18]/60 backdrop-blur p-1 z-40"
                    role="menu"
                    aria-label="Language options"
                  >
                    {LANG_OPTIONS.map((opt) => (
                      <li key={opt.code}>
                        <button
                          type="button"
                          onClick={() => {
                            setLang(opt.code);
                            setOpenLang(false);
                          }}
                          className={`w-full text-left px-5 py-3 md:px-3 md:py-2 rounded-md text-lg md:text-sm ${
                            lang === opt.code
                              ? 'bg-white/10 text-white'
                              : 'text-gray-200 hover:bg-white/10'
                          }`}
                          role="menuitem"
                          aria-label={`Switch language to ${opt.label}`}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/ot.optimum_tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center h-12 w-12 md:h-8 md:w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      stroke="white"
                      strokeOpacity="0.9"
                    />
                    <circle cx="12" cy="12" r="4" stroke="white" strokeOpacity="0.9" />
                    <circle cx="17.5" cy="6.5" r="1" fill="white" fillOpacity="0.9" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/33745305113"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex items-center justify-center h-12 w-12 md:h-8 md:w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 12.05c0 4.42-3.58 8-8 8-1.41 0-2.73-.37-3.88-1.03L4 20l1.03-4.06A7.93 7.93 0 0 1 4 12.05c0-4.42 3.58-8 8-8s8 3.58 8 8Z"
                      stroke="white"
                      strokeOpacity="0.9"
                    />
                    <path
                      d="M9.7 9.8c-.1.2-.3.6-.2 1 0 .5.2 1 .6 1.6.4.7 1.4 1.5 2.3 1.9.9.4 1.3.4 1.5.3.2-.1.5-.3.6-.5.1-.2.1-.4 0-.5-.1-.2-.5-.3-.9-.5-.3-.1-.5-.1-.7 0-.2.1-.3.3-.4.4-.1.1-.2.1-.4 0-.4-.2-1-.5-1.4-.9-.4-.4-.7-.9-.8-1.2 0-.1 0-.3.1-.3.1-.1.2-.2.3-.4.1-.2.1-.4 0-.6-.1-.3-.5-.6-.7-.8-.2-.1-.4-.1-.5 0-.2.1-.4.2-.5.5Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/sid-ahmed-larabi-09b328286/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center h-12 w-12 md:h-8 md:w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="white"
                      strokeOpacity="0.9"
                    />
                    <rect x="6.5" y="9.5" width="2" height="8" fill="white" fillOpacity="0.9" />
                    <circle cx="7.5" cy="6.8" r="1.2" fill="white" fillOpacity="0.9" />
                    <path
                      d="M12 9.8h1.8c1.3 0 2.2.8 2.4 2.1v5.1h-2v-4.2c0-.7-.5-1.2-1.1-1.2-.7 0-1.1.5-1.1 1.2v4.2h-2v-7.1H12Z"
                      fill="white"
                      fillOpacity="0.9"
                    />
                  </svg>
                </a>
                <a
                  href="mailto:optimum.tech.911@gmail.com"
                  aria-label="Email"
                  className="inline-flex items-center justify-center h-12 w-12 md:h-8 md:w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                      stroke="white"
                      strokeOpacity="0.9"
                    />
                    <path d="M4.5 7l7.5 6 7.5-6" stroke="white" strokeOpacity="0.9" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-10 pt-6 border-t border-[#1B2A49] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-base md:text-xs text-[#E6F1FF] opacity-80">
            © 2025 Optimum Tech. {t('footer.rights')}
          </p>
          <div className="text-base md:text-xs text-[#E6F1FF] opacity-80">{t('footer.made')}</div>
        </div>
      </div>
    </footer>
  );
};
