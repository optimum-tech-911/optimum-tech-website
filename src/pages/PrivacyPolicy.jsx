import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { useTheme } from '../context/ThemeContext';
import { siteMeta } from '../data/siteMeta';

const sections = [
  {
    title: 'Responsable du traitement',
    content: [
      'Les demandes envoyées via le site sont traitées par Optimum Tech afin de répondre aux messages, qualifier les besoins exprimés et échanger avec les personnes qui sollicitent un devis ou un accompagnement.',
      `Le point de contact disponible sur ce site est ${siteMeta.email}.`,
    ],
  },
  {
    title: 'Données pouvant être collectées',
    content: [
      'Selon les formulaires utilisés, le site peut recueillir le nom, l’e-mail, le téléphone, le nom de l’entreprise et les informations transmises librement dans le message.',
      'Ces données ne sont demandées que pour comprendre la demande et recontacter la personne concernée. Aucune donnée sensible n’est demandée volontairement via ce formulaire.',
      'Après consentement analytics, le site peut aussi enregistrer les pages consultées, les boutons utilisés, les projets ouverts et un identifiant aléatoire limité à la session. Les contenus saisis dans les formulaires et les paramètres d’URL sont exclus de cette mesure.',
    ],
  },
  {
    title: 'Finalités du traitement',
    content: [
      'Répondre à une prise de contact, préparer un échange commercial ou technique, conserver un historique minimal des demandes reçues et améliorer la compréhension des besoins les plus fréquents.',
      'Le site ne présente pas ces traitements comme un système publicitaire autonome. Ils servent d’abord à la relation de contact initiée par le visiteur.',
    ],
  },
  {
    title: 'Base légale',
    content: [
      'Le traitement repose principalement sur la demande volontaire de la personne qui remplit le formulaire et sur l’intérêt légitime à répondre correctement aux sollicitations reçues.',
      'La mesure d’audience et des interactions repose sur le consentement donné depuis le bandeau cookies. Elle reste désactivée lorsque ce consentement est refusé.',
    ],
  },
  {
    title: 'Durée de conservation',
    content: [
      'Les messages ne devraient être conservés que pendant la durée utile au traitement de la demande, au suivi de l’échange et à l’éventuelle relation précontractuelle qui en découle.',
      'Les données de contact sont conservées pour le temps strictement nécessaire à la gestion de la demande et au suivi de la relation engagée par le visiteur.',
    ],
  },
  {
    title: 'Destinataires',
    content: [
      'Les données issues du formulaire sont destinées à la gestion de la relation de contact d’Optimum Tech et peuvent transiter par les outils techniques nécessaires au fonctionnement du site et du formulaire.',
      'Les données ne sont pas présentées sur ce site comme faisant l’objet d’une revente ou d’un partage commercial autonome avec des tiers.',
    ],
  },
  {
    title: 'Vos droits',
    content: [
      'Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression des informations vous concernant, ainsi que la limitation ou l’opposition au traitement lorsque cela s’applique.',
      `Pour exercer ces droits, le canal de contact affiché sur le site reste ${siteMeta.email}.`,
    ],
  },
];

export const PrivacyPolicy = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
      }`}
    >
      <SEO
        path="/privacy-policy"
        title="Politique de confidentialité | Optimum Tech"
        description="Informations sur l’usage des données de contact collectées via le site Optimum Tech."
        robots="noindex, follow"
      />
      <Navbar />
      <main className="px-4 py-28 md:px-6">
        <section className="mx-auto max-w-4xl">
          <div
            className={`rounded-[2.5rem] border px-6 py-10 md:px-10 md:py-14 ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5'
                : 'border-black/10 bg-white/80 shadow-xl'
            }`}
          >
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Politique de confidentialité
            </h1>
            <p className={`mt-5 max-w-3xl text-base leading-8 md:text-lg ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
              Cette page explique ce que le site collecte lorsqu’un visiteur prend contact
              avec Optimum Tech. Elle présente de manière concise l’usage des données de
              contact et les principes de traitement associés.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-4xl space-y-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className={`rounded-[2rem] border p-6 md:p-8 ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5'
                  : 'border-black/10 bg-white/80 shadow-lg'
              }`}
            >
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{section.title}</h2>
              <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

        </section>
      </main>
      <Footer />
    </div>
  );
};
