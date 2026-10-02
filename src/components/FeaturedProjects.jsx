import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ExternalLink, Maximize2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { featuredProjects } from '../data/projects';

const groups = [
  { id: 'all', label: 'Toute la sélection' },
  { id: 'platforms', label: 'Plateformes & commerce' },
  { id: 'design', label: 'Design, vidéo & 3D' },
  { id: 'health', label: 'Santé & dentaire' },
];

const projectDomain = (project) => new URL(project.url).hostname;

export const FeaturedProjects = ({ showPortfolioLink = true }) => {
  const { theme } = useTheme();
  const [group, setGroup] = useState('all');
  const [preview, setPreview] = useState(null);
  const dialog = useRef(null);
  const visibleProjects = featuredProjects.filter(
    (project) => group === 'all' || project.showcase.group === group
  );

  useEffect(() => {
    if (!preview || !dialog.current) return undefined;
    if (!dialog.current.open) dialog.current.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);

  return (
    <section className="featured-work" data-theme={theme} aria-labelledby="featured-work-title">
      <header className="featured-work__header">
        <div>
          <p className="featured-work__eyebrow">
            La sélection Optimum Tech <span>{featuredProjects.length} projets en ligne</span>
          </p>
          <h2 id="featured-work-title">
            Des univers singuliers.
            <br />
            <span>Des usages bien réels.</span>
          </h2>
          <p className="featured-work__intro">
            Marketplace, plateforme métier, boutique, agence ou cabinet dentaire : explorez ce que
            nous créons, dans son univers et dans ses usages.
          </p>
        </div>
        {showPortfolioLink && (
          <Link to="/realisations" className="featured-work__all-link">
            Toutes nos réalisations <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        )}
      </header>

      <div
        className="featured-work__filters"
        role="group"
        aria-label="Filtrer les projets sélectionnés"
      >
        {groups.map((item) => {
          const count = featuredProjects.filter(
            (project) => item.id === 'all' || project.showcase.group === item.id
          ).length;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={group === item.id}
              onClick={() => setGroup(item.id)}
            >
              {item.label} <span>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {visibleProjects.length} projets dans cette sélection.
      </p>
      <div
        className="featured-work__grid"
        data-layout={group === 'all' ? 'editorial' : 'filtered'}
        data-count={visibleProjects.length}
      >
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            className="work-card"
            style={{ '--work-accent': project.showcase.accent }}
          >
            <div className="work-card__visual">
              <div className="work-card__browser" aria-hidden="true">
                <span className="work-card__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="work-card__domain">{projectDomain(project)}</span>
                <span className="work-card__live">En ligne</span>
              </div>
              <button
                type="button"
                className="work-card__preview"
                onClick={() => setPreview(project)}
                aria-label={`Agrandir l’aperçu de ${project.title}`}
              >
                <img
                  src={project.image}
                  srcSet={project.imageSrcSet}
                  sizes="(min-width: 1280px) 800px, (min-width: 768px) 50vw, 100vw"
                  alt={`Capture du projet ${project.title}`}
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
                <span className="work-card__zoom">
                  <Maximize2 size={15} aria-hidden="true" /> Agrandir
                </span>
              </button>
            </div>
            <div className="work-card__body">
              <p className="work-card__label">{project.showcase.label}</p>
              <h3>
                <Link to={`/realisations/${project.slug}`}>{project.title}</Link>
              </h3>
              <p className="work-card__description">{project.description}</p>
              <ul className="work-card__capabilities" aria-label="Points clés du projet">
                {project.capabilities.slice(0, 3).map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
              <div className="work-card__actions">
                <Link
                  to={`/realisations/${project.slug}`}
                  data-analytics-category="project"
                  data-analytics-project={project.id}
                  data-analytics-label={project.title}
                >
                  Découvrir le projet <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ouvrir ${project.title} dans un nouvel onglet`}
                  data-analytics-category="project-live"
                  data-analytics-project={project.id}
                  data-analytics-label={project.title}
                >
                  Visiter <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="work-preview-dialog"
        data-theme={theme}
        aria-labelledby="work-preview-title"
        onClose={() => setPreview(null)}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        {preview && (
          <div className="work-preview-dialog__content">
            <header>
              <div>
                <p>{preview.showcase.label}</p>
                <h2 id="work-preview-title">{preview.title}</h2>
              </div>
              <form method="dialog">
                <button type="submit" aria-label="Fermer l’aperçu" autoFocus>
                  <X size={22} aria-hidden="true" />
                </button>
              </form>
            </header>
            <img
              src={preview.image}
              alt={`Capture agrandie du projet ${preview.title}`}
              width="1200"
              height="800"
            />
            <footer>
              <p>{preview.description}</p>
              <a href={preview.url} target="_blank" rel="noopener noreferrer">
                Explorer le projet en ligne <ExternalLink size={16} aria-hidden="true" />
              </a>
            </footer>
          </div>
        )}
      </dialog>
    </section>
  );
};
