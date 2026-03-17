import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { useTheme } from '../context/ThemeContext';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { Helmet } from 'react-helmet-async';

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

  const matrixEnabled = !prefersReducedMotion && theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#050505]' : 'bg-[#F5F5F7]'
    }`}>
      <SEO
        path="/"
        title="Optimum Tech – Excellence en Développement & IA"
        description="Optimum Tech accompagne les entreprises avec des sites web rapides, des automatisations intelligentes et des solutions IA sur mesure. Développez-vous plus vite avec une technologie simple, efficace et moderne."
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://optimutech.fr/#organization',
                name: 'Optimum Tech',
                url: 'https://optimutech.fr',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://optimutech.fr/assets/logo.png'
                },
                description: 'Création de sites web, automatisation et IA pour entreprises.',
                sameAs: [
                  'https://twitter.com/optimutech',
                  'https://www.linkedin.com/company/optimutech'
                ]
              },
              {
                '@type': 'WebSite',
                '@id': 'https://optimutech.fr/#website',
                url: 'https://optimutech.fr',
                name: 'Optimum Tech',
                description: 'Solutions Digitales & IA',
                publisher: {
                  '@id': 'https://optimutech.fr/#organization'
                },
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://optimutech.fr/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string'
                }
              },
              {
                '@type': 'LocalBusiness',
                '@id': 'https://optimutech.fr/#localbusiness',
                parentOrganization: {
                  '@id': 'https://optimutech.fr/#organization'
                },
                name: 'Optimum Tech',
                url: 'https://optimutech.fr',
                description: 'Création de sites web, automatisation et IA pour entreprises.',
                logo: 'https://optimutech.fr/assets/logo.png',
                image: 'https://optimutech.fr/assets/og-image.png',
                priceRange: '$$'
              }
            ]
          })}
        </script>
      </Helmet>
      <Navbar />
      {isMobile && theme === 'dark' && <div className="absolute inset-0 z-0 pointer-events-none mobile-ambient" />}
      {matrixEnabled && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <BlueMatrix mobile={isMobile} />
        </div>
      )}
      <Hero />
      <Footer />
    </div>
  );
};
