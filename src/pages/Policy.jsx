import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { useTheme } from '../context/ThemeContext';
import { siteMeta } from '../data/siteMeta';

const blocks = [
  {
    title: 'Éditeur du site',
    paragraphs: [
      'Le site présente les services d’Optimum Tech autour de la création de sites web, des applications et outils sur mesure, de la visibilité digitale et de l’automatisation utile.',
      `Les coordonnées de contact affichées sur le site sont : ${siteMeta.phone}, ${siteMeta.email} et ${siteMeta.locationLabel}.`,
    ],
  },
  {
    title: 'Informations juridiques',
    paragraphs: [
      'Cette page présente les informations générales accessibles sur le site ainsi que les moyens de contact publics actuellement affichés.',
      'Les mentions légales ont vocation à être interprétées avec les informations administratives et contractuelles effectivement publiées par l’éditeur du site.',
    ],
  },
  {
    title: 'Objet du site',
    paragraphs: [
      'Le site a une double fonction : présenter l’activité d’Optimum Tech et publier des ressources éditoriales utiles pour les entreprises locales qui se posent des questions sur leur site, leur visibilité locale et leurs outils digitaux.',
      'Cette précision est importante pour éviter l’impression d’une simple page commerciale trop légère. Le site doit aussi être un support d’information crédible.',
    ],
  },
  {
    title: 'Conditions d usage',
    paragraphs: [
      'Les contenus publiés ont pour but d’informer et d’aider à mieux cadrer un projet digital. Ils ne constituent pas une garantie de résultat commercial ou de positionnement sur Google.',
      'Toute reproduction substantielle du contenu du site doit faire l’objet d’une autorisation du propriétaire légitime des contenus.',
    ],
  },
];

export const Policy = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
      }`}
    >
      <SEO
        path="/policy"
        title="Mentions légales et informations générales | Optimum Tech"
        description="Informations générales du site Optimum Tech, objet du site et modalités de contact affichées publiquement."
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
              Mentions légales et informations générales
            </h1>
            <p className={`mt-5 max-w-3xl text-base leading-8 md:text-lg ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
              Cette page rassemble les informations générales utiles à la compréhension du
              site, de son objet et de ses modalités de contact dans une présentation sobre
              et professionnelle.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-4xl space-y-6">
          {blocks.map((block) => (
            <section
              key={block.title}
              className={`rounded-[2rem] border p-6 md:p-8 ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5'
                  : 'border-black/10 bg-white/80 shadow-lg'
              }`}
            >
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{block.title}</h2>
              <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
                {block.paragraphs.map((paragraph) => (
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
