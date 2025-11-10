import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n, LANG_OPTIONS } from "../i18n.jsx";

const COLOR_SETS = [
  ["#0AEFFF", "#FF2ED1", "#7C3AED"],
  ["#00E0B8", "#0A84FF", "#FF4D4D"],
  ["#22d3ee", "#8b5cf6", "#f472b6"],
];

// Fullscreen, forward-motion hyperspeed intro that locks the site until "Enter" is pressed
export function HyperspeedIntro() {
  const canvasRef = useRef(null);
  const [colors, setColors] = useState(COLOR_SETS[0]);
  const [boost, setBoost] = useState(false);
  const [locked, setLocked] = useState(() => !(sessionStorage.getItem("introUnlocked") === "1"));
  const [unlocking, setUnlocking] = useState(false);
  const { lang, setLang, t } = useI18n();
  const [selLang, setSelLang] = useState(lang);
  const [menuOpen, setMenuOpen] = useState(false);
  const FLAG = { fr: "🇫🇷", en: "🇺🇸", es: "🇪🇸", ar: "🇸🇦" };

  useEffect(() => {
    if (!locked) return;
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      c.width = Math.max(1, Math.floor(w * dpr));
      c.height = Math.max(1, Math.floor(h * dpr));
      c.style.width = `${w}px`; c.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Forward-motion star/line field (perspective)
    const F = 240; // focal length
    const cx = () => w / 2, cy = () => h * 0.55; // vanishing point slightly below center
    const DEPTH = 1000;
    const COUNT = Math.min(900, Math.floor((w * h) / 1800));
    const palette = () => colors[Math.floor(Math.random() * colors.length)];
    const rnd = (a,b)=>a+Math.random()*(b-a);
    const newStar = () => ({ x: rnd(-1,1), y: rnd(-0.6,0.6), z: rnd(1, DEPTH), pz: 0, c: palette(), w: rnd(1,2.6) });
    const stars = Array.from({ length: COUNT }, newStar);

    let raf = 0;
    const draw = () => {
      const base = 20; // base speed
      const speed = (boost ? 4.0 : 1.0) * base;
      ctx.fillStyle = "#0b0f1a";
      ctx.fillRect(0, 0, w, h);
      // subtle vignette
      const g = ctx.createRadialGradient(cx(), cy(), 10, cx(), cy(), Math.max(w,h));
      g.addColorStop(0, "rgba(11,15,26,0.2)");
      g.addColorStop(1, "rgba(11,15,26,1)");
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);

      for (let i=0;i<stars.length;i++){
        const s = stars[i];
        s.pz = s.z;
        s.z -= speed;
        if (s.z <= 1){
          Object.assign(s, newStar());
          s.z = DEPTH;
          s.pz = s.z + speed;
        }
        // perspective projection
        const k = F / s.z; const pk = F / s.pz;
        const x = cx() + s.x * k * w;
        const y = cy() + s.y * k * h;
        const px = cx() + s.x * pk * w;
        const py = cy() + s.y * pk * h;

        ctx.strokeStyle = s.c;
        ctx.lineWidth = Math.min(6, s.w * (1.2 + (DEPTH - s.z) / DEPTH * 2));
        ctx.shadowColor = s.c;
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [colors, boost, locked]);

  // color shuffle removed from UI per request; keep state for future presets

  const handleEnter = () => {
    // apply selected language before unlocking
    if (selLang && selLang !== lang) setLang(selLang);
    setUnlocking(true);
    setBoost(true);
    setTimeout(() => {
      sessionStorage.setItem("introUnlocked","1");
      setLocked(false);
      setBoost(false);
    }, 1200);
  };

  return (
    <>
      <AnimatePresence>
        {locked && (
          <motion.div
            key="lock"
            initial={{ opacity: 0, scale: 1, filter: "none" }}
            animate={unlocking ? { opacity: 0, scale: 1.08, filter: "blur(6px) brightness(1.12)" } : { opacity: 1, scale: 1, filter: "none" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0b0f1a]"
            onMouseDown={()=>setBoost(true)}
            onMouseUp={()=>setBoost(false)}
            onMouseLeave={()=>setBoost(false)}
            onTouchStart={()=>setBoost(true)}
            onTouchEnd={()=>setBoost(false)}
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            {unlocking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.9, times: [0, 0.35, 1], ease: "easeOut" }}
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(60% 60% at 50% 55%, rgba(255,255,255,0.9), rgba(255,255,255,0) 60%)",
                  mixBlendMode: "screen",
                }}
              />
            )}
            {/* Header bar */}
            <div className="absolute left-1/2 -translate-x-1/2 top-6 z-10 flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-5 py-2 text-white/80">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="mx-2 text-sm opacity-80">Optimum Tech</span>
            </div>

            {/* Center content */}
            <motion.div
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: unlocking ? 1.06 : 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 h-full w-full flex items-center justify-center text-center px-6"
            >
              <div>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow font-pixelify">{t("intro.title")}</h2>
                <p className="mt-3 md:mt-4 text-gray-300 max-w-2xl mx-auto">{t("intro.subtitle")}</p>
                <div className="mt-8 flex items-center justify-center gap-4 relative">
                  <button onClick={handleEnter} className="rounded-full bg-white text-black px-6 py-3 text-sm font-semibold shadow-sm hover:bg-gray-100 active:scale-95">
                    Enter
                  </button>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setMenuOpen((v) => !v)}
                      className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-white/10 bg-white/10 text-xl leading-none backdrop-blur hover:bg-white/20"
                      aria-haspopup="menu"
                      aria-expanded={menuOpen}
                      title="Select language"
                    >
                      {FLAG[selLang] || "🌐"}
                    </button>
                    {menuOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-40 rounded-lg border border-white/10 bg-black/60 backdrop-blur p-1 shadow-lg z-50"
                        role="menu"
                      >
                        {LANG_OPTIONS.map((opt) => (
                          <li key={opt.code}>
                            <button
                              type="button"
                              onClick={() => { setSelLang(opt.code); setMenuOpen(false); }}
                              className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 ${
                                selLang === opt.code ? "bg-white/15 text-white" : "text-gray-200 hover:bg-white/10"
                              }`}
                              role="menuitem"
                            >
                              <span className="text-lg">{FLAG[opt.code] || "🌐"}</span>
                              <span>{opt.label}</span>
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HyperspeedIntro;
