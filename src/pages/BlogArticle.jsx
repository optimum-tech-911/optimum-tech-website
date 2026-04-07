import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock3, Target } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { useTheme } from '../context/ThemeContext';
import { blogPosts, getBlogPostBySlug } from '../data/blogPosts';

export const BlogArticlePage = () => {
  const { theme } = useTheme();
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: 'fr-FR',
    mainEntityOfPage: `https://optimutech.fr/blog/${post.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Optimum Tech',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Optimum Tech',
      url: 'https://optimutech.fr',
    },
    keywords: [post.targetKeyword, post.category, 'Optimum Tech'],
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
      }`}
    >
      <SEO
        path={`/blog/${post.slug}`}
        title={`${post.title} | Optimum Tech`}
        description={post.description}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <Navbar />

      <main className="flex-1 px-4 py-28 md:px-6">
        <article className="mx-auto max-w-5xl">
          <Link
            to="/blog"
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
                : 'border-black/10 bg-white/70 text-black/75 hover:bg-white'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>

          <div
            className={`mt-6 overflow-hidden rounded-[2.5rem] border ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5'
                : 'border-black/10 bg-white/80 shadow-xl'
            }`}
          >
            {post.image && (
              <div className="relative h-[280px] overflow-hidden md:h-[420px]">
                <img
                  src={post.image}
                  alt={post.heroTitle}
                  className="h-full w-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${post.heroTheme}`} />
              </div>
            )}
            <div className={`bg-gradient-to-br ${post.heroTheme} px-6 py-10 md:px-10 md:py-14`}>
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#007BFF]">
                <span>{post.category}</span>
                <span
                  className={`inline-flex items-center gap-2 ${
                    theme === 'dark' ? 'text-white/60' : 'text-black/60'
                  }`}
                >
                  <Clock3 className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-black/70 md:text-xl">
                {post.description}
              </p>
            </div>

            <div
              className={`grid gap-6 border-t px-6 py-6 md:grid-cols-[1fr_280px] md:px-10 md:py-8 ${
                theme === 'dark' ? 'border-white/10' : 'border-black/5'
              }`}
            >
              <div>
                <p className={`text-lg leading-8 ${theme === 'dark' ? 'text-white/78' : 'text-black/78'}`}>
                  {post.excerpt}
                </p>
              </div>
              <aside
                className={`rounded-[1.6rem] border p-5 ${
                  theme === 'dark'
                    ? 'border-white/10 bg-black/20'
                    : 'border-black/10 bg-black/5'
                }`}
              >
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#007BFF]">
                  <Target className="h-4 w-4" />
                  Cible
                </div>
                <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/75' : 'text-black/75'}`}>
                  {post.audience}
                </p>
                <div className={`mt-5 text-xs uppercase tracking-[0.16em] ${theme === 'dark' ? 'text-white/45' : 'text-black/45'}`}>
                  Mot-cle principal
                </div>
                <p className="mt-2 text-sm font-medium">{post.targetKeyword}</p>
              </aside>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-10">
              {post.sections.map((section) => (
                <section
                  key={section.heading}
                  className={`rounded-[2rem] border p-6 md:p-8 ${
                    theme === 'dark'
                      ? 'border-white/10 bg-white/5'
                      : 'border-black/10 bg-white/80 shadow-lg'
                  }`}
                >
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{section.heading}</h2>
                  <div className={`mt-5 space-y-5 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
                    {section.paragraphs.map((paragraph) => (
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
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
                  Passer a l action
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                  Le bon outil digital doit vous rapporter plus qu il ne vous coute
                </h2>
                <p className={`mt-4 max-w-3xl text-base leading-8 ${theme === 'dark' ? 'text-white/78' : 'text-black/78'}`}>
                  {post.cta}
                </p>
                <div className="mt-6">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 rounded-full bg-[#007BFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007BFF]/90"
                    >
                      Envoyer un message
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href="tel:+33745305113"
                      className={`inline-flex items-center gap-3 rounded-full border px-6 py-3 text-sm font-semibold transition ${
                        theme === 'dark'
                          ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                          : 'border-black/10 bg-white/70 text-black hover:bg-white'
                      }`}
                    >
                      Nous appeler
                    </a>
                  </div>
                </div>
              </section>
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
                  Articles lies
                </p>
                <div className="mt-4 space-y-4">
                  {relatedPosts.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/blog/${item.slug}`}
                      className={`block rounded-[1.5rem] border p-4 transition ${
                        theme === 'dark'
                          ? 'border-white/10 bg-black/20 hover:border-[#007BFF]/30'
                          : 'border-black/10 bg-black/5 hover:border-[#007BFF]/30'
                      }`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#007BFF]">
                        {item.category}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold leading-7">{item.title}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
