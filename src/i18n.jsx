import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const I18nContext = createContext({ lang: "fr", dir: "ltr", t: (k) => k, setLang: () => {} });

const safeWindow = () => (typeof window === "undefined" ? undefined : window);
const getStoredLang = () => {
  const win = safeWindow();
  if (!win?.localStorage) return null;
  try {
    return win.localStorage.getItem("lang");
  } catch {
    return null;
  }
};
const setStoredLang = (value) => {
  const win = safeWindow();
  if (!win?.localStorage) return;
  try {
    win.localStorage.setItem("lang", value);
  } catch {
    // ignore write issues (Safari private mode, etc.)
  }
};

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
      missionTitle: "Mission",
      mission1: "Notre mission est de rendre la technologie simple, rapide et accessible pour chaque entreprise.",
      mission2: "Chez Optimum Tech, nous créons des sites web performants, des automatisations intelligentes et des outils IA qui améliorent réellement votre quotidien.",
      mission3: "Notre objectif : vous faire gagner du temps, augmenter votre efficacité et vous aider à atteindre vos ambitions plus rapidement.",
      visionTitle: "Vision",
      vision1: "Nous imaginons un futur où l’IA et l’automatisation sont au service de tous — même des plus petites structures.",
      vision2: "Notre vision est un monde où chaque entrepreneur peut se développer plus vite, sans complexité technique et sans perte de temps, grâce à des solutions modernes, fiables et conçues pour durer.",
      vision3: "Chez Optimum Tech, nous construisons ce futur, un projet après l’autre.",
    },
    intro: { title: "Optimum Tech", subtitle: "Bienvenue sur votre site" },
    projects: { title: "Projets", swipeMore: "Glisser pour voir plus", swipeNext: "Voir suivant", prev: "Projet précédent", next: "Projet suivant" },
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
        failure: "Échec de l’envoi. Réessayez.",
        genericError: "Échec de l’envoi. Contactez-nous sur optimum.tech.911@gmail.com en attendant."
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
    cookies: {
      bannerTitle: "Cookies",
      bannerText: "Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez accepter, refuser ou gérer vos préférences.",
      acceptAll: "Accepter tout",
      rejectAll: "Refuser tout",
      settings: "Paramètres",
      settingsTitle: "Paramètres des cookies",
      analyticsTitle: "Statistiques (GTM/GA)",
      analyticsDesc: "Activez les cookies analytiques pour des mesures anonymisées.",
      save: "Enregistrer",
      cancel: "Annuler",
      reopen: "Paramètres",
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
      missionTitle: "Mission",
      mission1: "Our mission is to make technology simple, fast, and accessible for every business.",
      mission2: "At Optimum Tech, we build high-performance websites, smart automations, and AI tools that truly improve your day-to-day.",
      mission3: "Our goal: save you time, increase efficiency, and help you reach your ambitions faster.",
      visionTitle: "Vision",
      vision1: "We imagine a future where AI and automation serve everyone — even the smallest teams.",
      vision2: "Our vision is a world where every entrepreneur can grow faster, without technical complexity or wasted time, through modern, reliable solutions built to last.",
      vision3: "At Optimum Tech, we’re building that future, one project at a time.",
    },
    intro: { title: "Optimum Tech", subtitle: "Welcome to your website" },
    projects: { title: "Projects", swipeMore: "Swipe to see more", swipeNext: "See next", prev: "Previous project", next: "Next project" },
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
        failure: "Sending failed. Please retry.",
        genericError: "We couldn't send this message. Email us at optimum.tech.911@gmail.com while we sort this out."
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
    cookies: {
      bannerTitle: "Cookies",
      bannerText: "We use cookies to improve your experience. You can accept, refuse, or manage your preferences.",
      acceptAll: "Accept all",
      rejectAll: "Reject all",
      settings: "Settings",
      settingsTitle: "Cookie settings",
      analyticsTitle: "Analytics (GTM/GA)",
      analyticsDesc: "Enable analytics cookies for anonymized measurement.",
      save: "Save",
      cancel: "Cancel",
      reopen: "Settings",
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
      missionTitle: "Misión",
      mission1: "Nuestra misión es hacer la tecnología simple, rápida y accesible para cada empresa.",
      mission2: "En Optimum Tech creamos sitios web de alto rendimiento, automatizaciones inteligentes y herramientas de IA que mejoran tu día a día.",
      mission3: "Nuestro objetivo: ahorrarte tiempo, aumentar tu eficiencia y ayudarte a alcanzar tus metas más rápido.",
      visionTitle: "Visión",
      vision1: "Imaginamos un futuro donde la IA y la automatización estén al servicio de todos — incluso de las estructuras más pequeñas.",
      vision2: "Nuestra visión es un mundo donde cada emprendedor pueda crecer más rápido, sin complejidad técnica ni pérdida de tiempo, gracias a soluciones modernas, fiables y duraderas.",
      vision3: "En Optimum Tech construimos ese futuro, un proyecto tras otro.",
    },
    intro: { title: "Optimum Tech", subtitle: "Bienvenido a tu sitio web" },
    projects: { title: "Proyectos", swipeMore: "Desliza para ver más", swipeNext: "Ver siguiente", prev: "Proyecto anterior", next: "Proyecto siguiente" },
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
        failure: "Error al enviar. Inténtalo de nuevo.",
        genericError: "No pudimos enviar tu mensaje. Escríbenos a optimum.tech.911@gmail.com mientras lo solucionamos."
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
    cookies: {
      bannerTitle: "Cookies",
      bannerText: "Usamos cookies para mejorar tu experiencia. Puedes aceptar, rechazar o gestionar tus preferencias.",
      acceptAll: "Aceptar todo",
      rejectAll: "Rechazar todo",
      settings: "Configuración",
      settingsTitle: "Configuración de cookies",
      analyticsTitle: "Estadísticas (GTM/GA)",
      analyticsDesc: "Activa las cookies analíticas para mediciones anonimizadas.",
      save: "Guardar",
      cancel: "Cancelar",
      reopen: "Configuración",
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
      missionTitle: "الرسالة",
      mission1: "رسالتنا هي جعل التكنولوجيا بسيطة وسريعة ومتاحة لكل شركة.",
      mission2: "في Optimum Tech، نبني مواقع عالية الأداء وأتمتة ذكية وأدوات ذكاء اصطناعي تحسّن يومك فعلاً.",
      mission3: "هدفنا: توفير الوقت وزيادة الكفاءة ومساعدتك على تحقيق طموحاتك بسرعة.",
      visionTitle: "الرؤية",
      vision1: "نتخيل مستقبلًا تكون فيه الذكاء الاصطناعي والأتمتة في خدمة الجميع — حتى أصغر الفرق.",
      vision2: "رؤيتنا عالم يتمكن فيه كل رائد أعمال من النمو بسرعة دون تعقيد تقني أو هدر للوقت، بفضل حلول حديثة وموثوقة ومصممة لتدوم.",
      vision3: "في Optimum Tech نبني هذا المستقبل، مشروعًا بعد آخر.",
    },
    intro: { title: "Optimum Tech", subtitle: "مرحباً بك في موقعك" },
    projects: { title: "المشاريع", swipeMore: "اسحب لرؤية المزيد", swipeNext: "التالي", prev: "المشروع السابق", next: "المشروع التالي" },
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
        failure: "فشل الإرسال. حاول مرة أخرى.",
        genericError: "تعذر إرسال الرسالة. راسلنا على optimum.tech.911@gmail.com مؤقتًا."
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
    cookies: {
      bannerTitle: "ملفات تعريف الارتباط",
      bannerText: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك القبول أو الرفض أو إدارة التفضيلات.",
      acceptAll: "قبول الكل",
      rejectAll: "رفض الكل",
      settings: "الإعدادات",
      settingsTitle: "إعدادات ملفات تعريف الارتباط",
      analyticsTitle: "الإحصاءات (GTM/GA)",
      analyticsDesc: "فعّل ملفات تعريف الارتباط التحليلية لقياسات مجهولة.",
      save: "حفظ",
      cancel: "إلغاء",
      reopen: "الإعدادات",
    },
  },
};

const DIR = { ar: "rtl", fr: "ltr", en: "ltr", es: "ltr" };

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => getStoredLang() || "fr");
  const dir = DIR[lang] || "ltr";

  useEffect(() => {
    setStoredLang(lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
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
