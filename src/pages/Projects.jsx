import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProjectCard } from "../components/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useI18n } from "../i18n.jsx";
import Beams from "../components/Beams/Beams.jsx";

export const Projects = () => {
  const { t } = useI18n();
  const scrollRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  const goNext = () => setActiveIndex((i) => (i + 1) % projects.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + projects.length) % projects.length);

  const ProjectPeek = ({ title, href }) => {
    let host = href;
    try { host = new URL(href).hostname.replace("www.", ""); } catch {}
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-3 shadow-sm">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="truncate text-xs text-gray-300/90 rounded-md border border-white/10 bg-black/30 px-2 py-1 mb-2">{host}</div>
        <div className="text-sm font-semibold text-white/90 truncate">{title}</div>
      </div>
    );
  };
  const projects = [
    { title: "UFSBD34.fr", desc: "Dental Association Website", href: "https://ufsbd34.fr" },
    { title: "CandyPlanet.fr", desc: "Sweet Shop E-Commerce", href: "https://candyplanet.fr" },
    { title: "Abdessamed.pages.dev", desc: "Personal Portfolio / Dev Site", href: "https://abdessamed.pages.dev/" },
    { title: "Marcellino Mockup", desc: "Design mockup preview", href: "https://marcellino-mockup.pages.dev/" },
    { title: "Abattoire Seddik", desc: "Business site preview", href: "https://abattoire-seddik.pages.dev/" },
    { title: "Sweet Serve Admin", desc: "Admin dashboard preview", href: "https://sweet-serve-admin1.pages.dev/" },
    { title: "Carioca Artisan Orders", desc: "Orders portal preview", href: "https://carioca-artisan-orders.pages.dev/" },
    { title: "MedicalPost.co.uk", desc: "Healthcare news & insights", href: "https://medicalpost.co.uk/" },
    { title: "CertifiedRubbish.co.uk", desc: "Website", href: "https://certifiedrubbish.co.uk/" },
    { title: "EasySMS.uk", desc: "Website", href: "https://easysms.uk/" },
    { title: "Medidesk.pl", desc: "Website", href: "https://medidesk.pl/" },
    { title: "team-nkg-reimagine-round1.vercel.app", desc: "Web app preview", href: "https://team-nkg-reimagine-round1.vercel.app/" },
    { title: "VOPA.se", desc: "Website", href: "https://www.vopa.se/" },
    { title: "ABEV.ai", desc: "Website", href: "https://www.abev.ai/" },
    { title: "NutriFoodKeto.sk", desc: "Website", href: "https://nutrifoodketo.sk/" },
    { title: "RoadAngel.sk", desc: "Website", href: "https://main.roadangel.sk/" },
    { title: "AVIS.sk", desc: "Website", href: "https://www.avis.sk/" },
    { title: "Camasys.com", desc: "Website", href: "https://www.camasys.com/" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto w-full max-w-6xl py-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <Beams
            beamWidth={2.2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#0000FF"
            speed={2}
            noiseIntensity={1.6}
            scale={0.2}
            rotation={20}
          />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          {t("projects.title")}
        </motion.h1>
        {/* Mobile horizontal slider */}
        {/* Mobile single-item carousel */}
        <div className="md:hidden -mx-4 px-4">
          <div className="mb-3 flex flex-col items-center gap-2">
            <motion.div
              key={projects[activeIndex]?.title || `Project ${activeIndex + 1}`}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xs text-white"
            >
              {projects[activeIndex]?.title ? projects[activeIndex].title : `Project ${activeIndex + 1}`}
            </motion.div>
            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={false}
                animate={{ width: `${Math.round((activeIndex / Math.max(projects.length - 1, 1)) * 100)}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 shadow-[0_0_6px_rgba(10,132,255,0.6)]"
              />
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label={t("projects.swipeNext")}
              onClick={goPrev}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 active:scale-[0.98] transition btn-electric btn-heartbeat btn-spectrum"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Prev</span>
            </button>
            <button
              type="button"
              aria-label={t("projects.swipeNext")}
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 active:scale-[0.98] transition btn-electric btn-heartbeat btn-spectrum"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <AnimatePresence initial={false} mode="wait">
            {(() => {
              const p = projects[activeIndex];
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -60) goNext();
                    else if (info.offset.x > 60) goPrev();
                  }}
                >
                  <ProjectCard {...p} />
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        <div className="hidden md:block">
          <div className="max-w-5xl mx-auto">
            <div className="mb-3 flex flex-col items-center gap-2">
              <motion.div
                key={projects[activeIndex]?.title || `Project ${activeIndex + 1}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-sm md:text-base text-white"
              >
                {projects[activeIndex]?.title ? `${projects[activeIndex].title} — ${projects[activeIndex].desc || "Project"}` : `Project ${activeIndex + 1}`}
              </motion.div>
              <div className="w-full max-w-3xl h-1.5 md:h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ width: `${Math.round((activeIndex / Math.max(projects.length - 1, 1)) * 100)}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 shadow-[0_0_8px_rgba(10,132,255,0.6)]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  aria-label={t("projects.swipeNext")}
                  onClick={goPrev}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 active:scale-[0.98] transition btn-electric btn-heartbeat btn-spectrum"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  aria-label={t("projects.swipeNext")}
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 active:scale-[0.98] transition btn-electric btn-heartbeat btn-spectrum"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            <AnimatePresence initial={false} mode="wait">
              {(() => {
                const p = projects[activeIndex];
                return (
                  <motion.div
                    key={p.title}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.25 }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, info) => {
                        if (info.offset.x < -80) goNext();
                        else if (info.offset.x > 80) goPrev();
                      }}
                    >
                     <ProjectCard {...p} />
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
