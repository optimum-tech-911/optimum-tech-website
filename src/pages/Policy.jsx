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
      `Les coordonnées publiquement visibles dans ce dépôt sont : ${siteMeta.phone}, ${siteMeta.email} et ${siteMeta.locationLabel}.`,
    ],
  },
  {
    title: 'Informations juridiques à compléter',
    paragraphs: [
      'Ce dépôt ne contient pas la raison sociale complète, la forme juridique, le numéro SIREN ou SIRET, l’adresse postale complète ni le nom du responsable de publication.',
      'Pour une conformité juridique totale, ces éléments doivent être ajoutés par le propriétaire du site avant publication définitive des mentions légales.',
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
        description="Informations générales du site Optimum Tech et éléments de mentions légales disponibles dans le dépôt."
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
              Cette page a été renforcée pour éviter un signal de site inachevé. Elle expose
              uniquement ce qui peut être affirmé à partir du dépôt actuel et signale
              explicitement ce qui doit encore être complété manuellement.
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

          <section
            className={`rounded-[2rem] border p-6 md:p-8 ${
              theme === 'dark'
                ? 'border-[#007BFF]/20 bg-[#007BFF]/10'
                : 'border-[#007BFF]/15 bg-[#007BFF]/8 shadow-lg'
            }`}
          >
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ce qu’il reste à ajouter manuellement</h2>
            <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/78' : 'text-black/78'}`}>
              <p>Raison sociale ou nom de l’éditeur.</p>
              <p>Forme juridique, SIREN ou SIRET, et adresse postale complète.</p>
              <p>Nom du directeur ou de la directrice de publication.</p>
              <p>Identité complète de l’hébergeur si vous souhaitez une page de mentions légales entièrement finalisée.</p>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
};
