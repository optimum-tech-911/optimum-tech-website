import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Cpu, BarChart3 } from "lucide-react";
import Logo2 from "../assets/Logo 2.jpeg";
import { useI18n } from "../i18n.jsx";

function SparkCanvas({ trailsRef }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const host = trailsRef?.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0, timers = [];
    const resize = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const bolts = [];
    const embers = [];
    const makeBolt = (x, y, len, ang, segs, life) => {
      const pts = [{ x, y }];
      let ax = x, ay = y, a = ang;
      for (let i = 0; i < segs; i++) {
        a += (Math.random() - 0.5) * 0.6;
        const step = len / segs;
        ax += Math.cos(a) * step;
        ay += Math.sin(a) * step;
        pts.push({ x: ax, y: ay });
        if (i === Math.floor(segs * 0.5) && Math.random() < 0.7) {
          const ba = a + (Math.random() - 0.5) * 0.9;
          const blen = len * (0.4 + Math.random() * 0.3);
          const bpts = [{ x: ax, y: ay }];
          let bx = ax, by = ay;
          for (let j = 0; j < Math.floor(segs * 0.4); j++) {
            const stepb = blen / Math.floor(segs * 0.4);
            const da = (Math.random() - 0.5) * 0.7;
            const aa = ba + da;
            bx += Math.cos(aa) * stepb;
            by += Math.sin(aa) * stepb;
            bpts.push({ x: bx, y: by });
          }
          bolts.push({ pts: bpts, t: 0, life, w: 2.2, glow: "rgba(10,132,255,0.9)" });
        }
      }
      bolts.push({ pts, t: 0, life, w: 2.8, glow: "rgba(10,132,255,0.9)" });
      for (let k = 0; k < 24; k++) {
        const p = pts[Math.floor(Math.random() * pts.length)];
        const angp = Math.random() * Math.PI * 2;
        const sp = 1 + Math.random() * 2.8;
        embers.push({ x: p.x, y: p.y, vx: Math.cos(angp) * sp, vy: Math.sin(angp) * sp, g: 0.08, drag: 0.982, r: 0.8 + Math.random() * 1.2, t: 0, life: life * 0.8, color: Math.random() < 0.5 ? "rgba(255,255,255,1)" : "rgba(180,210,255,1)", glow: "rgba(10,32,80,0.6)" });
      }
    };
    const burst = (rx, ry, intensity = 1) => {
      const x = w * rx, y = h * ry;
      const count = Math.floor(3 * intensity) + 2;
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        makeBolt(x, y, 40 + Math.random() * 28, ang, 10 + Math.floor(Math.random() * 6), 900 + Math.floor(Math.random() * 600));
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "screen";
      for (let i = bolts.length - 1; i >= 0; i--) {
        const b = bolts[i];
        b.t += 16;
        const fade = Math.max(0, 1 - b.t / b.life);
        ctx.shadowBlur = 22;
        ctx.shadowColor = b.glow;
        ctx.globalAlpha = fade * 0.7;
        ctx.strokeStyle = b.glow;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(b.pts[0].x, b.pts[0].y);
        for (let k = 1; k < b.pts.length; k++) ctx.lineTo(b.pts[k].x, b.pts[k].y);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = fade;
        ctx.strokeStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = b.w;
        ctx.beginPath();
        ctx.moveTo(b.pts[0].x, b.pts[0].y);
        for (let k = 1; k < b.pts.length; k++) ctx.lineTo(b.pts[k].x, b.pts[k].y);
        ctx.stroke();
        if (fade <= 0) bolts.splice(i, 1);
      }
      for (let i = embers.length - 1; i >= 0; i--) {
        const p = embers[i];
        p.t += 16;
        p.vy += p.g;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.x += p.vx;
        p.y += p.vy;
        const fade = Math.max(0, 1 - p.t / p.life);
        ctx.shadowBlur = 16;
        ctx.shadowColor = p.glow;
        ctx.globalAlpha = fade;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (fade <= 0 || p.y > h + 20) embers.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const cycleRaw = getComputedStyle(host).getPropertyValue("--cycle");
    const cycleMs = cycleRaw?.includes("s") ? Math.max(100, parseFloat(cycleRaw) * 1000) : 6000;
    const schedule = () => {
      timers.forEach(clearTimeout);
      timers = [
        setTimeout(() => burst(0.94, 0.5, 1.2), cycleMs * 0.25),
        setTimeout(() => burst(0.06, 0.5, 1.2), cycleMs * 0.75),
      ];
    };
    schedule();
    const rightSpark = host.querySelector(".trail-spark-right");
    const onIter = () => schedule();
    rightSpark?.addEventListener("animationiteration", onIter);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", onResize);
      rightSpark?.removeEventListener("animationiteration", onIter);
    };
  }, [trailsRef]);
  return <canvas ref={canvasRef} className="spark-canvas absolute -inset-1" aria-hidden />;
}

