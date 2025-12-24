import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useI18n } from '../i18n.jsx';
import { SEO } from '../components/SEO.jsx';

export const Policy = () => {
  const { lang, t } = useI18n();

  const BlueMatrix = () => <canvas className="w-full h-full" />;

  const PolicyCard = ({
    title,
    titleClass = 'electric-blue-glow',
    children,
    active = false,
    expanded = false,
    onClick,
    onDoubleClick,
    isMobile = false,
  }) =>
    isMobile ? (
      <motion.div
        className={`group touch-target rounded-2xl p-[1px] bg-[linear-gradient(90deg,#0A84FF,#7c3aed,#00E0B8,#0A84FF)] animate-gradient ${
          expanded ? 'ring-4 ring-primary/70' : active ? 'ring-2 ring-primary/60' : ''
        }`}
        onClick={undefined}
        onDoubleClick={undefined}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 1, z: 0 }}
        transition={{ duration: 0 }}
        style={{ maxWidth: '100vw', willChange: 'transform' }}
      >
        <div className="policy-card-frame rounded-2xl">
          <div className="rounded-2xl bg-[#0A1A2F] border border-white/10 overflow-hidden min-h-[320px] shadow-sm">
            <div className="px-5 py-4 border-b border-white/10 bg-transparent">
              <h3 className={`text-xl font-semibold ${titleClass}`}>{title}</h3>
            </div>
            <div className="p-5 leading-relaxed policy-card-content">{children}</div>
          </div>
        </div>
      </motion.div>
    ) : (
      <div
        className="group touch-target rounded-2xl"
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={{ maxWidth: '80vw', maxHeight: '80vh' }}
      >
        <div className="policy-card-frame rounded-2xl">
          <div className="rounded-2xl bg-[#0A1A2F] border border-white/10 overflow-hidden min-h-[320px] shadow-sm">
            <div className="px-5 py-4 border-b border-white/10 bg-transparent">
              <h3 className={`text-xl font-semibold ${titleClass}`}>{title}</h3>
            </div>
            <div className="p-5 leading-relaxed policy-card-content">{children}</div>
          </div>
        </div>
      </div>
    );

  const policiesByLang = {
    en: [
      {
        title: 'Privacy Overview',
        Content: () => (
          <>
            <p className="mb-6">
              At <strong>Optimum Tech</strong>, accessible from{' '}
              <a href="https://optimutech.fr" className="text-[#00E0B8] hover:underline">
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
            <ul className="list-disc list-inside mb-6">
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
            <ul className="list-disc list-inside mb-6">
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
            <ul className="list-disc list-inside mb-6">
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
            <ul className="list-disc list-inside mb-6">
              <li>Right to access, modify, or delete your personal data</li>
              <li>Right to withdraw consent at any time</li>
              <li>Right to data portability</li>
              <li>Right to lodge a complaint with CNIL</li>
            </ul>
          </>
        ),
      },
      {
        title: 'Contact Information',
        Content: () => (
          <>
            <p className="mb-6">
              For any questions or privacy-related requests, you can contact us at:
            </p>
            <p className="font-medium text-[#0A84FF]">
              Optimum Tech
              <br />
              Email:{' '}
              <a href="mailto:optimum.tech.911@gmail.com" className="underline">
                optimum.tech.911@gmail.com
              </a>
              <br />
              {t('footer.location')}
              <br />
              {t('footer.hours')}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://www.instagram.com/ot.optimum_tech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
              <a href="https://optimutech.fr" className="text-[#00E0B8] hover:underline">
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
            <ul className="list-disc list-inside mb-6">
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
            <ul className="list-disc list-inside mb-6">
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
            <ul className="list-disc list-inside mb-6">
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
            <ul className="list-disc list-inside mb-6">
              <li>Accès, rectification, effacement</li>
              <li>Retrait du consentement</li>
              <li>Portabilité</li>
              <li>Réclamation auprès de la CNIL</li>
            </ul>
          </>
        ),
      },
      {
        title: 'Contact',
        Content: () => (
          <>
            <p className="mb-6">Pour toute question liée à la confidentialité :</p>
            <p className="font-medium text-[#0A84FF]">
              Optimum Tech
              <br />
              Email :{' '}
              <a href="mailto:optimum.tech.911@gmail.com" className="underline">
                optimum.tech.911@gmail.com
              </a>
              <br />
              {t('footer.location')}
              <br />
              {t('footer.hours')}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://www.instagram.com/ot.optimum_tech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
    es: [
      {
        title: 'Resumen de Privacidad',
        Content: () => (
          <>
            <p className="mb-6">
              En <strong>Optimum Tech</strong>, accesible desde{' '}
              <a href="https://optimutech.fr" className="text-[#00E0B8] hover:underline">
                optimutech.fr
              </a>
              , tu privacidad es una prioridad. Explicamos cómo tratamos tus datos cuando visitas el
              sitio o nos contactas.
            </p>
          </>
        ),
      },
      {
        title: 'Datos que recopilamos',
        Content: () => (
          <>
            <p className="mb-4">Podemos recopilar:</p>
            <ul className="list-disc list-inside mb-6">
              <li>Nombre completo</li>
              <li>Empresa (opcional)</li>
              <li>Correo electrónico</li>
              <li>Teléfono (opcional)</li>
              <li>Mensaje o adjuntos</li>
            </ul>
            <p className="mb-6">
              Información proporcionada voluntariamente. No recopilamos datos sensibles.
            </p>
          </>
        ),
      },
      {
        title: 'Uso de la información',
        Content: () => (
          <>
            <p className="mb-6">Usamos tus datos para:</p>
            <ul className="list-disc list-inside mb-6">
              <li>Responder solicitudes</li>
              <li>Proveer servicios o propuestas</li>
              <li>Mejorar sitio y comunicación</li>
              <li>Cumplir obligaciones legales</li>
            </ul>
          </>
        ),
      },
      {
        title: 'Base legal (RGPD)',
        Content: () => (
          <>
            <ul className="list-disc list-inside mb-6">
              <li>
                <strong>Consentimiento</strong>
              </li>
              <li>
                <strong>Interés legítimo</strong>
              </li>
            </ul>
          </>
        ),
      },
      {
        title: 'Conservación de datos',
        Content: () => (
          <>
            <p className="mb-6">
              Conservamos los datos solo el tiempo necesario. Mensajes guardados de forma segura y
              eliminados cuando no sean relevantes.
            </p>
          </>
        ),
      },
      {
        title: 'Compartición y seguridad',
        Content: () => (
          <>
            <p className="mb-6">
              No vendemos ni alquilamos tus datos. Acceso restringido y alojamiento seguro.
            </p>
          </>
        ),
      },
      {
        title: 'Analítica y cookies',
        Content: () => (
          <>
            <p className="mb-6">
              Usamos Google Search Console para rendimiento y visibilidad agregados y anónimos. No
              usamos cookies publicitarias.
            </p>
          </>
        ),
      },
      {
        title: 'Tus derechos (RGPD)',
        Content: () => (
          <>
            <ul className="list-disc list-inside mb-6">
              <li>Acceso, rectificación, eliminación</li>
              <li>Retirar consentimiento</li>
              <li>Portabilidad</li>
              <li>Reclamar ante CNIL</li>
            </ul>
          </>
        ),
      },
      {
        title: 'Contacto',
        Content: () => (
          <>
            <p className="mb-6">Para consultas o solicitudes:</p>
            <p className="font-medium text-[#0A84FF]">
              Optimum Tech
              <br />
              Email:{' '}
              <a href="mailto:optimum.tech.911@gmail.com" className="underline">
                optimum.tech.911@gmail.com
              </a>
              <br />
              {t('footer.location')}
              <br />
              {t('footer.hours')}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://www.instagram.com/ot.optimum_tech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
          </>
        ),
      },
      {
        title: 'Actualizaciones',
        Content: () => (
          <>
            <p className="mb-6">
              Esta política puede actualizarse por cambios legales o de práctica. Publicaremos la
              fecha revisada.
            </p>
            <p className="text-sm opacity-70">Última actualización: noviembre de 2025</p>
          </>
        ),
      },
      {
        title: 'Términos de Servicio',
        Content: () => (
          <>
            <p className="mb-4">Estos términos regulan el uso del sitio y servicios.</p>
            <p className="mb-4">
              Al acceder, aceptas actuar legalmente y respetar la propiedad intelectual.
            </p>
            <p className="mb-4">
              Las ofertas pueden cambiar; disputas regidas por la ley francesa.
            </p>
            <p className="text-sm opacity-70">Vigencia: noviembre de 2025</p>
          </>
        ),
      },
      {
        title: 'Política de Cookies',
        Content: () => (
          <>
            <p className="mb-4">Usamos solo cookies esenciales y analítica agregada.</p>
            <p className="mb-4">Puedes controlarlas desde la configuración del navegador.</p>
            <p className="text-sm opacity-70">Vigencia: noviembre de 2025</p>
          </>
        ),
      },
    ],
    ar: [
      {
        title: 'نظرة عامة على الخصوصية',
        Content: () => (
          <>
            <p className="mb-6">
              في <strong>Optimum Tech</strong>، والمتاحة عبر{' '}
              <a href="https://optimutech.fr" className="text-[#00E0B8] hover:underline">
                optimutech.fr
              </a>
              ، خصوصيتك أولوية. نوضح كيفية معالجة بياناتك عند زيارة الموقع أو التواصل معنا.
            </p>
          </>
        ),
      },
      {
        title: 'البيانات التي نجمعها',
        Content: () => (
          <>
            <p className="mb-4">قد نجمع:</p>
            <ul className="list-disc list-inside mb-6">
              <li>الاسم الكامل</li>
              <li>اسم الشركة (اختياري)</li>
              <li>البريد الإلكتروني</li>
              <li>رقم الهاتف (اختياري)</li>
              <li>الرسائل أو المرفقات</li>
            </ul>
            <p className="mb-6">تُقدَّم المعلومات طوعاً. لا نجمع بيانات حساسة.</p>
          </>
        ),
      },
      {
        title: 'كيفية استخدام البيانات',
        Content: () => (
          <>
            <ul className="list-disc list-inside mb-6">
              <li>الرد على الاستفسارات</li>
              <li>تقديم الخدمات أو العروض</li>
              <li>تحسين الموقع والتواصل</li>
              <li>الامتثال للقانون</li>
            </ul>
          </>
        ),
      },
      {
        title: 'الأساس القانوني (GDPR)',
        Content: () => (
          <>
            <ul className="list-disc list-inside mb-6">
              <li>
                <strong>الموافقة</strong>
              </li>
              <li>
                <strong>المصلحة المشروعة</strong>
              </li>
            </ul>
          </>
        ),
      },
      {
        title: 'الاحتفاظ بالبيانات',
        Content: () => (
          <>
            <p className="mb-6">
              نحتفظ بالبيانات للمدة اللازمة فقط. تُخزَّن الرسائل بأمان وتُحذف عند عدم الحاجة.
            </p>
          </>
        ),
      },
      {
        title: 'المشاركة والأمن',
        Content: () => (
          <>
            <p className="mb-6">
              لا نبيع بياناتك ولا نؤجرها. الوصول مقصور على المخوّلين ومحمي باستضافة آمنة.
            </p>
          </>
        ),
      },
      {
        title: 'التحليلات وملفات تعريف الارتباط',
        Content: () => (
          <>
            <p className="mb-6">
              نستخدم Google Search Console لتحليلات مجمّعة ومجهولة. لا نستخدم ملفات تعريف الارتباط
              الإعلانية.
            </p>
          </>
        ),
      },
      {
        title: 'حقوقك (GDPR)',
        Content: () => (
          <>
            <ul className="list-disc list-inside mb-6">
              <li>الوصول، التصحيح، الحذف</li>
              <li>سحب الموافقة</li>
              <li>قابلية نقل البيانات</li>
              <li>الشكوى لدى CNIL</li>
            </ul>
          </>
        ),
      },
      {
        title: 'معلومات الاتصال',
        Content: () => (
          <>
            <p className="mb-6">للاستفسارات أو الطلبات المتعلقة بالخصوصية:</p>
            <p className="font-medium text-[#0A84FF]">
              Optimum Tech
              <br />
              البريد:{' '}
              <a href="mailto:optimum.tech.911@gmail.com" className="underline">
                optimum.tech.911@gmail.com
              </a>
              <br />
              {t('footer.location')}
              <br />
              {t('footer.hours')}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://www.instagram.com/ot.optimum_tech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition btn-electric btn-heartbeat"
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
          </>
        ),
      },
      {
        title: 'التحديثات',
        Content: () => (
          <>
            <p className="mb-6">
              قد نقوم بتحديث هذه السياسة تبعاً للتغييرات القانونية أو العملية. سننشر التاريخ
              المعدّل.
            </p>
            <p className="text-sm opacity-70">آخر تحديث: نوفمبر 2025</p>
          </>
        ),
      },
      {
        title: 'شروط الخدمة',
        Content: () => (
          <>
            <p className="mb-4">تنظّم هذه الشروط استخدام موقع Optimum Tech وخدماته.</p>
            <p className="mb-4">
              بدخولك للموقع، توافق على الالتزام بالقانون واحترام الملكية الفكرية.
            </p>
            <p className="mb-4">قد تتغيّر العروض؛ تُحكم النزاعات بالقانون الفرنسي.</p>
            <p className="text-sm opacity-70">تاريخ السريان: نوفمبر 2025</p>
          </>
        ),
      },
      {
        title: 'سياسة ملفات تعريف الارتباط',
        Content: () => (
          <>
            <p className="mb-4">نستخدم ملفات أساسية فقط وتحليلات أداء مجمّعة.</p>
            <p className="mb-4">يمكنك التحكم بها عبر إعدادات المتصفح.</p>
            <p className="text-sm opacity-70">تاريخ السريان: نوفمبر 2025</p>
          </>
        ),
      },
    ],
  };

  const policies = policiesByLang[lang] || policiesByLang.en;
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  // reducedMotion not used directly in this component UI
  const [isMobile, setIsMobile] = useState(false);
  const total = (policiesByLang[lang] || policiesByLang.en).length;
  const contactIdx = Math.max(0, total - 4);
  const rightsIdx = Math.max(0, total - 5);
  const baseSeq = Array.from({ length: total }, (_, i) => i).filter(
    (i) => i !== 0 && i !== contactIdx && i !== rightsIdx
  );
  const orderSequence = [0, contactIdx, rightsIdx, ...baseSeq];
  const mobileOrderRankMap = new Map(orderSequence.map((v, i) => [v, i]));
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener('change', update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', update);
      else mq.removeListener(update);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <SEO
        path="/policy"
        title="Informations Légales & Conformité – Optimum Tech"
        description="Toutes les informations légales et de conformité du site Optimum Tech."
      />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <BlueMatrix />
      </div>
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 py-16 text-gray-200 leading-relaxed">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          style={{ perspective: 1000 }}
        >
          {policies.map(({ title, Content }, idx) => {
            const isActive = focusedIndex === idx && expandedIndex === null;
            return (
              <div
                key={idx}
                className={
                  isMobile
                    ? `order-[${(mobileOrderRankMap.get(idx) ?? idx) + 1}] md:order-none`
                    : ''
                }
              >
                <PolicyCard
                  title={title}
                  active={isMobile ? false : isActive}
                  expanded={isMobile ? false : expandedIndex === idx}
                  isMobile={isMobile}
                  onClick={() => {
                    if (isMobile) return;
                    if (expandedIndex !== null) {
                      setExpandedIndex(null);
                      setFocusedIndex(null);
                    } else if (focusedIndex === idx) {
                      setFocusedIndex(null);
                    } else {
                      setFocusedIndex(idx);
                    }
                  }}
                  onDoubleClick={() => {
                    if (isMobile) return;
                    setExpandedIndex(idx);
                    setFocusedIndex(null);
                  }}
                >
                  <Content />
                </PolicyCard>
              </div>
            );
          })}
        </div>
      </main>
      {!isMobile && expandedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {(() => {
            const { title, Content } = policies[expandedIndex];
            return (
              <PolicyCard
                title={title}
                expanded
                isMobile={false}
                onClick={() => {
                  setExpandedIndex(null);
                  setFocusedIndex(null);
                }}
                onDoubleClick={() => {
                  setExpandedIndex(expandedIndex);
                }}
              >
                <Content />
              </PolicyCard>
            );
          })()}
        </div>
      )}
      <Footer />
    </div>
  );
};
