import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, Pause, PhoneCall, Play } from 'lucide-react';
import { useI18n } from '../i18n.jsx';
import heroMeeting from '../assets/images/optimum tech online meeting.webp';

export const Hero = () => {
  const { t } = useI18n();
  const [videoPaused, setVideoPaused] = React.useState(false);
  const videoRef = React.useRef(null);

  const proofPoints = [
    t('hero.proofs.architecture'),
    t('hero.proofs.development'),
    t('hero.proofs.deployment'),
  ];

  const serviceShortcuts = [
    [t('hero.shortcuts.web'), '/creation-site-web'],
    [t('hero.shortcuts.software'), '/application-web-sur-mesure'],
    [t('hero.shortcuts.seo'), '/referencement-seo'],
    [t('hero.shortcuts.ai'), '/automatisation-ia'],
  ];

  const deliverySignals = [
    t('hero.signals.scalable'),
    t('hero.signals.immersive'),
    t('hero.signals.performance')
  ];

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
      <header className="brand-hero relative min-h-[100svh] overflow-hidden bg-[#050607] text-white sm:min-h-[44rem]">
        <img
          src={heroMeeting}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 z-0 h-full w-full object-cover object-[72%_center] md:object-center"
        />
        <video
          ref={videoRef}
          className="brand-hero-video absolute inset-0 z-0 h-full w-full object-cover"
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
        >
          <source media="(min-width: 768px)" src="/ot-hero-intro.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(5,6,7,0.96)_0%,rgba(5,6,7,0.82)_48%,rgba(5,6,7,0.3)_100%)]" />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(0deg,rgba(5,6,7,0.9)_0%,transparent_62%)]" />
        <div className="hero-ambient-grid absolute inset-0 z-10 opacity-30" aria-hidden="true" />

        <section className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[1440px] items-center px-5 pb-14 pt-28 sm:min-h-[44rem] sm:px-8 sm:pb-16 sm:pt-32 lg:px-12">
          <div className="max-w-[46rem]">
            <div className="brand-eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#63B3FF] backdrop-blur-md sm:gap-3 sm:px-4 sm:text-xs">
              {t('hero.eyebrow')}
            </div>

            <h1 className="brand-hero-title mt-6 max-w-[46rem] font-bold leading-[0.98] text-white text-5xl sm:text-6xl lg:text-7xl">
              {t('hero.title')}
            </h1>

            <p className="mt-6 max-w-[40rem] text-[0.98rem] leading-7 text-white/75 sm:text-lg sm:leading-8">
              {t('hero.desc')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/contact" className="brand-btn brand-btn-gold">
                {t('hero.cta_contact')}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link to="/realisations" className="brand-btn brand-btn-white">
                {t('hero.cta_projects')}
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3" aria-label="Points clés">
              {deliverySignals.map((signal) => (
                <span key={signal} className="inline-flex items-center gap-2 text-xs font-semibold text-white/65 sm:text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0A84FF] shadow-[0_0_12px_rgba(10,132,255,.9)]" />
                  {signal}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleVideo}
              aria-label={videoPaused ? 'Lire la vidéo du bandeau' : 'Mettre la vidéo du bandeau en pause'}
              className="mt-7 hidden h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white/80 backdrop-blur-md transition hover:border-[#0A84FF] hover:bg-black/55 hover:text-white md:inline-flex"
            >
              {videoPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </section>
      </header>

      <section className="relative overflow-hidden border-y border-white/10 bg-[#050607] text-white" aria-label="Méthode et expertises">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[45rem] -translate-x-1/2 rounded-full bg-[#0A84FF]/10 blur-[100px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
          <div className="grid gap-3 md:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point} className="flex gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0A84FF]" aria-hidden="true" />
                <span className="text-sm leading-6 text-white/70">{point}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-5 border-t border-white/10 pt-7 md:flex-row md:items-center md:justify-between">
            <div className="mobile-card-scroll no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0 md:pb-0">
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
