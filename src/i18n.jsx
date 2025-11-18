import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const I18nContext = createContext({ lang: "fr", dir: "ltr", t: (k) => k, setLang: () => {} });

const DICT = {
  fr: {
    nav: { home: "Accueil", projects: "Projets", contact: "Contact", policy: "Politique" },
    hero: {
      build: "Construisez",
      faster: "plus vite",
      grow: "Développez-vous",
      smarter: "plus intelligemment",
      automate: "Automatisez",
      everything: "tout",
      blurb:
        "Optimum Tech transforme vos idées en sites web, applications et automatisations IA qui délivrent des résultats concrets.",
      ctaStart: "Commencer votre projet",
      ctaSee: "Voir nos réalisations",
    },
    intro: { title: "Optimum Tech", subtitle: "Bienvenue sur votre site" },
    projects: { title: "Projets", swipeMore: "Glisser pour voir plus", swipeNext: "Voir suivant" },
    contact: {
      title: "Contactez-nous",
      form: {
        nameLabel: "Nom",
        namePlaceholder: "Votre nom",
        phoneLabel: "Téléphone",
        phonePlaceholder: "(+33) 6 12 34 56 78",
        emailLabel: "Email",
        emailPlaceholder: "vous@exemple.com",
        messageLabel: "Message",
        messagePlaceholder: "Décrivez votre projet, budget et délais souhaités.",
        attachLabel: "Télécharger un fichier",
        uploading: "Téléchargement…",
        uploadSuccess: "Fichier téléchargé",
        uploadFailure: "Échec du téléchargement",
        sendButton: "Envoyer le message",
        success: "Merci ! Votre message a été envoyé.",
        failure: "Échec de l’envoi. Réessayez."
      }
      ,
      confirm: {
        message: "Merci pour votre message ! Nous vous répondrons au plus vite.",
        writeAnother: "Écrire un autre message",
        exploreMore: "Voir nos projets"
      }
    },
    policy: { title: "Politique générale" },
    footer: {
      rights: "Tous droits réservés.",
      description:
        "Nous créons des sites rapides, des apps et des automatisations propulsées par l'IA pour accélérer votre activité.",
      menuTitle: "Explorer",
      contactTitle: "Contact",
      location: "France • UE",
      hours: "Disponible 24/7 – nous sommes là à tout moment.",
      made: "Conçu avec soin – performance et accessibilité avant tout",
      links: {
        home: "Retour à l'accueil",
        projects: "Découvrir nos projets",
        policy: "Lire nos politiques",
        contact: "Entrer en contact",
      },
    },
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
        "Optimum Tech turns your ideas into high-performance websites, apps, and AI-powered workflows that move the needle.",
      ctaStart: "Start Your Project",
      ctaSee: "See Our Work",
    },
    intro: { title: "Optimum Tech", subtitle: "Welcome to your website" },
    projects: { title: "Projects", swipeMore: "Swipe to see more", swipeNext: "See next" },
    contact: {
      title: "Contact Us",
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your name",
        phoneLabel: "Phone",
        phonePlaceholder: "(+33) 6 12 34 56 78",
        emailLabel: "Email",
        emailPlaceholder: "you@example.com",
        messageLabel: "Message",
        messagePlaceholder: "Describe your project, budget, and timeline.",
        attachLabel: "Upload File",
        uploading: "Uploading…",
        uploadSuccess: "File uploaded",
        uploadFailure: "Upload failed",
        sendButton: "Send message",
        success: "Thanks! Your message has been sent.",
        failure: "Sending failed. Please retry."
      }
      ,
      confirm: {
        message: "Thank you for contacting us! We will get back to you ASAP",
        writeAnother: "Write Another Message",
        exploreMore: "Explore More"
      }
    },
    policy: { title: "General Policy" },
    footer: {
      rights: "All rights reserved.",
      description:
        "We build fast websites, apps, and AI automations to help your business grow with confidence.",
      menuTitle: "Explore",
      contactTitle: "Contact",
      location: "France • EU",
      hours: "Available 24/7 – we're here anytime.",
      made: "Made with care – performance & accessibility first",
      links: {
        home: "Back to home",
        projects: "Explore our projects",
        policy: "Read our policies",
        contact: "Get in touch",
      },
    },
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
        "Optimum Tech convierte tus ideas en sitios, aplicaciones y flujos con IA que generan resultados reales.",
      ctaStart: "Comienza tu proyecto",
      ctaSee: "Ver nuestro trabajo",
    },
    intro: { title: "Optimum Tech", subtitle: "Bienvenido a tu sitio web" },
    projects: { title: "Proyectos", swipeMore: "Desliza para ver más", swipeNext: "Ver siguiente" },
    contact: {
      title: "Contáctanos",
      form: {
        nameLabel: "Nombre",
        namePlaceholder: "Tu nombre",
        phoneLabel: "Teléfono",
        phonePlaceholder: "(+33) 6 12 34 56 78",
        emailLabel: "Correo",
        emailPlaceholder: "tu@ejemplo.com",
        messageLabel: "Mensaje",
        messagePlaceholder: "Describe tu proyecto, presupuesto y plazo.",
        attachLabel: "Subir archivo",
        uploading: "Subiendo…",
        uploadSuccess: "Archivo subido",
        uploadFailure: "Error al subir",
        sendButton: "Enviar mensaje",
        success: "¡Gracias! Tu mensaje ha sido enviado.",
        failure: "Error al enviar. Inténtalo de nuevo."
      }
      ,
      confirm: {
        message: "¡Gracias por contactarnos! Te responderemos lo antes posible",
        writeAnother: "Escribir otro mensaje",
        exploreMore: "Explorar más"
      }
    },
    policy: { title: "Política general" },
    footer: {
      rights: "Todos los derechos reservados.",
      description:
        "Creamos sitios veloces, aplicaciones y automatizaciones con IA para impulsar el crecimiento de tu negocio.",
      menuTitle: "Explorar",
      contactTitle: "Contacto",
      location: "Francia • UE",
      hours: "Disponibles 24/7 – siempre atentos a tu mensaje.",
      made: "Hecho con cuidado – rendimiento y accesibilidad primero",
      links: {
        home: "Volver al inicio",
        projects: "Explora nuestros proyectos",
        policy: "Lee nuestras políticas",
        contact: "Ponerse en contacto",
      },
    },
  },
  ar: {
    nav: { home: "الرئيسية", projects: "المشاريع", contact: "تواصل معنا", policy: "السياسات" },
    hero: {
      build: "ابنِ",
      faster: "أسرع",
      grow: "طوّر",
      smarter: "أذكى",
      automate: "أتمت",
      everything: "كل شيء",
      blurb:
        "تحول Optimum Tech أفكارك إلى مواقع وتطبيقات وتدفقات تعمل بالذكاء الاصطناعي وتحقق نتائج واضحة.",
      ctaStart: "ابدأ مشروعك",
      ctaSee: "اكتشف أعمالنا",
    },
    intro: { title: "Optimum Tech", subtitle: "مرحباً بك في موقعك" },
    projects: { title: "المشاريع", swipeMore: "اسحب لرؤية المزيد", swipeNext: "التالي" },
    contact: {
      title: "تواصل معنا",
      form: {
        nameLabel: "الاسم",
        namePlaceholder: "اسمك",
        phoneLabel: "الهاتف",
        phonePlaceholder: "(+33) 6 12 34 56 78",
        emailLabel: "البريد الإلكتروني",
        emailPlaceholder: "you@example.com",
        messageLabel: "الرسالة",
        messagePlaceholder: "صف مشروعك والميزانية والمدة المطلوبة.",
        attachLabel: "رفع ملف",
        uploading: "جارٍ الرفع…",
        uploadSuccess: "تم رفع الملف",
        uploadFailure: "فشل الرفع",
        sendButton: "إرسال الرسالة",
        success: "شكرًا! تم إرسال رسالتك.",
        failure: "فشل الإرسال. حاول مرة أخرى."
      }
      ,
      confirm: {
        message: "شكرًا لتواصلك معنا! سنرد عليك في أقرب وقت",
        writeAnother: "اكتب رسالة أخرى",
        exploreMore: "اكتشف المزيد"
      }
    },
    policy: { title: "سياسة عامة" },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      description: "نصمم مواقع سريعة وتطبيقات وأتمتة ذكية لتنمية نشاطك.",
      menuTitle: "اكتشف",
      contactTitle: "تواصل",
      location: "فرنسا • الاتحاد الأوروبي",
      hours: "نحن متواجدون طوال الأسبوع وعلى مدار الساعة.",
      made: "بُني بعناية – الأداء وإمكانية الوصول أولاً",
      links: {
        home: "العودة إلى الرئيسية",
        projects: "تصفح مشاريعنا",
        policy: "قراءة السياسات",
        contact: "راسلنا",
      },
    },
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

