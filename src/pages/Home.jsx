import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, MapPin, PhoneCall } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { useTheme } from '../context/ThemeContext';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { indexableBlogPosts } from '../data/blogPosts';
import { resourceTopics, siteMeta, trustHighlights } from '../data/siteMeta';
import { buildWebPageSchema } from '../data/schema';
import { ContactActions } from '../components/ContactActions';
import { PortfolioProjectCard } from '../components/PortfolioProjectCard';
import { featuredProjects } from '../data/projects';

const coreServices = [
  {
    to: '/creation-site-web',
    title: 'Sites web professionnels',
    label: 'Clarté & conversion',
    description:
      'Une présence en ligne propre, rapide et lisible pour expliquer votre offre, rassurer et faciliter la prise de contact.',
    points: ['Architecture des pages', 'Design responsive', 'Parcours de contact'],
  },
  {
    to: '/application-web-sur-mesure',
    title: 'Applications web sur mesure',
    label: 'Outils métier',
    description:
      'Des interfaces internes ou clients pour suivre, organiser, facturer, réserver ou automatiser un vrai flux de travail.',
    points: ['Tableaux de bord', 'Espace client', 'Base de données'],
  },
  {
    to: '/referencement-seo',
    title: 'SEO local et contenus',
    label: 'Visibilité durable',
    description:
      'Une structure éditoriale utile pour être mieux compris par Google et par les visiteurs qui comparent avant de contacter.',
    points: ['Pages services', 'Maillage interne', 'Réponses aux recherches'],
  },
  {
    to: '/automatisation-ia',
    title: 'Automatisation utile',
    label: 'Sobriété opérationnelle',
    description:
      'Des automatisations choisies avec prudence pour réduire les tâches répétitives sans rendre votre organisation plus lourde.',
    points: ['Workflows', 'Notifications', 'Aide à la production'],
  },
];

const processSteps = [
  ['Comprendre', 'Objectifs, clients, contexte local, contraintes métier et raisons de refaire ou créer votre présence digitale.'],
  ['Structurer', 'Pages, messages, preuves, parcours de contact et fonctionnalités réellement nécessaires au lancement.'],
  ['Concevoir', 'Interface claire, responsive, rapide et alignée avec votre niveau de maturité digitale.'],
  ['Lancer', 'Mise en ligne, vérifications, suivi et améliorations après les premiers retours.'],
];

const audiencePages = [
  ['/site-internet-dentiste', 'Site internet pour dentiste', 'Présenter le cabinet, les soins et les moyens de contact.'],
  ['/site-internet-medecin', 'Site internet pour médecin', 'Structurer une présence sobre, rassurante et utile sur mobile.'],
  ['/site-internet-entreprise-locale', 'Site internet pour entreprise locale', 'Pour artisans, commerces, indépendants, services et PME.'],
  ['/application-web-sur-mesure', 'Application web sur mesure', 'Pour organiser un parcours, un tableau de bord ou un espace client.'],
  ['/logiciel-sur-mesure', 'Logiciel sur mesure', 'Pour cadrer un outil métier ou un flux interne plus spécifique.'],
];

const localPages = [
  ['/creation-site-web-sete', 'Création site web Sète'],
  ['/agence-web-herault', 'Agence web Hérault'],
  ['/referencement-seo-sete', 'SEO Sète'],
  ['/automatisation-ia-occitanie', 'Automatisation IA Occitanie'],
];

