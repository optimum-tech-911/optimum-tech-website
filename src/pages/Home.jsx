import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { useTheme } from '../context/ThemeContext';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { theme } = useTheme();
  const [isMobile] = React.useState(false);
  const [prefersReducedMotion] = React.useState(false);

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
        title="Optimum Tech | Création site web, SEO et automatisation IA en France"
        description="Optimum Tech accompagne les entreprises à Sète, dans l’Hérault, en Occitanie et en France pour la création de site web, le référencement SEO, l’automatisation IA et les solutions digitales."
        keywords="Optimum Tech, création site web sud de la france, création site web sète, agence web sète, développeur web sète, création site internet hérault, agence digitale hérault, référencement SEO sète, automatisation IA entreprise france"
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://optimutech.fr/#organization',
            name: 'Optimum Tech',
            url: 'https://optimutech.fr',
            logo: {
              '@type': 'ImageObject',
              url: 'https://optimutech.fr/apple-touch-icon.png',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+33 7 45 30 51 13',
              contactType: 'customer service',
              areaServed: ['FR'],
              availableLanguage: ['fr', 'en'],
            },
            sameAs: [
              'https://www.instagram.com/ot.optimum_tech/',
              'https://www.linkedin.com/in/sid-ahmed-larabi-09b328286/',
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': 'https://optimutech.fr/#website',
            url: 'https://optimutech.fr',
            name: 'Optimum Tech',
            publisher: {
              '@id': 'https://optimutech.fr/#organization',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            '@id': 'https://optimutech.fr/#service',
            name: 'Optimum Tech',
            url: 'https://optimutech.fr',
            image: 'https://optimutech.fr/apple-touch-icon.png',
            telephone: '+33 7 45 30 51 13',
            email: 'optimum.tech.911@gmail.com',
            areaServed: ['Sète', 'Hérault', 'Occitanie', 'France'],
            serviceType: ['Création de site web', 'Référencement SEO', 'Automatisation IA', 'Solutions digitales'],
          },
        ]}
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
        <section className="mx-auto max-w-6xl">
          <div className={`rounded-[2.5rem] border p-6 md:p-10 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-xl'
          }`}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007BFF]">
              Premiers pas
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Avancez rapidement vers l action qui compte pour votre projet
            </h2>
            <p className={`mt-5 max-w-4xl text-base leading-8 md:text-lg ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
              Nous avons simplifié le parcours pour vous aider a faire trois choses rapidement : decouvrir les services, voir des realisations concretes et demander un devis adapte a votre activite.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  to: '/services',
                  title: 'Decouvrir les services',
                  desc: 'Creation de site web, SEO local, automatisation IA et accompagnement digital.',
                },
                {
                  to: '/projects',
                  title: 'Voir les realisations',
                  desc: 'Consultez des projets et des exemples de prestations utiles pour les entreprises.',
                },
                {
                  to: '/contact',
                  title: 'Demander un devis',
                  desc: 'Parlez de votre besoin et obtenez une reponse rapide par message, email ou telephone.',
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
              Une expertise digitale claire, locale et orientee resultats
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                ['Base locale', 'Sete, Herault, Occitanie, France'],
                ['Reponse rapide', 'Retour rapide par message, email ou telephone'],
                ['Services concrets', 'Site vitrine, SEO local, automatisation IA, maintenance'],
                ['Approche business', 'Des solutions pensees pour convertir, gagner du temps et etre visibles'],
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
              Preuves concretes
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Des services utiles pour gagner en visibilite, en temps et en confiance
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                ['Site vitrine professionnel', 'Un site clair, rapide et pense pour convertir', '/creation-site-web'],
                ['SEO local', 'Ameliorez votre visibilite sur Google dans votre zone', '/referencement-seo'],
                ['Automatisation IA', 'Gagnez du temps sur les taches repetitives', '/automatisation-ia'],
                ['Maintenance et suivi', 'Un accompagnement fiable apres la mise en ligne', '/services'],
                ['Reponse rapide', 'Un echange simple par telephone, email ou message', '/contact'],
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

        <section className="mx-auto mt-10 max-w-6xl grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['/creation-site-web-sete', 'Creation site web Sete'],
            ['/agence-web-herault', 'Agence web Herault'],
            ['/referencement-seo-sete', 'SEO Sete'],
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
                Une page locale claire pour les entreprises qui recherchent un partenaire digital proche et reactif.
              </p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};
