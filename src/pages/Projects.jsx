import React, { useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactActions } from '../components/ContactActions';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { PortfolioProjectCard } from '../components/PortfolioProjectCard';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { publicProjects } from '../data/projects';
import { buildCollectionPageSchema } from '../data/schema';

const filters = [
  { key: 'all', label: 'Tous les projets' },
  { key: 'health', label: 'Santé & Dentaire' },
  { key: 'food', label: 'Restaurants & Food' },
  { key: 'beauty', label: 'Beauté & Bien-être' },
  { key: 'services', label: 'Artisans & Services' },
  { key: 'auto', label: 'Auto & Garage' },
  { key: 'apps', label: 'Applications web' },
  { key: 'international', label: 'International' },
  { key: 'demo', label: 'Démos' },
];

const statusOrder = { launched: 0, 'in-progress': 1, demo: 2, concept: 3 };

const matchesFilter = (project, filter) => {
  if (filter === 'all') return true;
  if (filter === 'international') return project.source === 'international';
  if (filter === 'demo') return project.source === 'demo' || project.status === 'demo';
  return project.category === filter;
};

export const Projects = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('fr');

    return publicProjects
      .filter((project) => matchesFilter(project, activeFilter))
      .filter((project) => {
        if (!normalizedQuery) return true;
        return [project.title, project.sector, project.type, project.description, ...project.tags, ...project.capabilities]
          .join(' ')
          .toLocaleLowerCase('fr')
          .includes(normalizedQuery);
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        const statusDifference = statusOrder[a.status] - statusOrder[b.status];
        return statusDifference || a.title.localeCompare(b.title, 'fr');
      });
  }, [activeFilter, query]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'}`}>
      <SEO
        path="/realisations"
        title="Réalisations web, applications et projets digitaux | Optimum Tech"
        description="Explorez les sites web, applications métier, dashboards et expériences digitales conçus par Optimum Tech pour des activités concrètes."
        keywords="réalisations agence web, portfolio développeur web Sète, création site dentaire, site restaurant, application web sur mesure"
        schema={buildCollectionPageSchema({
          path: '/realisations',
          title: 'Réalisations web, applications et projets digitaux | Optimum Tech',
          description: 'Sites web, applications métier, dashboards et expériences digitales conçus par Optimum Tech.',
        })}
      />
      <Navbar />

      <main className="relative overflow-hidden px-4 pb-20 pt-32 md:px-6 md:pt-40">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#0A84FF]/10 blur-[120px]" />

        <section className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#0576e6]">Réalisations Optimum Tech</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Des produits digitaux conçus pour fonctionner au quotidien.
            </h1>
            <p className={`mt-6 max-w-3xl text-base leading-8 md:text-xl ${theme === 'dark' ? 'text-white/65' : 'text-black/65'}`}>
              Réservation, commandes, livraison, CRM, espaces clients, dashboards et outils métier : voici les interfaces que nous avons réellement conçues et déployées.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#portfolio-grid" className="inline-flex items-center gap-2 rounded-full bg-[#0A84FF] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0576e6]">
                Explorer les projets
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link to="/contact" className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold transition ${
                theme === 'dark' ? 'border-white/15 bg-white/5 hover:bg-white/10' : 'border-black/10 bg-white hover:bg-black/5'
              }`}>
                Parler de votre projet
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className={`grid gap-3 rounded-[2rem] border p-4 sm:grid-cols-2 ${
            theme === 'dark' ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-white shadow-xl'
          }`}>
            {[
              ['Réserver', 'Planning, rendez-vous et espaces clients'],
              ['Vendre', 'Catalogue, panier, paiement et livraison'],
              ['Piloter', 'CRM, tableaux de bord et suivi métier'],
              ['Automatiser', 'Documents, notifications et workflows'],
            ].map(([title, description]) => (
              <div key={title} className={`rounded-[1.4rem] p-5 ${theme === 'dark' ? 'bg-black/25' : 'bg-black/[0.035]'}`}>
                <p className="text-lg font-bold">{title}</p>
                <p className={`mt-2 text-sm leading-6 ${theme === 'dark' ? 'text-white/55' : 'text-black/55'}`}>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="portfolio-grid" className="relative mx-auto mt-14 max-w-7xl scroll-mt-28" aria-labelledby="projects-grid-title">
          <div className={`sticky top-20 z-20 rounded-[1.7rem] border p-3 backdrop-blur-xl md:p-4 ${
            theme === 'dark' ? 'border-white/10 bg-[#0a0a0d]/90' : 'border-black/10 bg-white/90 shadow-lg'
          }`}>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setActiveFilter(filter.key)}
                    aria-pressed={activeFilter === filter.key}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      activeFilter === filter.key
                        ? 'bg-[#0A84FF] text-white shadow-lg shadow-blue-500/20'
                        : theme === 'dark'
                          ? 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                          : 'bg-black/5 text-black/60 hover:bg-black/10 hover:text-black'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <label className={`flex min-w-0 items-center gap-3 rounded-full border px-4 py-2.5 lg:w-72 ${
                theme === 'dark' ? 'border-white/10 bg-black/30' : 'border-black/10 bg-black/[0.03]'
              }`}>
                <Search className="h-4 w-4 shrink-0 text-[#0576e6]" aria-hidden="true" />
                <span className="sr-only">Rechercher un projet</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher un projet"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-current placeholder:opacity-40"
                />
                {query ? (
                  <button type="button" onClick={() => setQuery('')} aria-label="Effacer la recherche">
                    <X className="h-4 w-4 opacity-50" aria-hidden="true" />
                  </button>
                ) : null}
              </label>
            </div>
          </div>

          <div className="mb-6 mt-10 flex items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0576e6]">
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Sélection filtrée
              </p>
              <h2 id="projects-grid-title" className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                {filters.find((filter) => filter.key === activeFilter)?.label}
              </h2>
            </div>
            <p className={`shrink-0 text-sm ${theme === 'dark' ? 'text-white/45' : 'text-black/45'}`}>
              {visibleProjects.length} projet{visibleProjects.length > 1 ? 's' : ''}
            </p>
          </div>

          {visibleProjects.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project) => (
                <PortfolioProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className={`rounded-[2rem] border px-6 py-16 text-center ${
              theme === 'dark' ? 'border-white/10 bg-white/5 text-white/60' : 'border-black/10 bg-white text-black/60'
            }`}>
              Aucun projet ne correspond à cette recherche.
            </div>
          )}
        </section>

        <section className={`relative mx-auto mt-20 max-w-6xl rounded-[2.5rem] border p-7 text-center md:p-12 ${
          theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white shadow-xl'
        }`}>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0576e6]">Votre projet</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
            Besoin d’un site ou d’un outil qui répond à un vrai usage ?
          </h2>
          <p className={`mx-auto mt-5 max-w-2xl leading-8 ${theme === 'dark' ? 'text-white/65' : 'text-black/65'}`}>
            Parlons du besoin, du parcours utilisateur et de la solution la plus simple à faire évoluer.
          </p>
          <ContactActions includeContactPage className="mt-8 justify-center" />
        </section>
      </main>
      <Footer />
    </div>
  );
};
