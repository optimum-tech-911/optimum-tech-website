import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useTheme } from '../context/ThemeContext';

export const AboutPage = () => {
  const { theme } = useTheme();
  const breadcrumbs = [
    { label: 'Accueil', to: '/' },
    { label: 'À propos', to: '/a-propos' },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
      }`}
    >
      <SEO
        path="/a-propos"
        title="À propos d’Optimum Tech | Web, SEO et automatisation IA"
        description="Découvrez Optimum Tech, spécialiste de la création de site web, du SEO local et de l’automatisation IA pour les entreprises à Sète, dans l’Hérault, en Occitanie et en France."
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.label,
              item: `https://optimutech.fr${item.to}`,
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'À propos d’Optimum Tech',
            url: 'https://optimutech.fr/a-propos',
            description:
              'Présentation d’Optimum Tech, de ses services et de sa manière d’accompagner les entreprises.',
          },
        ]}
      />
      <Navbar />

      <main className="flex-1 px-4 py-28 md:px-6">
        <section className="mx-auto max-w-5xl">
          <div
            className={`rounded-[2.8rem] border px-6 py-10 md:px-10 md:py-14 ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5'
                : 'border-black/10 bg-white/75 shadow-xl'
            }`}
          >
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              Optimum Tech aide les entreprises à transformer leur présence digitale en levier commercial
            </h1>
            <p className={`mt-5 max-w-3xl text-lg leading-8 ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
              Nous intervenons sur la création de site web, le référencement SEO, l’automatisation IA et les solutions digitales utiles aux entreprises qui veulent plus de clarté, plus de visibilité et plus de demandes qualifiées.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-5xl grid gap-6 md:grid-cols-2">
          {[
            'Positionnement clair autour de la génération de leads',
            'Approche white-hat compatible avec les recommandations Google',
            'Travail possible sur Sète, l’Hérault, l’Occitanie et la France',
            'Structure pensée pour relier branding, visibilité et conversion',
          ].map((item) => (
            <div
              key={item}
              className={`rounded-[2rem] border p-6 ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5'
                  : 'border-black/10 bg-white/80 shadow-lg'
              }`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-[#007BFF]" />
                <p className="text-base leading-7">{item}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="mx-auto mt-12 max-w-5xl rounded-[2rem] border p-6 md:p-8">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ce que nous cherchons à améliorer pour vous</h2>
          <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
            <p>Un site plus compréhensible, des snippets plus convaincants, des pages plus ciblées, un maillage plus utile et une meilleure cohérence entre votre marque et vos services.</p>
            <p>En pratique, cela veut dire des pages pensées pour les intentions de recherche réelles, une structure technique plus propre et un parcours qui pousse naturellement vers la prise de contact.</p>
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#007BFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007BFF]/90"
          >
            Nous parler de votre projet
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};
