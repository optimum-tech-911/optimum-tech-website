import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useTheme } from '../context/ThemeContext';
import { siteMeta, trustHighlights } from '../data/siteMeta';

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
        title="À propos d’Optimum Tech | Sites, applications et solutions digitales"
        description="Découvrez Optimum Tech, studio de création de sites web, web apps, logiciels sur mesure, automatisations utiles et visibilité digitale pour les entreprises à Sète, dans l’Hérault, en Occitanie et en France."
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
              Optimum Tech aide les entreprises à transformer une présence digitale floue en outil plus clair, plus utile et mieux structuré
            </h1>
            <p className={`mt-5 max-w-3xl text-lg leading-8 ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
              Le positionnement est simple : concevoir des sites web, des applications et
              des outils digitaux sur mesure, renforcer la visibilité quand elle compte et
              ajouter des automatisations seulement quand elles ont un vrai intérêt pour
              l’activité.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-5xl grid gap-6 md:grid-cols-2">
          {trustHighlights.map((item) => (
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

        <section className={`mx-auto mt-12 max-w-5xl rounded-[2rem] border p-6 md:p-8 ${
          theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-lg'
        }`}>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ce que nous cherchons à améliorer chez nos clients</h2>
          <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
            <p>
              La clarté de l’offre, la compréhension des services, la confiance perçue, la
              facilité de contact et la cohérence entre ce que l’entreprise promet et ce que
              le site montre réellement.
            </p>
            <p>
              Cela implique souvent moins d’effets et plus de structure : de meilleures pages
              services, une page contact plus complète, une base SEO locale propre, un blog
              qui répond à de vraies questions, ou parfois un outil métier mieux adapté à la
              manière dont l’entreprise fonctionne.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-5xl grid gap-6 lg:grid-cols-2">
          <div className={`rounded-[2rem] border p-6 md:p-8 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-lg'
          }`}>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Notre manière de travailler</h2>
            <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
              <p>
                Nous essayons d’abord de comprendre ce qui bloque : site trop léger, offre
                peu lisible, absence de pages utiles, besoin d’un outil interne plus clair,
                mauvais relais entre visibilité digitale et conversion, ou encore processus
                répétitifs qui prennent trop de temps.
              </p>
              <p>
                Ensuite, nous priorisons. Toutes les entreprises n’ont pas besoin d’une web
                app ou d’automatisations avancées. Parfois, la meilleure amélioration est une
                architecture plus simple, un contenu plus fort et un meilleur chemin de
                contact.
              </p>
            </div>
          </div>

          <div className={`rounded-[2rem] border p-6 md:p-8 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-lg'
          }`}>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ce que cette page affirme sans exagérer</h2>
            <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
              <p>
                Optimum Tech intervient sur des sujets de création de site web, web apps,
                outils métier sur mesure, SEO local, visibilité digitale et automatisation
                utile pour des entreprises en France, avec un ancrage mis en avant autour de
                Sète, de l’Hérault et de l’Occitanie.
              </p>
              <p>
                Nous ne revendiquons pas de classement garanti, de statistiques fabriquées ou
                de distinctions non vérifiables. L’enjeu est de rester crédible, lisible et
                joignable.
              </p>
            </div>
          </div>
        </section>

        <section className={`mx-auto mt-12 max-w-5xl rounded-[2rem] border p-6 md:p-8 ${
          theme === 'dark' ? 'border-[#007BFF]/20 bg-[#007BFF]/10' : 'border-[#007BFF]/15 bg-[#007BFF]/8 shadow-lg'
        }`}>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Parler à une personne, pas à une interface opaque</h2>
          <p className={`mt-4 max-w-3xl text-base leading-8 ${theme === 'dark' ? 'text-white/78' : 'text-black/78'}`}>
            Pour un besoin de site, d’application, d’outil interne, de visibilité locale ou
            d’automatisation, le plus simple reste de décrire votre contexte. Vous pouvez joindre Optimum Tech par téléphone au
            {` ${siteMeta.phone} `}ou par e-mail à {siteMeta.email}.
          </p>
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
