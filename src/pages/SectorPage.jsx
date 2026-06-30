import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ContactActions } from '../components/ContactActions';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { PortfolioProjectCard } from '../components/PortfolioProjectCard';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { getProjectsByCategory, sectorPages } from '../data/projects';
import { buildCollectionPageSchema } from '../data/schema';
import { NotFoundPage } from './NotFound';

export const SectorPage = () => {
  const { sectorSlug } = useParams();
  const { theme } = useTheme();
  const sector = sectorPages[sectorSlug];

  if (!sector) return <NotFoundPage />;

  const projects = getProjectsByCategory(sector.category)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 9);
  const path = `/secteurs/${sectorSlug}`;
  const seoTitle = `${sector.title} | Optimum Tech`;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'}`}>
      <SEO
        path={path}
        title={seoTitle}
        description={sector.description}
        schema={buildCollectionPageSchema({ path, title: seoTitle, description: sector.description })}
      />
      <Navbar />

      <main className="relative overflow-hidden px-4 pb-20 pt-32 md:px-6 md:pt-40">
        <div className="pointer-events-none absolute right-[-10rem] top-20 h-[34rem] w-[34rem] rounded-full bg-[#0A84FF]/12 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <Breadcrumbs items={[
            { label: 'Accueil', to: '/' },
            { label: 'Réalisations', to: '/realisations' },
            { label: sector.eyebrow },
          ]} />

          <section className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <Link to="/realisations" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0576e6] hover:text-[#0A84FF]">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Toutes les réalisations
              </Link>
              <p className="mt-7 text-sm font-bold uppercase tracking-[0.22em] text-[#0576e6]">{sector.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-bold tracking-[-0.045em] sm:text-5xl md:text-7xl">{sector.title}</h1>
            </div>
            <div>
              <p className={`text-lg leading-8 md:text-xl ${theme === 'dark' ? 'text-white/65' : 'text-black/65'}`}>{sector.description}</p>
              <ContactActions includeContactPage className="mt-7" />
            </div>
          </section>

          <section className={`mt-14 rounded-[2.5rem] border p-7 md:p-10 ${
            theme === 'dark' ? 'border-white/10 bg-white/[0.045]' : 'border-black/10 bg-white shadow-xl'
          }`}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0576e6]">Objectifs prioritaires</p>
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {sector.benefits.map((benefit) => (
                <div key={benefit} className={`rounded-[1.5rem] p-5 ${theme === 'dark' ? 'bg-black/25' : 'bg-black/[0.035]'}`}>
                  <CheckCircle2 className="h-6 w-6 text-[#0576e6]" aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold leading-6">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20" aria-labelledby="sector-projects-title">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0576e6]">Exemples sélectionnés</p>
            <h2 id="sector-projects-title" className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Projets dans ce secteur
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <PortfolioProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>

          <section className={`mt-20 rounded-[2.5rem] border p-8 text-center md:p-12 ${
            theme === 'dark' ? 'border-white/10 bg-gradient-to-br from-[#0A84FF]/15 to-white/[0.03]' : 'border-blue-200 bg-blue-50'
          }`}>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0576e6]">{sector.eyebrow}</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">{sector.cta}</h2>
            <p className={`mx-auto mt-5 max-w-2xl leading-8 ${theme === 'dark' ? 'text-white/65' : 'text-black/65'}`}>
              Nous partons de vos clients, de vos contraintes et des actions qui comptent vraiment pour construire une solution claire.
            </p>
            <ContactActions includeContactPage className="mt-8 justify-center" />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
