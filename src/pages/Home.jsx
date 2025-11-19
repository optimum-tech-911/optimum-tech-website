import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import HyperspeedIntro from "../components/HyperspeedIntro";
import { Footer } from "../components/Footer";
 

export const Home = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  const BlueMatrix = () => {
    const canvasRef = React.useRef(null);
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      let raf = 0;
      let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
      const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
      let fontSize = 16;
      let columns = 0;
      let drops = [];
      const resize = () => {
        w = Math.max(1, Math.floor(document.documentElement.clientWidth));
        h = Math.max(1, Math.floor(document.documentElement.scrollHeight));
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        fontSize = Math.max(14, Math.floor(w / 90));
        columns = Math.floor(w / fontSize);
        drops = new Array(columns).fill(0);
      };
      resize();
      const onResize = () => resize();
      window.addEventListener("resize", onResize);
      const draw = () => {
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, w, h);
        ctx.font = fontSize + "px monospace";
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          const head = Math.random() < 0.12;
          ctx.fillStyle = head ? "rgba(0,123,255,0.95)" : "rgba(0,123,255,0.65)";
          ctx.fillText(text, x, y);
          if (y > h && Math.random() > 0.975) drops[i] = 0; else drops[i]++;
        }
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
      };
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0" />;
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BlueMatrix />
      </div>
      <HyperspeedIntro />
      <Hero />
      <Footer />
    </div>
  );
};
