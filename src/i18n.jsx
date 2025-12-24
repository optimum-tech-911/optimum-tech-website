import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import fr from './locales/fr.json';
import en from './locales/en.json';
import es from './locales/es.json';
import ar from './locales/ar.json';

const I18nContext = createContext({ lang: 'fr', dir: 'ltr', t: (k) => k, setLang: () => {} });

const safeWindow = () => (typeof window === 'undefined' ? undefined : window);
const getStoredLang = () => {
  const win = safeWindow();
  if (!win?.localStorage) return null;
  try {
    return win.localStorage.getItem('lang');
  } catch {
    return null;
  }
};
const setStoredLang = (value) => {
  const win = safeWindow();
  if (!win?.localStorage) return;
  try {
    win.localStorage.setItem('lang', value);
  } catch {
    // ignore write issues (Safari private mode, etc.)
  }
};

const DICT = { fr, en, es, ar };

const DIR = { ar: 'rtl', fr: 'ltr', en: 'ltr', es: 'ltr' };

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => getStoredLang() || 'fr');
  const dir = DIR[lang] || 'ltr';

  useEffect(() => {
    setStoredLang(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir]);

  const t = (path) => {
    const parts = path.split('.');
    const lookup = (obj) =>
      parts.reduce((o, p) => (o && o[p] !== undefined ? o[p] : undefined), obj);
    return lookup(DICT[lang]) ?? lookup(DICT.fr) ?? path;
  };

  const value = useMemo(() => ({ lang, setLang, dir, t }), [lang, dir]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export const LANG_OPTIONS = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'ar', label: 'العربية' },
];
