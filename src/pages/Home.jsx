import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { useTheme } from '../context/ThemeContext';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { Link } from 'react-router-dom';
import { indexableBlogPosts } from '../data/blogPosts';
import { resourceTopics, siteMeta, trustHighlights } from '../data/siteMeta';
import { buildWebPageSchema } from '../data/schema';
import { ContactActions } from '../components/ContactActions';
import { PortfolioProjectCard } from '../components/PortfolioProjectCard';
import { featuredProjects } from '../data/projects';

export const Home = () => {
  const { theme } = useTheme();
  const [isMobile] = React.useState(false);

  const BlueMatrix = ({ mobile }) => {
    const canvasRef = React.useRef(null);
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let raf = 0;
      let resizeRaf = 0;
      let width = 0;
      let height = 0;
      let fontSize = 16;
      let columns = 0;
      let drops = [];
      let lastWidth = 0;
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const resize = () => {
        const bounds = canvas.parentElement?.getBoundingClientRect();
        const newWidth = Math.max(1, Math.floor(bounds?.width || window.innerWidth));
        const newHeight = Math.max(1, Math.floor(bounds?.height || window.innerHeight));
        // Ignore mobile address-bar height jitters; only reflow when width changes (orientation/viewport width change)
        if (Math.abs(newWidth - lastWidth) < 2) return;
        lastWidth = newWidth;
        width = newWidth;
        height = newHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        fontSize = Math.max(mobile ? 14 : 18, Math.floor((width / 90) * (mobile ? 0.8 : 1)));
        columns = Math.max(10, Math.floor((width / fontSize) * (mobile ? 0.8 : 1)));
        drops = new Array(columns).fill(0);
      };
      const handleResize = () => {
        cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(resize);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      const draw = () => {
        ctx.fillStyle = mobile ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          const head = Math.random() < (mobile ? 0.08 : 0.12);
          ctx.fillStyle = head ? 'rgba(10,132,255,0.95)' : 'rgba(10,132,255,0.65)';
          ctx.fillText(text, x, y);
          if (y > height && Math.random() > 0.975) drops[i] = 0;
          else drops[i]++;
        }
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
      return () => {
        cancelAnimationFrame(raf);
        cancelAnimationFrame(resizeRaf);
        window.removeEventListener('resize', handleResize);
      };
    }, [mobile]);
    return <canvas ref={canvasRef} className="absolute inset-0" />;
  };

  const matrixEnabled = false;

  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#050505]' : 'bg-[#F5F5F7]'
    }`}>
      <SEO
        path="/"
        title="Optimum Tech | Sites web, applications et solutions digitales sur mesure"
        description="Optimum Tech accompagne les entreprises à Sète, dans l’Hérault, en Occitanie et en France pour créer des sites web, des web apps, des logiciels sur mesure, des automatisations utiles et une visibilité digitale plus solide."
        keywords="Optimum Tech, création site web sud de la france, création site web sète, agence web sète, développeur web sète, web app sur mesure france, logiciel sur mesure entreprise, agence digitale hérault, référencement SEO sète, automatisation IA entreprise france"
        schema={buildWebPageSchema({
          path: '/',
          title: 'Optimum Tech | Sites web, applications et solutions digitales sur mesure',
          description:
            'Optimum Tech accompagne les entreprises à Sète, dans l’Hérault, en Occitanie et en France pour créer des sites web, des web apps, des logiciels sur mesure, des automatisations utiles et une visibilité digitale plus solide.',
        })}
      />
      <Navbar />
      {isMobile && theme === 'dark' && <div className="absolute inset-0 z-0 pointer-events-none mobile-ambient" />}
      {matrixEnabled && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <BlueMatrix mobile={isMobile} />
        </div>
      )}
      <Hero />
      <main className="relative z-10 px-4 pb-8 md:px-6">
        <section className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
                Réalisations sélectionnées
              </p>
              <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">
                Des projets concrets, du site professionnel à l’outil métier
              </h2>
              <p className={`mt-4 max-w-3xl text-base leading-8 ${theme === 'dark' ? 'text-white/68' : 'text-black/68'}`}>
                Une sélection de réalisations en ligne et de projets en cours, présentés selon leur usage, leur secteur et leur niveau d’avancement.
              </p>
            </div>
            <Link
              to="/realisations"
              className={`inline-flex shrink-0 items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition ${
                theme === 'dark'
                  ? 'border-white/15 bg-white/5 hover:border-[#007BFF]/40 hover:bg-[#007BFF]/10'
                  : 'border-black/10 bg-white hover:border-[#007BFF]/40 hover:bg-[#007BFF]/5'
              }`}
            >
              Voir toutes les réalisations
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <PortfolioProjectCard key={project.id} project={project} compact />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl">
          <div className={`mt-10 rounded-[2.5rem] border p-6 md:p-10 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-xl'
          }`}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
              Premiers pas
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Avancez rapidement vers l’action qui compte pour votre projet
            </h2>
            <p className={`mt-5 max-w-4xl text-base leading-8 md:text-lg ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
              Nous avons simplifié le parcours pour vous aider à faire trois choses rapidement :
              découvrir les services, voir des réalisations concrètes et demander un devis
              adapté à votre activité.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  to: '/services',
                  title: 'Découvrir les services',
                  desc: 'Sites web professionnels, applications sur mesure, outils métier, visibilité digitale et automatisations utiles.',
                },
                {
                  to: '/realisations',
                  title: 'Voir les réalisations',
                  desc: 'Consultez des projets et des exemples de prestations utiles pour les entreprises.',
                },
                {
                  to: '/contact',
                  title: 'Demander un devis',
                  desc: 'Parlez de votre besoin et obtenez une réponse rapide par message, e-mail ou téléphone.',
                },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-[1.8rem] border p-5 transition ${
                    theme === 'dark'
                      ? 'border-white/10 bg-black/20 hover:border-[#007BFF]/30'
                      : 'border-black/10 bg-black/5 hover:border-[#007BFF]/30'
                  }`}
                >
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/68' : 'text-black/68'}`}>
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
            <ContactActions includeContactPage className="mt-8" />
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div className={`rounded-[2.5rem] border p-6 md:p-10 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-xl'
          }`}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
              Confiance
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Un studio digital clair, local et orienté solutions utiles
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                ['Base locale', 'Sète, Hérault, Occitanie, France'],
                ['Réponse rapide', 'Retour rapide par message, e-mail ou téléphone'],
                ['Services concrets', 'Sites web, web apps, outils internes, SEO local, automatisation et maintenance'],
                ['Approche métier', 'Des solutions pensées pour clarifier l’offre, fluidifier le travail et renforcer la visibilité'],
                ['Accompagnement humain', 'Des conseils clairs, un suivi direct, sans agence opaque'],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className={`rounded-[1.8rem] border p-5 ${
                    theme === 'dark'
                      ? 'border-white/10 bg-black/20'
                      : 'border-black/10 bg-black/5'
                  }`}
                >
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/68' : 'text-black/68'}`}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div className={`rounded-[2.5rem] border p-6 md:p-10 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-xl'
          }`}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
              Repères concrets
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Des services utiles pour gagner en clarté, en temps et en visibilité
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                ['Site vitrine professionnel', 'Un site clair, rapide et pensé pour faciliter la prise de contact', '/creation-site-web'],
                ['Web app ou outil métier', 'Une solution sur mesure pour mieux organiser, suivre ou faire avancer vos opérations', '/services'],
                ['Automatisation et IA utiles', 'Allégez certaines tâches répétitives sans ajouter de complexité inutile', '/automatisation-ia'],
                ['Maintenance et suivi', 'Un accompagnement fiable après la mise en ligne', '/services'],
                ['Visibilité locale', 'Un meilleur relais sur Google quand le SEO local devient vraiment utile', '/referencement-seo'],
              ].map(([title, desc, to]) => (
                <Link
                  key={title}
                  to={to}
                  className={`rounded-[1.8rem] border p-5 transition ${
                    theme === 'dark'
                      ? 'border-white/10 bg-black/20 hover:border-[#007BFF]/30'
                      : 'border-black/10 bg-black/5 hover:border-[#007BFF]/30'
                  }`}
                >
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/68' : 'text-black/68'}`}>
                    {desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div className={`rounded-[2.5rem] border p-6 md:p-10 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-xl'
          }`}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
              Solutions adaptées
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Des solutions adaptées à votre activité
            </h2>
            <p className={`mt-5 max-w-4xl text-base leading-8 md:text-lg ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
              Nous créons d’abord des sites web professionnels conçus pour rassurer,
              clarifier l’offre et faciliter la prise de contact. Quand le besoin va plus
              loin, nous pouvons aussi cadrer une application, un outil métier ou une
              automatisation utile.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                ['/site-internet-dentiste', 'Site internet pour dentiste', 'Pour présenter le cabinet, les soins et un contact clair.'],
                ['/site-internet-medecin', 'Site internet pour médecin', 'Pour structurer un site sobre, rassurant et utile sur mobile.'],
                ['/site-internet-entreprise-locale', 'Site internet pour entreprise locale', 'Pour les artisans, commerces, indépendants, services et PME.'],
                ['/application-web-sur-mesure', 'Application web sur mesure', 'Pour les entreprises qui ont besoin d’un vrai outil d’usage.'],
                ['/logiciel-sur-mesure', 'Logiciel sur mesure', 'Pour cadrer un outil métier, un flux interne ou un logiciel plus précis.'],
              ].map(([to, title, desc]) => (
                <Link
                  key={to}
                  to={to}
                  className={`rounded-[1.8rem] border p-5 transition ${
                    theme === 'dark'
                      ? 'border-white/10 bg-black/20 hover:border-[#007BFF]/30'
                      : 'border-black/10 bg-black/5 hover:border-[#007BFF]/30'
                  }`}
                >
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/68' : 'text-black/68'}`}>
                    {desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div className={`rounded-[2.5rem] border p-6 md:p-10 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-xl'
          }`}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
              Ce que nous faisons concrètement
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Des solutions digitales plus utiles, de la visibilité quand elle compte et des automatisations choisies avec sobriété
            </h2>
            <div className={`mt-6 grid gap-6 lg:grid-cols-2 ${theme === 'dark' ? 'text-white/74' : 'text-black/74'}`}>
              <div className="space-y-4 text-base leading-8">
                <p>
                  Optimum Tech accompagne surtout des entreprises qui ont besoin d’un site
                  web professionnel capable d’expliquer clairement leur offre, de soutenir
                  leur crédibilité et de faciliter la prise de contact.
                </p>
                <p>
                  Selon le contexte, nous travaillons aussi le SEO local, les pages
                  services, le maillage interne, la logique de conversion, des web apps,
                  des outils métiers et des automatisations simples qui font gagner du
                  temps sans ajouter de complexité inutile.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {trustHighlights.map((item) => (
                  <div
                    key={item}
                    className={`rounded-[1.8rem] border p-5 ${
                      theme === 'dark'
                        ? 'border-white/10 bg-black/20'
                        : 'border-black/10 bg-black/5'
                    }`}
                  >
                    <p className="text-sm leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div className={`rounded-[2.5rem] border p-6 md:p-10 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-xl'
          }`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
                  Méthode
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                  Comment nous cadrons un projet digital utile
                </h2>
              </div>
              <Link
                to="/contact"
                className={`inline-flex items-center gap-3 rounded-full border px-6 py-3 text-sm font-semibold transition ${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                    : 'border-black/10 bg-black/5 text-black hover:bg-black/10'
                }`}
              >
                Demander un échange
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {[
                ['1. Comprendre', 'Objectifs business, type de clients, freins de conversion et niveau de maturité digitale.'],
                ['2. Prioriser', 'Choisir entre site, refonte, web app, outil interne, SEO local ou automatisation selon l’impact réel.'],
                ['3. Structurer', 'Clarifier l’offre, les pages, les contenus et les appels à l’action avant d’empiler des outils.'],
                ['4. Lancer', 'Mettre en ligne une base propre et maintenir un parcours simple pour Google comme pour vos visiteurs.'],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className={`rounded-[1.8rem] border p-5 ${
                    theme === 'dark'
                      ? 'border-white/10 bg-black/20'
                      : 'border-black/10 bg-black/5'
                  }`}
                >
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div className={`rounded-[2.5rem] border p-6 md:p-10 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-xl'
          }`}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
              Ressources
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Un centre de ressources utile pour les entreprises locales
            </h2>
            <p className={`mt-5 max-w-4xl text-base leading-8 ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
              Nous publions des guides en français pour aider les dirigeants à mieux
              comprendre les choix web, applicatifs, éditoriaux et de visibilité avant d’investir.
            </p>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {resourceTopics.map((topic) => (
                <div
                  key={topic.title}
                  className={`rounded-[1.8rem] border p-5 ${
                    theme === 'dark'
                      ? 'border-white/10 bg-black/20'
                      : 'border-black/10 bg-black/5'
                  }`}
                >
                  <h3 className="text-xl font-semibold">{topic.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                    {topic.description}
                  </p>
                  <div className="mt-5 space-y-3">
                    {topic.links.slice(0, 2).map((href) => {
                      const post = indexableBlogPosts.find((item) => `/blog/${item.slug}` === href);
                      const fallbackSlug = href.replace('/blog/', '');
                      const label = post?.title || fallbackSlug.replaceAll('-', ' ');

                      return (
                        <Link
                          key={href}
                          to={href}
                          className="block text-sm font-medium text-[#007BFF]"
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/blog"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#007BFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007BFF]/90"
            >
              Explorer le blog
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <div className={`rounded-[2.5rem] border p-6 md:p-10 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-xl'
          }`}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
              Contact direct
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Un interlocuteur clair et un chemin de contact simple
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ['Téléphone', siteMeta.phone, siteMeta.phoneHref],
                ['E-mail', siteMeta.email, siteMeta.emailHref],
                ['Zone', siteMeta.locationLabel, '/contact'],
              ].map(([title, value, href]) => {
                const isInternal = href.startsWith('/');
                const className = `rounded-[1.8rem] border p-5 transition ${
                  theme === 'dark'
                    ? 'border-white/10 bg-black/20 hover:border-[#007BFF]/30'
                    : 'border-black/10 bg-black/5 hover:border-[#007BFF]/30'
                }`;

                return isInternal ? (
                  <Link key={title} to={href} className={className}>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                      {value}
                    </p>
                  </Link>
                ) : (
                  <a key={title} href={href} className={className}>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                      {value}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-6xl grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['/creation-site-web-sete', 'Création site web Sète'],
            ['/agence-web-herault', 'Agence web Hérault'],
            ['/referencement-seo-sete', 'SEO Sète'],
            ['/automatisation-ia-occitanie', 'Automatisation IA Occitanie'],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className={`rounded-[1.8rem] border p-5 transition ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5 hover:border-[#007BFF]/30'
                  : 'border-black/10 bg-white/80 hover:border-[#007BFF]/30 shadow-lg'
              }`}
            >
              <h2 className="text-lg font-semibold">{label}</h2>
              <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/68' : 'text-black/68'}`}>
                Une page locale claire pour les entreprises qui recherchent un partenaire digital proche et réactif.
              </p>
            </Link>
          ))}
        </section>

        <section className="mx-auto mt-10 max-w-6xl grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ['/site-internet-dentiste', 'Site internet pour dentiste'],
            ['/site-internet-medecin', 'Site internet pour médecin'],
            ['/site-internet-entreprise-locale', 'Site internet pour entreprise locale'],
            ['/application-web-sur-mesure', 'Application web sur mesure'],
            ['/logiciel-sur-mesure', 'Logiciel sur mesure'],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className={`rounded-[1.8rem] border p-5 transition ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5 hover:border-[#007BFF]/30'
                  : 'border-black/10 bg-white/80 hover:border-[#007BFF]/30 shadow-lg'
              }`}
            >
              <h2 className="text-lg font-semibold">{label}</h2>
              <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/68' : 'text-black/68'}`}>
                Une page utile pour mieux cadrer un besoin fréquent avant de nous contacter.
              </p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};
