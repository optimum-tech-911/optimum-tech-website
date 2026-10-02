import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, MapPin, PhoneCall } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { SanteSection } from '../components/SanteSection';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../i18n.jsx';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { indexableBlogPosts } from '../data/blogPosts';
import { resourceTopics, siteMeta, trustHighlights } from '../data/siteMeta';
import { buildWebPageSchema } from '../data/schema';
import { ContactActions } from '../components/ContactActions';
import { FeaturedProjects } from '../components/FeaturedProjects';

export const Home = () => {
  const { theme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';
  const mutedText = isDark ? 'text-white/70' : 'text-black/70';
  const sectionBorder = isDark ? 'border-white/10' : 'border-black/10';
  const cardClass = isDark
    ? 'home-surface border-white/10 bg-white/[0.045]'
    : 'home-surface border-black/10 bg-white shadow-sm shadow-black/[0.04]';
  const subtleCardClass = isDark
    ? 'home-subtle border-white/10 bg-black/20'
    : 'home-subtle border-black/10 bg-[#F7F8FA]';

  const coreServices = [
    {
      to: '/creation-site-web',
      title: t('services.web.title'),
      label: t('home.vision_eyebrow'),
      description: t('services.web.desc'),
      points: t('services.web.items'),
    },
    {
      to: '/application-web-sur-mesure',
      title: t('services.software.title'),
      label: t('hero.shortcuts.software'),
      description: t('services.software.desc'),
      points: t('services.software.items'),
    },
    {
      to: '/referencement-seo',
      title: t('hero.shortcuts.seo'),
      label: t('hero.shortcuts.seo'),
      description: t('services.infra.desc'),
      points: t('services.infra.items'),
    },
    {
      to: '/automatisation-ia',
      title: t('services.automation.title'),
      label: t('hero.shortcuts.ai'),
      description: t('services.automation.desc'),
      points: t('services.automation.items'),
    },
  ];

  const processSteps = [
    ['1. Comprendre', 'Objectifs, clients, contexte local, contraintes métier et raisons de refaire ou créer votre présence digitale.'],
    ['2. Structurer', 'Pages, messages, preuves, parcours de contact et fonctionnalités réellement nécessaires au lancement.'],
    ['3. Concevoir', 'Interface claire, responsive, rapide et alignée avec votre niveau de maturité digitale.'],
    ['4. Lancer', 'Mise en ligne, vérifications, suivi et améliorations après les premiers retours.'],
  ];

  const audiencePages = [
    ['/site-internet-dentiste', 'Site internet pour dentiste', 'Présenter le cabinet, les soins et les moyens de contact.'],
    ['/site-internet-medecin', 'Site internet pour médecin', 'Structurer une présence sobre, rassurante et utile sur mobile.'],
    ['/site-internet-entreprise-locale', 'Site internet pour entreprise locale', 'Pour artisans, commerces, indépendants, services et PME.'],
    ['/application-web-sur-mesure', 'Application web sur mesure', 'Pour organiser un parcours, un tableau de bord ou un espace client.'],
    ['/logiciel-sur-mesure', 'Logiciel sur mesure', 'Pour cadrer un outil métier ou un flux interne plus spécifique.'],
  ];

  const localPages = [
    ['/creation-site-web-montpellier', 'Création de site web Montpellier'],
    ['/creation-site-web-sete', 'Création site web Sète'],
    ['/agence-web-herault', 'Agence web Hérault'],
    ['/referencement-seo-sete', 'SEO Sète'],
    ['/automatisation-ia-occitanie', 'Automatisation IA Occitanie'],
  ];

  return (
    <div className={`ux-page min-h-screen flex flex-col transition-colors duration-500 ${
      isDark ? 'bg-[#050607] text-white' : 'bg-[#F7F8FA] text-[#111318]'
    }`}>
      <SEO
        path="/"
        title="Création de site web Montpellier et plateformes | Optimum Tech"
        description="Sites internet, plateformes web et SEO local pour entreprises et cabinets dentaires à Montpellier, Sète et dans l’Hérault. Découvrez les projets Optimum Tech."
        keywords="Optimum Tech, création site web Montpellier, création site internet Montpellier, site internet dentiste, création plateforme web, agence web Hérault, création site web Sète"
        schema={buildWebPageSchema({
          path: '/',
          dateModified: '2026-10-02',
          title: 'Création de site web Montpellier et plateformes | Optimum Tech',
          description:
            'Sites internet, plateformes web et SEO local pour entreprises et cabinets dentaires à Montpellier, Sète et dans l’Hérault. Découvrez les projets Optimum Tech.',
        })}
      />

      <Navbar />
      <Hero />

      <main className="home-main relative z-10">
        <SanteSection />

        <section className={`border-b ${sectionBorder}`}>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
            <div>
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">{t('home.vision_eyebrow')}</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                {t('home.vision_title')}
              </h2>
              <p className={`mt-5 text-base leading-8 md:text-lg ${mutedText}`}>
                {t('home.vision_desc')}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {coreServices.map((service) => (
                <Link
                  key={service.to}
                  to={service.to}
                  className={`group rounded-lg border p-5 transition hover:-translate-y-1 hover:border-[#0A84FF]/40 md:p-6 ${cardClass}`}
                >
                  <p className="text-xs font-semibold uppercase text-[#0A84FF]">{service.label}</p>
                  <h3 className="mt-3 text-2xl font-bold">{service.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${mutedText}`}>{service.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {Array.isArray(service.points) && service.points.map((point) => (
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

        <FeaturedProjects />

        <section className={`border-y ${sectionBorder} ${isDark ? 'bg-white/[0.025]' : 'bg-white'}`}>
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
            <div>
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">{t('home.method_eyebrow')}</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                {t('home.method_title')}
              </h2>
              <p className={`mt-5 text-base leading-8 md:text-lg ${mutedText}`}>
                {t('home.method_desc')}
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-xl bg-[#0A84FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0576e6]"
              >
                {t('home.method_cta')}
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
            <p className="text-sm font-semibold uppercase text-[#0A84FF]">{t('home.needs_eyebrow')}</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              {t('home.needs_title')}
            </h2>
            <p className={`mt-5 text-base leading-8 md:text-lg ${mutedText}`}>
              {t('home.needs_desc')}
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
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">{t('home.trust_eyebrow')}</p>
              <h3 className="mt-3 text-2xl font-bold">{t('home.trust_title')}</h3>
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
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">{t('home.local_eyebrow')}</p>
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
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">{t('home.resources_eyebrow')}</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                {t('home.resources_title')}
              </h2>
              <p className={`mt-5 text-base leading-8 md:text-lg ${mutedText}`}>
                {t('home.resources_desc')}
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
              {t('home.resources_cta')}
              <ArrowRight className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:py-20">
          <div className={`home-cta grid gap-8 rounded-lg border p-6 md:p-10 lg:grid-cols-[1fr_0.9fr] ${cardClass}`}>
            <div>
              <p className="text-sm font-semibold uppercase text-[#0A84FF]">{t('home.contact_eyebrow')}</p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                {t('home.contact_title')}
              </h2>
              <p className={`mt-5 max-w-3xl text-base leading-8 md:text-lg ${mutedText}`}>
                {t('home.contact_desc')}
              </p>
              <ContactActions includeContactPage className="mt-8" />
            </div>

            <div className="grid gap-3">
              {[
                [PhoneCall, t('home.contact_phone'), siteMeta.phone, siteMeta.phoneHref],
                [Mail, t('home.contact_email'), siteMeta.email, siteMeta.emailHref],
                [MapPin, t('home.contact_zone'), siteMeta.locationLabel, '/contact'],
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
