import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, Phone, Sparkles } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useTheme } from '../context/ThemeContext';
import { ContactActions } from '../components/ContactActions';
import { buildCanonicalUrl, schemaIds } from '../data/schema';

const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: buildCanonicalUrl(item.to),
  })),
});

const buildServiceSchema = (page) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${buildCanonicalUrl(`/${page.slug}`)}#service`,
  name: page.h1,
  serviceType: page.navLabel,
  description: page.description,
  areaServed: ['Sète', 'Hérault', 'Occitanie', 'France'],
  provider: {
    '@id': schemaIds.professionalService,
  },
  url: buildCanonicalUrl(`/${page.slug}`),
});

const buildFaqSchema = (faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const SeoLandingPage = ({ page, categoryLabel }) => {
  const { theme } = useTheme();

  const breadcrumbs = [
    { label: 'Accueil', to: '/' },
    { label: categoryLabel || 'Services', to: '/services' },
    { label: page.navLabel, to: `/${page.slug}` },
  ];

  const defaultRelatedLinks = [
    { to: '/creation-site-web', label: 'Création de site web' },
    { to: '/referencement-seo', label: 'Référencement SEO' },
    { to: '/automatisation-ia', label: 'Automatisation IA' },
    { to: '/projects', label: 'Réalisations' },
    { to: '/contact', label: 'Contact' },
  ].filter((item) => item.to !== `/${page.slug}`);
  const relatedLinks = (page.relatedLinks?.length ? page.relatedLinks : defaultRelatedLinks)
    .filter((item) => item.to !== `/${page.slug}`);
  const quickNav = page.quickNav || [];
  const heroPrimaryLabel = page.heroPrimaryLabel || 'Demander un devis';
  const heroPrimaryTo = page.heroPrimaryTo || '/contact';
  const heroSecondaryLabel = page.heroSecondaryLabel || null;
  const heroSecondaryTo = page.heroSecondaryTo || null;
  const heroTertiaryLabel = page.heroTertiaryLabel || 'Voir des réalisations';
  const heroTertiaryTo = page.heroTertiaryTo || '/projects';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
      }`}
    >
      <SEO
        path={`/${page.slug}`}
        title={page.title}
        description={page.description}
        keywords={[page.primaryKeyword, ...page.secondaryKeywords, 'Optimum Tech'].join(', ')}
        schema={[
          buildBreadcrumbSchema(breadcrumbs),
          buildServiceSchema(page),
          ...(page.faq?.length ? [buildFaqSchema(page.faq)] : []),
        ]}
      />
      <Navbar />

      <main className="flex-1 px-4 py-28 md:px-6">
        <section className="mx-auto max-w-6xl">
          <div
            className={`overflow-hidden rounded-[2.8rem] border px-6 py-10 md:px-10 md:py-14 ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5'
                : 'border-black/10 bg-white/75 shadow-xl'
            }`}
          >
            <Breadcrumbs items={breadcrumbs} />
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#007BFF]/20 bg-[#007BFF]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#007BFF]">
                  <Sparkles className="h-4 w-4" />
                  {page.heroEyebrow}
                </div>
                <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                  {page.h1}
                </h1>
                <p className={`mt-5 max-w-3xl text-lg leading-8 ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
                  {page.intro}
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to={heroPrimaryTo}
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-[#007BFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007BFF]/90"
                  >
                    {heroPrimaryLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {heroSecondaryLabel && heroSecondaryTo ? (
                    <Link
                      to={heroSecondaryTo}
                      className={`inline-flex items-center justify-center gap-3 rounded-full border px-6 py-3 text-sm font-semibold transition ${
                        theme === 'dark'
                          ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                          : 'border-black/10 bg-black/5 text-black hover:bg-black/10'
                      }`}
                    >
                      {heroSecondaryLabel}
                    </Link>
                  ) : null}
                  {heroTertiaryLabel && heroTertiaryTo ? (
                    <Link
                      to={heroTertiaryTo}
                      className={`inline-flex items-center justify-center gap-3 rounded-full border px-6 py-3 text-sm font-semibold transition ${
                        theme === 'dark'
                          ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                          : 'border-black/10 bg-black/5 text-black hover:bg-black/10'
                      }`}
                    >
                      {heroTertiaryLabel}
                    </Link>
                  ) : null}
                </div>
                <ContactActions includeContactPage className="mt-5" />
              </div>

              <aside
                className={`rounded-[2rem] border p-6 ${
                  theme === 'dark'
                    ? 'border-white/10 bg-black/25'
                    : 'border-black/10 bg-black/5'
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#007BFF]">
                  Ce que cette page met en avant
                </p>
                <ul className="mt-5 space-y-4">
                  {page.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-7">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#007BFF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={`mt-8 space-y-3 text-sm ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                  <p className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#007BFF]" />
                    Sète, Hérault, Occitanie, France
                  </p>
                  <p className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#007BFF]" />
                    +33 7 45 30 51 13
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {quickNav.length ? (
          <section className="mx-auto mt-8 max-w-6xl">
            <div
              className={`rounded-[2rem] border p-6 md:p-8 ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5'
                  : 'border-black/10 bg-white/80 shadow-lg'
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#007BFF]">
                Dans cette page
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {quickNav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`rounded-[1.4rem] border px-4 py-4 text-sm font-medium transition ${
                      theme === 'dark'
                        ? 'border-white/10 bg-black/20 hover:border-[#007BFF]/30'
                        : 'border-black/10 bg-black/5 hover:border-[#007BFF]/30'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto mt-12 max-w-6xl grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {page.sections.map((section) => (
              <section
                key={section.title}
                id={section.id}
                className={`rounded-[2rem] border p-6 md:p-8 ${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/5'
                    : 'border-black/10 bg-white/80 shadow-lg'
                }`}
              >
                {section.eyebrow ? (
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#007BFF]">
                    {section.eyebrow}
                  </p>
                ) : null}
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{section.title}</h2>
                <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.callout ? (
                  <div
                    className={`mt-6 rounded-[1.8rem] border p-5 ${
                      theme === 'dark'
                        ? 'border-[#007BFF]/20 bg-[#007BFF]/10'
                        : 'border-[#007BFF]/15 bg-[#007BFF]/8'
                    }`}
                  >
                    {section.callout.title ? (
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#007BFF]">
                        {section.callout.title}
                      </p>
                    ) : null}
                    <p className="mt-3 text-base leading-8">{section.callout.text}</p>
                  </div>
                ) : null}

                {section.cards?.length ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {section.cards.map((card) => (
                      <div
                        key={card.title}
                        className={`rounded-[1.6rem] border p-5 ${
                          theme === 'dark'
                            ? 'border-white/10 bg-black/20'
                            : 'border-black/10 bg-black/5'
                        }`}
                      >
                        <h3 className="text-xl font-semibold tracking-tight">{card.title}</h3>
                        {card.paragraphs?.length ? (
                          <div className={`mt-3 space-y-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/74' : 'text-black/74'}`}>
                            {card.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                        ) : null}
                        {card.bullets?.length ? (
                          <ul className="mt-4 space-y-3">
                            {card.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-3 text-sm leading-7">
                                <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#007BFF]" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {card.links?.length ? (
                          <div className="mt-4 flex flex-wrap gap-3">
                            {card.links.map((link) =>
                              link.to.startsWith('/') ? (
                                <Link
                                  key={link.to}
                                  to={link.to}
                                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#007BFF]"
                                >
                                  {link.label}
                                  <ArrowRight className="h-4 w-4" />
                                </Link>
                              ) : (
                                <a
                                  key={link.to}
                                  href={link.to}
                                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#007BFF]"
                                >
                                  {link.label}
                                  <ArrowRight className="h-4 w-4" />
                                </a>
                              )
                            )}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.comparison ? (
                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {[
                      {
                        title: section.comparison.leftTitle,
                        items: section.comparison.leftItems,
                      },
                      {
                        title: section.comparison.rightTitle,
                        items: section.comparison.rightItems,
                      },
                    ].map((column, index) => (
                      <div
                        key={column.title}
                        className={`rounded-[1.6rem] border p-5 ${
                          index === 1
                            ? theme === 'dark'
                              ? 'border-[#007BFF]/20 bg-[#007BFF]/10'
                              : 'border-[#007BFF]/15 bg-[#007BFF]/8'
                            : theme === 'dark'
                              ? 'border-white/10 bg-black/20'
                              : 'border-black/10 bg-black/5'
                        }`}
                      >
                        <h3 className="text-xl font-semibold tracking-tight">{column.title}</h3>
                        <ul className="mt-4 space-y-3">
                          {column.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm leading-7">
                              <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#007BFF]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.cta ? (
                  <div
                    className={`mt-6 rounded-[1.8rem] border p-6 ${
                      theme === 'dark'
                        ? 'border-[#007BFF]/20 bg-[#007BFF]/10'
                        : 'border-[#007BFF]/15 bg-[#007BFF]/8'
                    }`}
                  >
                    <h3 className="text-2xl font-bold tracking-tight">{section.cta.title}</h3>
                    <p className={`mt-3 text-base leading-8 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                      {section.cta.body}
                    </p>
                    <div className="mt-5 flex flex-col gap-4 sm:flex-row">
                      <Link
                        to={section.cta.primaryTo || '/contact'}
                        className="inline-flex items-center justify-center gap-3 rounded-full bg-[#007BFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007BFF]/90"
                      >
                        {section.cta.primaryLabel || 'Demander un devis'}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      {section.cta.secondaryTo ? (
                        <Link
                          to={section.cta.secondaryTo}
                          className={`inline-flex items-center justify-center gap-3 rounded-full border px-6 py-3 text-sm font-semibold transition ${
                            theme === 'dark'
                              ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                              : 'border-black/10 bg-white/70 text-black hover:bg-white'
                          }`}
                        >
                          {section.cta.secondaryLabel}
                        </Link>
                      ) : null}
                    </div>
                    <ContactActions className="mt-4" />
                  </div>
                ) : null}
              </section>
            ))}

            {page.faq?.length ? (
              <section
                id="faq"
                className={`rounded-[2rem] border p-6 md:p-8 ${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/5'
                    : 'border-black/10 bg-white/80 shadow-lg'
                }`}
              >
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Questions fréquentes</h2>
                <div className="mt-6 space-y-5">
                  {page.faq.map((item) => (
                    <div key={item.question} className={`rounded-[1.5rem] border p-5 ${
                      theme === 'dark' ? 'border-white/10 bg-black/20' : 'border-black/10 bg-black/5'
                    }`}>
                      <h3 className="text-lg font-semibold">{item.question}</h3>
                      <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-5">
            <div
              className={`rounded-[2rem] border p-5 ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5'
                  : 'border-black/10 bg-white/80 shadow-lg'
              }`}
            >
              <p className={`text-sm uppercase tracking-[0.18em] ${theme === 'dark' ? 'text-white/45' : 'text-black/45'}`}>
                Pages à relier
              </p>
              <div className="mt-4 space-y-3">
                {relatedLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`block rounded-[1.4rem] border px-4 py-4 transition ${
                      theme === 'dark'
                        ? 'border-white/10 bg-black/20 hover:border-[#007BFF]/30'
                        : 'border-black/10 bg-black/5 hover:border-[#007BFF]/30'
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div
              className={`rounded-[2rem] border p-5 ${
                theme === 'dark'
                  ? 'border-[#007BFF]/20 bg-[#007BFF]/10'
                  : 'border-[#007BFF]/15 bg-[#007BFF]/8 shadow-lg'
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
                Conversion
              </p>
              <h2 className="mt-3 text-xl font-bold tracking-tight">
                {page.conversionTitle || 'Un site utile doit générer des prises de contact qualifiées'}
              </h2>
              <p className={`mt-4 text-sm leading-7 ${theme === 'dark' ? 'text-white/78' : 'text-black/78'}`}>
                {page.conversionBody || 'Si vous voulez un site ou une stratégie SEO orientés demandes entrantes, nous pouvons cadrer la structure, le contenu et les pages prioritaires.'}
              </p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#007BFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#007BFF]/90"
              >
                Parler de votre projet
                <ArrowRight className="h-4 w-4" />
              </Link>
              <ContactActions className="mt-4" />
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
};
