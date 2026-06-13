import React from 'react';
import { ArrowLeft, Check, ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ContactActions } from '../components/ContactActions';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { ProjectPreview } from '../components/ProjectPreview';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { getProjectBySlug, PROJECT_STATUS, projectCaseStudies } from '../data/projects';
import { buildWebPageSchema } from '../data/schema';
import { NotFoundPage } from './NotFound';

const detailSections = [
  ['Le contexte', 'context'],
  ['Le besoin', 'problem'],
  ['La réponse', 'solution'],
  ['Le résultat recherché', 'outcome'],
];

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { theme } = useTheme();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFoundPage />;

  const caseStudy = projectCaseStudies[project.id];
  const status = PROJECT_STATUS[project.status];
  const path = `/realisations/${project.slug}`;
  const title = `${project.title} : étude de cas | Optimum Tech`;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'}`}>
      <SEO
        path={path}
        title={title}
        description={`${project.description} Découvrez le contexte, la solution et les fonctionnalités du projet.`}
        schema={buildWebPageSchema({ path, title, description: project.description })}
      />
      <Navbar />

      <main className="px-4 pb-20 pt-32 md:px-6 md:pt-40">
        <article className="mx-auto max-w-7xl">
          <Breadcrumbs items={[
            { label: 'Accueil', to: '/' },
            { label: 'Réalisations', to: '/realisations' },
            { label: project.title },
          ]} />

          <header className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <Link to="/realisations" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1688ff] hover:text-[#55aaff]">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Toutes les réalisations
              </Link>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#007BFF]/30 bg-[#007BFF]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#55aaff]">
                  {project.sector}
                </span>
                <span className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] ${
                  theme === 'dark' ? 'border-white/10 bg-white/5 text-white/60' : 'border-black/10 bg-white text-black/60'
                }`}>
                  {status.label}
                </span>
              </div>
              <h1 className="mt-5 text-5xl font-bold tracking-[-0.05em] md:text-7xl">{project.title}</h1>
            </div>
            <div>
              <p className={`text-lg leading-8 md:text-xl ${theme === 'dark' ? 'text-white/65' : 'text-black/65'}`}>
                {project.description}
              </p>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#007BFF] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1688ff]"
                >
                  Voir le projet
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </header>

          <section className="mt-12" aria-label={`Aperçu de ${project.title}`}>
            <ProjectPreview project={project} />
          </section>

          <section className="mt-20 grid gap-5 md:grid-cols-2">
            {detailSections.map(([label, key]) => (
              <div key={key} className={`rounded-[2rem] border p-7 md:p-8 ${
                theme === 'dark' ? 'border-white/10 bg-white/[0.045]' : 'border-black/10 bg-white shadow-lg shadow-black/[0.03]'
              }`}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1688ff]">{label}</p>
                <p className={`mt-4 text-base leading-8 md:text-lg ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
                  {caseStudy[key]}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
            <div className={`rounded-[2rem] border p-7 md:p-9 ${
              theme === 'dark' ? 'border-white/10 bg-white/[0.045]' : 'border-black/10 bg-white shadow-lg shadow-black/[0.03]'
            }`}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1688ff]">Fonctionnalités clés</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Une expérience pensée autour de l’usage</h2>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {caseStudy.features.map((feature) => (
                  <li key={feature} className={`flex items-start gap-3 rounded-2xl p-4 ${theme === 'dark' ? 'bg-black/25' : 'bg-black/[0.035]'}`}>
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#007BFF]/15 text-[#1688ff]">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold leading-6">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className={`rounded-[2rem] border p-7 md:p-9 ${
              theme === 'dark' ? 'border-white/10 bg-[#0d1524]' : 'border-blue-200 bg-blue-50'
            }`}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1688ff]">Socle technique</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {caseStudy.technologies.map((technology) => (
                  <span key={technology} className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                    theme === 'dark' ? 'border-white/10 bg-white/5 text-white/70' : 'border-black/10 bg-white text-black/70'
                  }`}>
                    {technology}
                  </span>
                ))}
              </div>
              <p className={`mt-8 text-sm leading-7 ${theme === 'dark' ? 'text-white/55' : 'text-black/55'}`}>
                La sélection technique est adaptée au besoin réel du projet, à sa maintenance et à son évolution.
              </p>
            </aside>
          </section>

          <section className={`mt-20 rounded-[2.5rem] border p-8 text-center md:p-12 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white shadow-xl'
          }`}>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#1688ff]">Un besoin similaire ?</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
              Construisons une solution adaptée à votre activité.
            </h2>
            <ContactActions includeContactPage className="mt-8 justify-center" />
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};