export const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const mutedText = isDark ? 'text-white/70' : 'text-black/70';
  const sectionBorder = isDark ? 'border-white/10' : 'border-black/10';
  const cardClass = isDark
    ? 'border-white/10 bg-white/[0.045]'
    : 'border-black/10 bg-white shadow-sm shadow-black/[0.04]';
  const subtleCardClass = isDark
    ? 'border-white/10 bg-black/20'
    : 'border-black/10 bg-[#F7F8FA]';

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isDark ? 'bg-[#050607] text-white' : 'bg-[#F7F8FA] text-[#111318]'
    }`}>
      <SEO
        path="/"
        title="Optimum Tech | Sites web, applications et solutions digitales sur mesure"
        description="Optimum Tech accompagne les entreprises à Sète, dans l’Hérault, en Occitanie et en France pour créer des sites web, des web apps, des logiciels sur mesure, des automatisations utiles et une visibilité digitale plus solide."
        keywords="Optimum Tech, création site web sud de la france, création site web sète, agence web sète, développeur web sète, web app sur mesure france, logiciel sur mesure entreprise, agence digitale hérault, référencement SEO sète, automatisation IA entreprise france"
        schema={buildWebPageSchema({
          path: '/',
          title: 'Optimum Tech | Sites web, applications et solutions digitales sur mesure',
          description:
            'Optimum Tech accompagne les entreprises à Sète, dans l’Hérault, en Occitanie et en France pour créer des sites web, des web apps, des logiciels sur mesure, des automatisations utiles et une visibilité digitale plus solide.',
        })}
      />

      <Navbar />
      <Hero />

      <main className="relative z-10">
        <section className={`border-b ${sectionBorder}`}>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
            <div>
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">Services principaux</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Construire une présence digitale qui aide vraiment votre activité
              </h2>
              <p className={`mt-5 text-base leading-8 md:text-lg ${mutedText}`}>
                Le site n’est pas traité comme une vitrine isolée. Il doit clarifier
                l’offre, soutenir la confiance, déclencher le bon contact et parfois
                devenir un outil de travail.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {coreServices.map((service) => (
                <Link
                  key={service.to}
                  to={service.to}
                  className={`group rounded-lg border p-5 transition hover:-translate-y-0.5 hover:border-[#0A84FF]/40 ${cardClass}`}
                >
                  <p className="text-xs font-semibold uppercase text-[#0A84FF]">{service.label}</p>
                  <h3 className="mt-3 text-2xl font-bold">{service.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${mutedText}`}>{service.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.points.map((point) => (
                      <span
                        key={point}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                          isDark ? 'bg-white/[0.07] text-white/60' : 'bg-black/[0.04] text-black/60'
                        }`}
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:py-20">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">Réalisations sélectionnées</p>
              <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
                Des projets visibles, du site professionnel à l’outil métier
              </h2>
              <p className={`mt-4 max-w-3xl text-base leading-8 ${mutedText}`}>
                Quelques références pour montrer le niveau de finition attendu : parcours
                patient, plateforme logistique, commerce local, outil administratif et
                présence de service.
              </p>
            </div>
            <Link
              to="/realisations"
              className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition hover:border-[#0A84FF]/40 ${cardClass}`}
            >
              Voir toutes les réalisations
              <ArrowRight className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <PortfolioProjectCard key={project.id} project={project} compact />
            ))}
          </div>
        </section>

        <section className={`border-y ${sectionBorder} ${isDark ? 'bg-white/[0.025]' : 'bg-white'}`}>
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
            <div>
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">Méthode</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Une méthode courte, claire et orientée décision
              </h2>
              <p className={`mt-5 text-base leading-8 md:text-lg ${mutedText}`}>
                L’objectif est de savoir vite ce qui mérite d’être construit, dans quel
                ordre et avec quel niveau de finition. Vous gardez une vision claire du
                budget, du contenu et des prochaines étapes.
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-3 rounded-lg bg-[#0A84FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0576e6]"
              >
                Demander un échange
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <ol className="grid gap-4 md:grid-cols-2">
              {processSteps.map(([title, desc], index) => (
                <li key={title} className={`rounded-lg border p-5 ${cardClass}`}>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A84FF] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-bold">{title}</h3>
                  </div>
                  <p className={`mt-4 text-sm leading-7 ${mutedText}`}>{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-6 lg:grid-cols-[1fr_0.9fr] lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase text-[#0A84FF]">Besoins fréquents</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              Des pages utiles pour mieux cadrer votre demande
            </h2>
            <p className={`mt-5 text-base leading-8 md:text-lg ${mutedText}`}>
              Les besoins ne sont pas les mêmes pour un cabinet, un commerce, une PME ou
              une application métier. Ces pages aident à clarifier le bon niveau de projet
              avant le premier échange.
            </p>
            <div className="mt-8 grid gap-3">
              {audiencePages.map(([to, title, desc]) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex flex-col gap-2 rounded-lg border p-5 transition hover:border-[#0A84FF]/40 sm:flex-row sm:items-center sm:justify-between ${cardClass}`}
                >
                  <div>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className={`mt-1 text-sm leading-6 ${mutedText}`}>{desc}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#0A84FF]" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className={`rounded-lg border p-6 ${cardClass}`}>
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">Confiance</p>
              <h3 className="mt-3 text-2xl font-bold">Un accompagnement direct, local et sans promesse floue</h3>
              <div className="mt-5 space-y-4">
                {trustHighlights.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0A84FF]" aria-hidden="true" />
                    <p className={`text-sm leading-7 ${mutedText}`}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-lg border p-6 ${subtleCardClass}`}>
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">Repères locaux</p>
              <div className="mt-4 grid gap-3">
                {localPages.map(([to, label]) => (
                  <Link
                    key={to}
                    to={to}
                    className={`rounded-lg border px-4 py-3 text-sm font-semibold transition hover:border-[#0A84FF]/40 ${
                      isDark ? 'border-white/10 text-white/70' : 'border-black/10 text-black/70'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className={`border-y ${sectionBorder} ${isDark ? 'bg-white/[0.025]' : 'bg-white'}`}>
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:py-20">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">Ressources</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Des guides pour décider avant d’investir
              </h2>
              <p className={`mt-5 text-base leading-8 md:text-lg ${mutedText}`}>
                Des contenus en français pour comprendre les choix web, applicatifs,
                éditoriaux et SEO avant de lancer un budget.
              </p>
            </div>

            <div className="mt-9 grid gap-5 lg:grid-cols-3">
              {resourceTopics.map((topic) => (
                <article key={topic.title} className={`rounded-lg border p-6 ${cardClass}`}>
                  <h3 className="text-xl font-bold">{topic.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${mutedText}`}>{topic.description}</p>
                  <div className="mt-5 space-y-3">
                    {topic.links.slice(0, 2).map((href) => {
                      const post = indexableBlogPosts.find((item) => `/blog/${item.slug}` === href);
                      const fallbackSlug = href.replace('/blog/', '');
                      const label = post?.title || fallbackSlug.replaceAll('-', ' ');

                      return (
                        <Link key={href} to={href} className="block text-sm font-semibold text-[#0A84FF]">
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
            <Link
              to="/blog"
              className={`mt-8 inline-flex items-center gap-3 rounded-lg border px-5 py-3 text-sm font-semibold transition hover:border-[#0A84FF]/40 ${cardClass}`}
            >
              Explorer le blog
              <ArrowRight className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:py-20">
          <div className={`grid gap-8 rounded-lg border p-6 md:p-8 lg:grid-cols-[1fr_0.9fr] ${cardClass}`}>
            <div>
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">Contact direct</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Parlons de ce que votre site doit vraiment changer
              </h2>
              <p className={`mt-5 max-w-3xl text-base leading-8 md:text-lg ${mutedText}`}>
                Envoyez le contexte, même brièvement : activité, objectif, pages ou
                fonctionnalités souhaitées, délai idéal. La réponse peut commencer par un
                cadrage simple avant tout devis.
              </p>
              <ContactActions includeContactPage className="mt-8" />
            </div>

            <div className="grid gap-3">
              {[
                [PhoneCall, 'Téléphone', siteMeta.phone, siteMeta.phoneHref],
                [Mail, 'E-mail', siteMeta.email, siteMeta.emailHref],
                [MapPin, 'Zone', siteMeta.locationLabel, '/contact'],
              ].map(([Icon, title, value, href]) => {
                const isInternal = href.startsWith('/');
                const content = (
                  <>
                    <Icon className="h-5 w-5 text-[#0A84FF]" aria-hidden="true" />
                    <div>
                      <h3 className="text-sm font-semibold uppercase opacity-60">{title}</h3>
                      <p className="mt-1 text-base font-bold">{value}</p>
                    </div>
                  </>
                );
                const className = `flex gap-4 rounded-lg border p-5 transition hover:border-[#0A84FF]/40 ${subtleCardClass}`;

                return isInternal ? (
                  <Link key={title} to={href} className={className}>
                    {content}
                  </Link>
                ) : (
                  <a key={title} href={href} className={className}>
                    {content}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
