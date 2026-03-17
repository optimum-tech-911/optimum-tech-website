import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useI18n } from '../i18n.jsx';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO.jsx';
import { ScrollReveal } from '../components/ScrollReveal';

export const Policy = () => {
  const { lang, t } = useI18n();
  const { theme } = useTheme();

  const PolicyCard = ({ title, children }) => (
    <ScrollReveal className="w-full max-w-4xl mx-auto mb-12">
      <div className={`rounded-[2rem] border p-8 md:p-12 shadow-2xl relative overflow-hidden group transition-all duration-500 ${
      theme === 'dark' 
        ? 'border-white/10 bg-white/5 backdrop-blur-2xl' 
        : 'border-black/10 bg-gray-500/10 backdrop-blur-2xl shadow-2xl'
    }`}>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#007BFF]/5 blur-[100px] rounded-full group-hover:bg-[#007BFF]/10 transition-all duration-1000" />
        <h3 className={`text-3xl md:text-4xl font-bold tracking-tight mb-8 border-b pb-4 text-[#007BFF] ${
          theme === 'dark' ? 'border-white/5' : 'border-black/5'
        }`}>
          {title}
        </h3>
        <div className={`text-lg font-light leading-relaxed policy-card-content ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          {children}
        </div>
      </div>
    </ScrollReveal>
  );

  const policiesByLang = {
    en: [
      {
        title: 'Privacy Overview',
        Content: () => (
          <>
            <p className="mb-6">
              At <strong>Optimum Tech</strong>, accessible from{' '}
              <a href="https://optimutech.fr" className="text-[#007BFF] hover:underline">
                optimutech.fr
              </a>
              , your privacy is one of our main priorities. This Privacy Policy explains how we
              handle your personal data when you visit our website, fill out a contact form, or
              interact with our services.
            </p>
          </>
        ),
      },
      {
        title: 'Information We Collect',
        Content: () => (
          <>
            <p className="mb-4">
              When you contact us through our website, we may collect the following information:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Your full name</li>
              <li>Your business name (optional)</li>
              <li>Your email address</li>
              <li>Your phone number (optional)</li>
              <li>Any message or attachments you send us</li>
            </ul>
            <p className="mb-6">
              This information is provided voluntarily by you when filling out the contact form. We
              do not collect sensitive personal data such as financial or health information.
            </p>
          </>
        ),
      },
      {
        title: 'How We Use Your Information',
        Content: () => (
          <>
            <p className="mb-6">The information you provide is used exclusively to:</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Respond to your inquiries or requests</li>
              <li>Provide services or project proposals you ask for</li>
              <li>Improve our website and communication</li>
              <li>Comply with legal obligations under French and EU law</li>
            </ul>
          </>
        ),
      },
      {
        title: 'Legal Basis (GDPR)',
        Content: () => (
          <>
            <p className="mb-6">
              Under the EU General Data Protection Regulation (GDPR), we process personal data based
              on:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                <strong>Consent:</strong> You voluntarily provide information via our forms.
              </li>
              <li>
                <strong>Legitimate interest:</strong> To respond to your requests and improve our
                services.
              </li>
            </ul>
          </>
        ),
      },
      {
        title: 'Data Retention',
        Content: () => (
          <>
            <p className="mb-6">
              We retain personal data only as long as necessary to fulfill the purposes outlined in
              this policy. Messages received via contact forms are stored securely and deleted when
              no longer relevant.
            </p>
          </>
        ),
      },
      {
        title: 'Sharing and Security',
        Content: () => (
          <>
            <p className="mb-6">
              We do not sell, rent, or trade your personal information. Access to personal data is
              restricted to authorized personnel and protected through secure hosting providers.
            </p>
          </>
        ),
      },
      {
        title: 'Analytics and Cookies',
        Content: () => (
          <>
            <p className="mb-6">
              Our website uses <strong>Google Search Console</strong> to analyze performance and
              search visibility. This tool may collect general usage data in an anonymized form. We
              do not use advertising cookies or tracking pixels.
            </p>
          </>
        ),
      },
      {
        title: 'Your Rights (GDPR)',
        Content: () => (
          <>
            <p className="mb-4">
              As a visitor residing in the European Union, you have the following rights:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Right to access, modify, or delete your personal data</li>
              <li>Right to withdraw consent at any time</li>
              <li>Right to data portability</li>
              <li>Right to lodge a complaint with CNIL</li>
            </ul>
          </>
        ),
      },
      {
        title: 'Policy Updates',
        Content: () => (
          <>
            <p className="mb-6">
              This Privacy Policy may be updated occasionally to reflect changes in our practices or
              legal requirements. Any updates will be published on this page with the revised date.
            </p>
            <p className="text-sm opacity-70">Last updated: November 2025</p>
          </>
        ),
      },
      {
        title: 'Terms of Service',
        Content: () => (
          <>
            <p className="mb-4">
              These terms govern the use of Optimum Tech’s website and services.
            </p>
            <p className="mb-4">
              By accessing our site, you agree to act lawfully and respect intellectual property.
            </p>
            <p className="mb-4">
              Service offerings may change; any disputes are governed by French law.
            </p>
            <p className="text-sm opacity-70">Effective date: November 2025</p>
          </>
        ),
      },
      {
        title: 'Cookie Policy',
        Content: () => (
          <>
            <p className="mb-4">
              We use only essential cookies and analytics for aggregated performance insights.
            </p>
            <p className="mb-4">You can control cookies via your browser settings.</p>
            <p className="text-sm opacity-70">Effective date: November 2025</p>
          </>
        ),
      },
    ],
    fr: [
      {
        title: 'Aperçu de la Confidentialité',
        Content: () => (
          <>
            <p className="mb-6">
              Chez <strong>Optimum Tech</strong>, accessible depuis{' '}
              <a href="https://optimutech.fr" className="text-[#007BFF] hover:underline">
                optimutech.fr
              </a>
              , votre vie privée est une priorité. Cette politique explique comment nous traitons
              vos données personnelles lorsque vous visitez notre site, remplissez un formulaire de
              contact ou interagissez avec nos services.
            </p>
          </>
        ),
      },
      {
        title: 'Données collectées',
        Content: () => (
          <>
            <p className="mb-4">Lorsque vous nous contactez, nous pouvons collecter :</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Nom complet</li>
              <li>Nom de la société (optionnel)</li>
              <li>Adresse e‑mail</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Message ou pièces jointes</li>
            </ul>
            <p className="mb-6">
              Informations fournies volontairement. Aucune donnée sensible n’est collectée.
            </p>
          </>
        ),
      },
      {
        title: 'Utilisation des données',
        Content: () => (
          <>
            <p className="mb-6">Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Répondre à vos demandes</li>
              <li>Fournir services ou propositions</li>
              <li>Améliorer le site et la communication</li>
              <li>Respecter les obligations légales</li>
            </ul>
          </>
        ),
      },
      {
        title: 'Base légale (RGPD)',
        Content: () => (
          <>
            <p className="mb-6">Le traitement repose sur :</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                <strong>Consentement</strong>
              </li>
              <li>
                <strong>Intérêt légitime</strong>
              </li>
            </ul>
          </>
        ),
      },
      {
        title: 'Durée de conservation',
        Content: () => (
          <>
            <p className="mb-6">
              Conservation uniquement le temps nécessaire. Messages stockés de manière sécurisée,
              puis supprimés.
            </p>
          </>
        ),
      },
      {
        title: 'Partage et sécurité',
        Content: () => (
          <>
            <p className="mb-6">
              Aucune vente ou location des données. Accès limité et hébergement sécurisé.
            </p>
          </>
        ),
      },
      {
        title: 'Analyses et cookies',
        Content: () => (
          <>
            <p className="mb-6">
              Nous utilisons Google Search Console pour des analyses agrégées et anonymisées. Aucun
              cookie publicitaire.
            </p>
          </>
        ),
      },
      {
        title: 'Vos droits (RGPD)',
        Content: () => (
          <>
            <p className="mb-4">Vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>Accès, rectification, effacement</li>
              <li>Retrait du consentement</li>
              <li>Portabilité</li>
              <li>Réclamation auprès de la CNIL</li>
            </ul>
          </>
        ),
      },
      {
        title: 'Mises à jour',
        Content: () => (
          <>
            <p className="mb-6">
              Cette politique peut être mise à jour pour refléter des évolutions légales ou de nos
              pratiques.
            </p>
            <p className="text-sm opacity-70">Dernière mise à jour : novembre 2025</p>
          </>
        ),
      },
      {
        title: 'Conditions d’Utilisation',
        Content: () => (
          <>
            <p className="mb-4">
              Ces conditions régissent l’utilisation du site et des services d’Optimum Tech.
            </p>
            <p className="mb-4">
              En accédant au site, vous acceptez d’agir légalement et de respecter la propriété
              intellectuelle.
            </p>
            <p className="mb-4">
              Les offres peuvent évoluer ; tout litige est régi par le droit français.
            </p>
            <p className="text-sm opacity-70">Date d’effet : novembre 2025</p>
          </>
        ),
      },
      {
        title: 'Politique des Cookies',
        Content: () => (
          <>
            <p className="mb-4">
              Nous utilisons uniquement des cookies essentiels et des analyses agrégées.
            </p>
            <p className="mb-4">Vous pouvez les contrôler via les paramètres du navigateur.</p>
            <p className="text-sm opacity-70">Date d’effet : novembre 2025</p>
          </>
        ),
      },
    ],
  };

  const currentPolicies = policiesByLang[lang] || policiesByLang.en;

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col relative overflow-x-hidden ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
    }`}>
      <SEO path="/policy" title={t('policy.title')} />
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-24 relative z-10">
        <ScrollReveal className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            {t('policy.title')}
          </h1>
          <p className={`text-xl md:text-2xl font-light max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-white/50' : 'text-black/50'
          }`}>
            Our commitment to transparency, privacy, and excellence in every project.
          </p>
        </ScrollReveal>

        <div className="space-y-12">
          {currentPolicies.map((p, i) => (
            <PolicyCard key={i} title={p.title}>
              <p.Content />
            </PolicyCard>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
