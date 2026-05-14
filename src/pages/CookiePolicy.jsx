import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { useTheme } from '../context/ThemeContext';

const cookieRows = [
  ['Cookies fonctionnels', 'Maintien de préférences utiles au fonctionnement du site, comme le thème ou certains choix utilisateur.'],
  ['Mesure et scripts techniques', 'Chargement de scripts nécessaires à certains services du site lorsque ceux-ci sont activés.'],
  ['Publicité', 'La présence d’un compte AdSense est déclarée dans le code source, mais l’affichage publicitaire dépend de l’approbation et de la configuration effectives du site.'],
];

export const CookiePolicy = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
      }`}
    >
      <SEO
        path="/cookie-policy"
        title="Politique de cookies | Optimum Tech"
        description="Informations sur les cookies, scripts et choix de consentement sur le site Optimum Tech."
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
              Politique de cookies
            </h1>
            <p className={`mt-5 max-w-3xl text-base leading-8 md:text-lg ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
              Cette page détaille les usages du site liés aux préférences fonctionnelles,
              aux scripts techniques et à l’éventuelle couche publicitaire dans une
              formulation claire pour les visiteurs.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-4xl space-y-6">
          <section
            className={`rounded-[2rem] border p-6 md:p-8 ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5'
                : 'border-black/10 bg-white/80 shadow-lg'
            }`}
          >
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Quels usages sont identifiés</h2>
            <div className="mt-6 grid gap-4">
              {cookieRows.map(([title, desc]) => (
                <div
                  key={title}
                  className={`rounded-[1.5rem] border p-4 ${
                    theme === 'dark' ? 'border-white/10 bg-black/20' : 'border-black/10 bg-black/5'
                  }`}
                >
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/74' : 'text-black/74'}`}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            className={`rounded-[2rem] border p-6 md:p-8 ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5'
                : 'border-black/10 bg-white/80 shadow-lg'
            }`}
          >
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Gestion du consentement</h2>
            <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
              <p>
                Le site intègre un bandeau cookies et un centre de préférences. Cette
                politique a été renforcée pour expliquer le rôle de ces éléments au lieu de
                laisser une page vide.
              </p>
              <p>
                Si de nouveaux cookies ou outils de mesure sont ajoutés plus tard, cette page
                devra être mise à jour avec leurs finalités précises et les choix proposés aux
                visiteurs.
              </p>
            </div>
          </section>

        </section>
      </main>
      <Footer />
    </div>
  );
};
