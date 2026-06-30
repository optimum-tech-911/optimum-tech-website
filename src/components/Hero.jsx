import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, Pause, PhoneCall, Play } from 'lucide-react';
import heroMeeting from '../assets/images/optimum tech online meeting.webp';

const proofPoints = [
  'Cadrage clair avant design',
  'Développement direct, sans intermédiaire opaque',
  'Mise en ligne, suivi et améliorations après livraison',
];

const featuredScreens = [
  { title: 'Kabamana', label: 'Plateforme logistique', image: '/projects/kabamana.jpg', to: '/realisations/kabamana' },
  { title: 'UFSBD 34', label: 'Site institutionnel', image: '/projects/ufsbd34.jpg', to: '/realisations/ufsbd34' },
  { title: 'Cabinet Dentaire Sète', label: 'Site cabinet dentaire', image: '/projects/cabinet-dentaire-sete.jpg', to: '/realisations/cabinet-dentaire-sete' },
];

const serviceShortcuts = [
  ['Site vitrine', '/creation-site-web'],
  ['Web app métier', '/application-web-sur-mesure'],
  ['SEO local', '/referencement-seo'],
  ['Automatisation sobre', '/automatisation-ia'],
];

export const Hero = () => {
  const [videoPaused, setVideoPaused] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    videoRef.current?.pause();
    setVideoPaused(true);
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setVideoPaused(false)).catch(() => setVideoPaused(true));
    } else {
      video.pause();
      setVideoPaused(true);
    }
  };

  return (
    <>
      <header className="brand-hero relative min-h-[calc(100svh-6.5rem)] overflow-hidden bg-[#050607] text-white sm:min-h-[42rem]">
        <video
          ref={videoRef}
          className="brand-hero-video absolute inset-0 z-0 h-full w-full object-cover"
          src="/ot-hero-intro.mp4"
          poster={heroMeeting}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setVideoPaused(false)}
          onPause={() => setVideoPaused(true)}
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(5,6,7,0.94)_0%,rgba(5,6,7,0.78)_48%,rgba(5,6,7,0.28)_100%)]" />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(5,6,7,0.76)_0%,transparent_58%)]" />

        <section className="relative z-20 mx-auto flex min-h-[calc(100svh-6.5rem)] w-full max-w-[1440px] items-center px-5 pb-12 pt-32 sm:min-h-[42rem] sm:px-8 sm:pb-16 sm:pt-36 lg:px-12">
          <div className="max-w-[46rem]">
            <div className="brand-eyebrow flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#0A84FF]">
              <span className="h-px w-10 bg-[#0A84FF]" />
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Optimum Tech, studio web à Sète
            </div>

            <h1 className="mt-6 max-w-[44rem] text-[2rem] font-bold leading-[1.04] text-white min-[390px]:text-[2.2rem] sm:text-[3rem] lg:text-[3.75rem]">
              Création de sites web et d’applications utiles pour entreprises locales
            </h1>

            <p className="mt-6 max-w-[42rem] text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Des pages plus claires, des parcours de contact plus simples et, quand le
              besoin le mérite, des outils métier qui font gagner du temps. Chaque projet
              part de votre offre, de vos clients et du résultat attendu.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="brand-btn brand-btn-gold">
                Demander un devis
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link to="/realisations" className="brand-btn brand-btn-white">
                Voir les réalisations
              </Link>
            </div>

            <button
              type="button"
              onClick={toggleVideo}
              aria-label={videoPaused ? 'Lire la vidéo du bandeau' : 'Mettre la vidéo du bandeau en pause'}
              className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur-md transition hover:border-[#0A84FF] hover:bg-black/55"
            >
              {videoPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </section>
      </header>

      <section className="border-y border-white/10 bg-[#050607] text-white" aria-label="Réalisations récentes">
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0A84FF]">Réalisations récentes</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Des projets visibles, du site professionnel à l’outil métier</h2>
            </div>
            <Link to="/realisations" className="hidden items-center gap-2 text-sm font-semibold text-white/70 hover:text-white sm:inline-flex">
              Tout voir <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {featuredScreens.map((project) => (
              <Link
                key={project.title}
                to={project.to}
                className="group w-[82vw] max-w-[24rem] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] transition hover:-translate-y-1 hover:border-[#0A84FF]/60 sm:w-auto sm:max-w-none"
              >
                <div className="aspect-[16/9] overflow-hidden bg-black">
                  <img src={project.image} alt={`Aperçu du projet ${project.title}`} loading="lazy" className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.025]" />
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#0A84FF]">{project.label}</p>
                    <h3 className="mt-1 text-xl font-bold text-white">{project.title}</h3>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#0A84FF] transition group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/15 pt-7 md:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0A84FF]" aria-hidden="true" />
                <span className="text-sm leading-6 text-white/70">{point}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-5 border-t border-white/15 pt-7 md:flex-row md:items-center md:justify-between">
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {serviceShortcuts.map(([label, to]) => (
                <Link key={to} to={to} className="shrink-0 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/75 transition hover:border-[#0A84FF] hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
            <a href="tel:+33745305113" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white/75 hover:text-white">
              <PhoneCall className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
              +33 7 45 30 51 13
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
