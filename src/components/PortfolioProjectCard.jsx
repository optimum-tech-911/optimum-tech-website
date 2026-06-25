import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { PROJECT_STATUS } from '../data/projects';

const statusStyles = {
  green: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
  blue: 'border-blue-400/25 bg-blue-400/10 text-blue-300',
  violet: 'border-violet-400/25 bg-violet-400/10 text-violet-300',
  slate: 'border-slate-400/25 bg-slate-400/10 text-slate-300',
};

export const PortfolioProjectCard = ({ project, compact = false }) => {
  const { theme } = useTheme();
  const status = PROJECT_STATUS[project.status] || PROJECT_STATUS.concept;
  const detailPath = `/realisations/${project.slug}`;
  const capabilities = project.capabilities.length ? project.capabilities : project.tags;
  const initials = project.title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-lg border transition duration-300 hover:-translate-y-1 ${
      theme === 'dark'
        ? 'border-white/10 bg-white/[0.045] hover:border-[#007BFF]/40'
        : 'border-black/10 bg-white shadow-lg shadow-black/[0.04] hover:border-[#007BFF]/40 hover:shadow-xl'
    }`}>
      <div className={`relative overflow-hidden bg-black ${compact ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
        <img
          src={project.image}
          alt={`Aperçu du projet ${project.title}`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <span className="max-w-[70%] rounded-lg border border-white/20 bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            {project.type}
          </span>
          <span className={`rounded-lg border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-md ${statusStyles[status.tone]}`}>
            {status.label}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-5 text-white">
          <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/20 bg-white p-1.5 shadow-lg">
            {project.logo ? (
              <img src={project.logo} alt="" className="h-full w-full object-contain" />
            ) : (
              <span className="text-sm font-black text-black">{initials}</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">{project.sector}</p>
            <h3 className="mt-1 truncate text-xl font-bold tracking-tight md:text-2xl">{project.title}</h3>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className={`text-sm leading-7 ${theme === 'dark' ? 'text-white/65' : 'text-black/65'}`}>
          {project.description}
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {capabilities.slice(0, 4).map((capability) => (
            <span
              key={capability}
              className={`rounded-xl px-3 py-2 text-[11px] font-semibold leading-5 ${
                theme === 'dark' ? 'bg-white/7 text-white/65' : 'bg-black/5 text-black/65'
              }`}
            >
              {capability}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {project.caseStudy ? (
            <Link
              to={detailPath}
              data-analytics-category="project"
              data-analytics-project={project.id}
              data-analytics-label={project.title}
              className="inline-flex items-center gap-2 rounded-lg bg-[#007BFF] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1688ff]"
            >
              Étude de cas
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : project.url ? (
            <a
              href={project.url}
              data-analytics-category="project"
              data-analytics-project={project.id}
              data-analytics-label={project.title}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition ${
                theme === 'dark'
                  ? 'border-white/20 text-white hover:border-[#007BFF]/40 hover:bg-[#007BFF]/10'
                  : 'border-black/20 text-black hover:border-[#007BFF]/40 hover:bg-[#007BFF]/5'
              }`}
            >
              Voir le projet
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
              Présentation bientôt disponible
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
