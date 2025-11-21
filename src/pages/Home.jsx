import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
const HyperspeedIntro = React.lazy(() => import("../components/HyperspeedIntro"));
import { Footer } from "../components/Footer";
import { isIntroUnlocked, subscribeToIntroUnlock } from "../utils/introState.js";
import { SEO } from "../components/SEO.jsx";
import { Helmet } from "react-helmet-async";
 

const IntroFallback = () => (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black text-white/70 text-xs tracking-[0.4em] uppercase">
    Initializing Hyperspeed
  </div>
);

export const Home = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const wantsIntro = !isMobile && !prefersReducedMotion;
  const [introReady, setIntroReady] = React.useState(() => isIntroUnlocked() || !wantsIntro);

  React.useEffect(() => {
    if (introReady) return;
    const unsubscribe = subscribeToIntroUnlock(() => setIntroReady(true));
    return () => unsubscribe();
  }, [introReady]);

  const BlueMatrix = ({ mobile }) => {
    const canvasRef = React.useRef(null);
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      let raf = 0;
      let resizeRaf = 0;
      let width = 0;
      let height = 0;
      let fontSize = 16;
      let columns = 0;
      let drops = [];
      let lastWidth = 0;
      const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
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
        canvas.style.width = "100%";
        canvas.style.height = "100%";
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
      window.addEventListener("resize", handleResize);
      const draw = () => {
        ctx.fillStyle = mobile ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = fontSize + "px monospace";
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          const head = Math.random() < (mobile ? 0.08 : 0.12);
          ctx.fillStyle = head ? "rgba(10,132,255,0.95)" : "rgba(10,132,255,0.65)";
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
        window.removeEventListener("resize", handleResize);
      };
    }, [mobile]);
    return <canvas ref={canvasRef} className="absolute inset-0" />;
  };

  const matrixEnabled = introReady && !prefersReducedMotion;

  return (
    <div className="min-h-screen flex flex-col relative bg-black">
      <SEO
        path="/"
        title="Optimum Tech – Création de Sites Web, Automatisation & IA au Service des Entreprises"
        description="Optimum Tech accompagne les entreprises avec des sites web rapides, des automatisations intelligentes et des solutions IA sur mesure. Développez-vous plus vite avec une technologie simple, efficace et moderne."
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Optimum Tech",
            url: "https://optimutech.fr",
            description: "Création de sites web, automatisation et IA pour entreprises.",
            logo: "https://optimutech.fr/assets/logo.png",
          })}
        </script>
      </Helmet>
      {introReady ? (
        <>
          <Navbar />
          {isMobile && (
            <div className="absolute inset-0 z-0 pointer-events-none mobile-ambient" />
          )}
          {matrixEnabled && (
            <div className="absolute inset-0 z-0 pointer-events-none">
              <BlueMatrix mobile={isMobile} />
            </div>
          )}
          <Hero />
          <Footer />
        </>
      ) : (
        <React.Suspense fallback={<IntroFallback />}>
          <HyperspeedIntro onUnlocked={() => setIntroReady(true)} />
        </React.Suspense>
      )}
    </div>
  );
};
