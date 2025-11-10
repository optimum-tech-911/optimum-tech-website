import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const I18nContext = createContext({ lang: "fr", dir: "ltr", t: (k) => k, setLang: () => {} });

const DICT = {
  fr: {
    nav: { home: "Accueil", projects: "Projets", contact: "Contact", policy: "Politique" },
    hero: {
      build: "Construisez",
      faster: "plus vite",
      grow: "Grandissez",
      smarter: "plus intelligemment",
      automate: "Automatisez",
      everything: "tout",
      blurb:
        "Optimum Tech transforme vos idées en sites, applications et flux de travail IA performants qui génèrent des résultats.",
      ctaStart: "Commencer votre projet",
      ctaSee: "Voir nos réalisations",
    },
    intro: { title: "Optimum Tech", subtitle: "Bienvenue sur votre site" },
    projects: { title: "Projets" },
    contact: { title: "Contactez‑nous" },
    policy: { title: "Politique Générale" },
    footer: { rights: "Tous droits réservés." },
  },
  en: {
    nav: { home: "Home", projects: "Projects", contact: "Contact", policy: "Policy" },
    hero: {
      build: "Build",
      faster: "faster",
      grow: "Grow",
      smarter: "smarter",
      automate: "Automate",
      everything: "everything",
      blurb:
        "Optimum Tech turns your ideas into high‑performance websites, apps, and AI‑powered workflows that drive results.",
      ctaStart: "Start Your Project",
      ctaSee: "See Our Work",
    },
    intro: { title: "Optimum Tech", subtitle: "Welcome to your website" },
    projects: { title: "Projects" },
    contact: { title: "Contact Us" },
    policy: { title: "General Policy" },
    footer: { rights: "All rights reserved." },
  },
  es: {
    nav: { home: "Inicio", projects: "Proyectos", contact: "Contacto", policy: "Política" },
    hero: {
      build: "Construye",
      faster: "más rápido",
      grow: "Crece",
      smarter: "más inteligente",
      automate: "Automatiza",
      everything: "todo",
      blurb:
        "Optimum Tech convierte tus ideas en sitios web, apps y flujos con IA de alto rendimiento que generan resultados.",
      ctaStart: "Comienza tu proyecto",
      ctaSee: "Ver nuestro trabajo",
    },
    intro: { title: "Optimum Tech", subtitle: "Bienvenido a tu sitio web" },
    projects: { title: "Proyectos" },
    contact: { title: "Contáctanos" },
    policy: { title: "Política General" },
    footer: { rights: "Todos los derechos reservados." },
  },
  ar: {
    nav: { home: "الرئيسية", projects: "المشاريع", contact: "اتصل بنا", policy: "السياسة" },
    hero: {
      build: "ابنِ",
      faster: "أسرع",
      grow: "نَمِّ",
      smarter: "أذكى",
      automate: "أتمت",
      everything: "كل شيء",
      blurb:
        "تحول Optimum Tech أفكارك إلى مواقع وتطبيقات وتدفقات عمل مدعومة بالذكاء الاصطناعي عالية الأداء تحقق نتائج.",
      ctaStart: "ابدأ مشروعك",
      ctaSee: "شاهد أعمالنا",
    },
    intro: { title: "Optimum Tech", subtitle: "مرحبًا بك في موقعك" },
    projects: { title: "المشاريع" },
    contact: { title: "تواصل معنا" },
    policy: { title: "السياسة العامة" },
    footer: { rights: "جميع الحقوق محفوظة." },
  },
};

const DIR = { ar: "rtl", fr: "ltr", en: "ltr", es: "ltr" };

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "fr");
  const dir = DIR[lang] || "ltr";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = (path) => {
    const parts = path.split(".");
    const lookup = (obj) => parts.reduce((o, p) => (o && o[p] !== undefined ? o[p] : undefined), obj);
    return lookup(DICT[lang]) ?? lookup(DICT.fr) ?? path;
  };

  const value = useMemo(() => ({ lang, setLang, dir, t }), [lang, dir]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export const LANG_OPTIONS = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "ar", label: "العربية" },
];