export const Hero = () => {
  const { t, lang } = useI18n();
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } } };
  const tokensByLang = { fr: ["IA", "automatisations"], en: ["AI", "automations"], es: ["IA", "automatizaciones"], ar: ["الذكاء الاصطناعي", "الأتمتة"] };
  const tokens = tokensByLang[lang] || ["AI", "automations"];
  const HighlightText = ({ text }) => {
    const pattern = new RegExp(`(${tokens.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
    const parts = String(text).split(pattern);
    return (
      <>
        {parts.map((p, i) => pattern.test(p) ? (<span key={i} className="text-[#007BFF]">{p}</span>) : (<span key={i}>{p}</span>))}
      </>
    );
  };
  return (
    <motion.section className="container mx-auto grid grid-cols-12 min-h-[calc(100vh-80px)] items-center py-24 gap-8 md:gap-12 z-10" variants={container} initial="hidden" animate="visible">
      <div className="col-span-12 md:col-span-7 max-w-[75ch] md:rounded-2xl md:border md:border-white/10 md:bg-white/5 md:backdrop-blur supports-[backdrop-filter]:md:bg-white/10 md:p-6">
        <motion.h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white inline-block rounded-xl border border-white/10 bg-[#0A1A2F]/40 supports-[backdrop-filter]:bg-[#0A1A2F]/30 backdrop-blur px-2 py-2 md:bg-transparent md:border-transparent md:border-0" variants={item}>
          <span className="md:block inline whitespace-nowrap">{t("hero.build")} <span className="text-[#007BFF]">{t("hero.faster")}</span>.</span>
          <span className="md:block inline whitespace-nowrap ml-2">{t("hero.automate")} <span className="text-[#007BFF]">{t("hero.everything")}</span>.</span>
          <span className="block">{t("hero.grow")} <span className="text-[#007BFF]">{t("hero.smarter")}</span>.</span>
        </motion.h1>
        <motion.p className="mt-6 inline-block rounded-xl border border-white/10 bg-black/30 supports-[backdrop-filter]:bg-black/20 backdrop-blur px-3 py-2 text-base md:text-xl leading-relaxed text-white electric-text" variants={item}>
          {t("hero.blurb")}
        </motion.p>
        <motion.div className="mt-6 flex flex-wrap items-center gap-2" variants={item}>
          {[{ icon: Zap, label: `${t("hero.build")} ${t("hero.faster")}` }, { icon: BarChart3, label: `${t("hero.grow")} ${t("hero.smarter")}` }, { icon: Cpu, label: `${t("hero.automate")} ${t("hero.everything")}` }].map(({ icon: Icon, label }, i) => (
            <div key={i} className={i === 2 ? "mt-2 basis-full" : ""}>
              <div className={`inline-flex items-center gap-2 rounded-full border border-white/15 px-4 md:px-5 py-1.5 text-xs md:text-sm whitespace-nowrap bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 animate-gradient w-fit`}>
                <Icon className="h-4 w-4 text-white" />
                <span className="text-white">{label}</span>
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div className="mt-10 flex items-center gap-x-3" variants={item}>
          <Link to="/contact" className="relative overflow-hidden rounded-full border border-white/15 px-4 py-2.5 text-sm md:text-sm font-semibold text-white shadow-sm transition-transform duration-300 active:scale-95 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient md:px-6 md:py-3 md:bg-white/10 md:backdrop-blur supports-[backdrop-filter]:md:bg-white/15 whitespace-nowrap btn-electric btn-heartbeat btn-spectrum">
            {t("hero.ctaStart")}<ArrowRight className="inline-block ml-2 h-4 w-4" />
          </Link>
          <Link to="/projects" className="group flex items-center gap-x-2 text-sm md:text-sm font-semibold leading-6 text-white rounded-full border px-4 py-2.5 md:px-5 md:py-2 backdrop-blur supports-[backdrop-filter]:bg-white/10 md:bg-white/10 whitespace-nowrap btn-golden btn-clockbeat">
            <span className="logo-dot">
              <img src={Logo2} alt="Optimum Tech logo" className="w-full h-full object-cover" />
            </span>
            <span>{t("hero.ctaSee")}</span>
          </Link>
        </motion.div>
        <div className="mt-8 glass-base glass-blue-darker rounded-2xl p-4 glass-blur-2 glass-border-light">
          <h3 className="text-3xl md:text-4xl font-bold electric-blue-glow">{t("hero.missionTitle")}</h3>
          <p className="mt-3 text-sm md:text-base text-white"><HighlightText text={t("hero.mission1")} /></p>
          <p className="mt-2 text-sm md:text-base text-white"><HighlightText text={t("hero.mission2")} /></p>
          <p className="mt-2 text-sm md:text-base text-white"><HighlightText text={t("hero.mission3")} /></p>
        </div>
      </div>
      <motion.div variants={item} className="col-span-12 md:col-span-5 w-full md:w-auto">
        <div className="relative mx-auto w-full max-w-md md:max-w-sm">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-xl">
            <div className="logo-golden-wave" aria-hidden />
            <img src={Logo2} alt="Optimum Tech secondary logo" className="relative z-10 rounded-lg w-full h-auto object-contain" />
          </div>
          <div className="mt-6 rounded-2xl p-4 glass-blur-2 glass-border-light bg-black/30 supports-[backdrop-filter]:bg-black/20 glass-heartbeat">
            <h3 className="text-3xl md:text-4xl font-bold electric-blue-glow">{t("hero.visionTitle")}</h3>
            <p className="mt-3 text-sm md:text-base text-white"><HighlightText text={t("hero.vision1")} /></p>
            <p className="mt-2 text-sm md:text-base text-white"><HighlightText text={t("hero.vision2")} /></p>
            <p className="mt-2 text-sm md:text-base text-white"><HighlightText text={t("hero.vision3")} /></p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
