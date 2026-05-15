import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock3, Sparkles } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { useTheme } from '../context/ThemeContext';
import { blogCategories, featuredBlogPosts, indexableBlogPosts } from '../data/blogPosts';
import { editorialTeam, resourceTopics } from '../data/siteMeta';
import { buildCollectionPageSchema } from '../data/schema';

const formatDate = (date) =>
  new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

export const BlogPage = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
      }`}
    >
      <SEO
        path="/blog"
        title="Blog sites, applications et visibilité digitale | Optimum Tech"
        description="Conseils en français sur les sites web, web apps, outils métier, automatisations utiles, SEO local et décisions digitales pour entreprises en France."
        schema={buildCollectionPageSchema({
          path: '/blog',
          title: 'Blog sites, applications et visibilité digitale | Optimum Tech',
          description:
            'Conseils en français sur les sites web, web apps, outils métier, automatisations utiles, SEO local et décisions digitales pour entreprises en France.',
        })}
      />
      <Navbar />

      <main className="flex-1 px-4 py-28 md:px-6">
        <section className="mx-auto max-w-6xl">
          <div
            className={`overflow-hidden rounded-[2.5rem] border px-6 py-10 md:px-10 md:py-14 ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5'
                : 'border-black/10 bg-white/70 shadow-xl'
            }`}
          >
            <div className="max-w-4xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#007BFF]/20 bg-[#007BFF]/10 px-4 py-2 text-xs font-semibold text-[#007BFF]">
                <Sparkles className="h-4 w-4" />
                Blog croissance digitale France
              </div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                Des ressources utiles pour mieux décider avant d’investir dans un site, une application, un outil métier ou une stratégie de visibilité digitale
              </h1>
              <p className={`mt-5 max-w-3xl text-base leading-8 md:text-xl ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                Le blog Optimum Tech s’adresse aux entreprises locales, commerces, cabinets,
                indépendants et PME qui veulent mieux cadrer une décision autour d’un site,
                d’une web app, d’un outil métier, d’une automatisation utile ou de leur
                visibilité digitale.
              </p>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-4">
              {blogCategories.map((category) => (
                <div
                  key={category}
                  className={`rounded-2xl border px-4 py-4 text-sm ${
                    theme === 'dark'
                      ? 'border-white/10 bg-black/20 text-white/80'
                      : 'border-black/10 bg-black/5 text-black/75'
                  }`}
                >
                  {category}
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                'Articles axés sur des décisions concrètes, pas sur du remplissage SEO',
                'Contenus signés par l’équipe Optimum Tech et reliés aux services du site',
                'Navigation pensée pour passer d’un guide à une page utile sans impasse',
              ].map((item) => (
                <div
                  key={item}
                  className={`rounded-2xl border px-4 py-4 text-sm leading-7 ${
                    theme === 'dark'
                      ? 'border-white/10 bg-black/20 text-white/75'
                      : 'border-black/10 bg-black/5 text-black/75'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className={`text-sm uppercase tracking-[0.18em] ${theme === 'dark' ? 'text-white/45' : 'text-black/45'}`}>
                À la une
              </p>
              <h2 className="text-3xl font-bold tracking-tight">Articles piliers</h2>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {featuredBlogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={`group overflow-hidden rounded-[2rem] border p-6 transition ${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/5 hover:border-[#007BFF]/30'
                    : 'border-black/10 bg-white/70 hover:border-[#007BFF]/30 hover:shadow-xl'
                }`}
              >
                <div className="overflow-hidden rounded-[1.5rem]">
                  {post.image ? (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.heroTitle}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${post.heroTheme}`} />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
                          {post.category}
                        </p>
                        <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">
                          {post.heroTitle}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    <div className={`rounded-[1.5rem] bg-gradient-to-br ${post.heroTheme} p-6`}>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
                        {post.category}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold tracking-tight">{post.heroTitle}</h3>
                    </div>
                  )}
                </div>
                <div className="pt-6">
                  <h3 className="text-2xl font-semibold tracking-tight">{post.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                    {post.excerpt}
                  </p>
                  <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-white/52' : 'text-black/52'}`}>
                    Par {editorialTeam.name}
                  </p>
                  <div className={`mt-5 flex items-center justify-between text-sm ${theme === 'dark' ? 'text-white/55' : 'text-black/55'}`}>
                    <div className="flex flex-col gap-2">
                      <span className="inline-flex items-center gap-2">
                        <Clock3 className="h-4 w-4" />
                        {post.readTime}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        {formatDate(post.updatedAt || post.publishedAt)}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 font-semibold text-[#007BFF]">
                      Lire l’article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-6xl">
          <div className="mb-6">
            <p className={`text-sm uppercase tracking-[0.18em] ${theme === 'dark' ? 'text-white/45' : 'text-black/45'}`}>
              Bibliothèque
            </p>
            <h2 className="text-3xl font-bold tracking-tight">Guides consultables</h2>
            <p className={`mt-3 max-w-3xl text-base leading-8 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
              Chaque article ci-dessous est accessible depuis le site, lié à des pages utiles
              et conçu pour aider un dirigeant à comprendre une décision web, applicative,
              opérationnelle ou SEO avant d’acheter une prestation.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {indexableBlogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={`group flex h-full flex-col rounded-[1.8rem] border p-5 transition ${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/5 hover:border-[#007BFF]/30'
                    : 'border-black/10 bg-white/75 hover:border-[#007BFF]/30 hover:shadow-xl'
                }`}
              >
                {post.image ? (
                  <div className="relative overflow-hidden rounded-[1.4rem]">
                    <img
                      src={post.image}
                      alt={post.heroTitle}
                      className="h-48 w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${post.heroTheme}`} />
                    <div className="absolute inset-x-0 bottom-0 px-4 py-4 text-white">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7dd3fc]">
                        {post.category}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight">{post.heroTitle}</h3>
                    </div>
                  </div>
                ) : (
                  <div className={`rounded-[1.4rem] bg-gradient-to-br ${post.heroTheme} px-4 py-5`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#007BFF]">
                      {post.category}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{post.heroTitle}</h3>
                  </div>
                )}

                <div className="flex flex-1 flex-col pt-5">
                  <h3 className="text-xl font-semibold leading-8 tracking-tight">{post.title}</h3>
                  <p className={`mt-3 flex-1 text-sm leading-7 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                    {post.excerpt}
                  </p>
                  <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-white/52' : 'text-black/52'}`}>
                    Par {editorialTeam.name}
                  </p>
                  <div className={`mt-5 flex items-center justify-between text-sm ${theme === 'dark' ? 'text-white/55' : 'text-black/55'}`}>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {formatDate(post.updatedAt || post.publishedAt)}
                    </span>
                    <span className="font-semibold text-[#007BFF]">{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-6xl">
          <div className="mb-6">
            <p className={`text-sm uppercase tracking-[0.18em] ${theme === 'dark' ? 'text-white/45' : 'text-black/45'}`}>
              Parcours de lecture
            </p>
            <h2 className="text-3xl font-bold tracking-tight">Explorer par sujet</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {resourceTopics.map((topic) => (
              <div
                key={topic.title}
                className={`rounded-[2rem] border p-6 ${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/5'
                    : 'border-black/10 bg-white/80 shadow-lg'
                }`}
              >
                <h3 className="text-2xl font-semibold tracking-tight">{topic.title}</h3>
                <p className={`mt-4 text-sm leading-7 ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
                  {topic.description}
                </p>
                <div className="mt-5 space-y-3">
                  {topic.links.map((to) => {
                    const linkedPost = indexableBlogPosts.find((post) => `/blog/${post.slug}` === to);
                    if (!linkedPost) return null;

                    return (
                      <Link
                        key={to}
                        to={to}
                        className={`block rounded-[1.4rem] border px-4 py-4 text-sm transition ${
                          theme === 'dark'
                            ? 'border-white/10 bg-black/20 hover:border-[#007BFF]/30'
                            : 'border-black/10 bg-black/5 hover:border-[#007BFF]/30'
                        }`}
                      >
                        {linkedPost.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
