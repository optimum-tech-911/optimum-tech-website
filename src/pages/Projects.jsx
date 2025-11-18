import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProjectCard } from "../components/ProjectCard";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useI18n } from "../i18n.jsx";
import Beams from "../components/Beams/Beams.jsx";

export const Projects = () => {
  const { t } = useI18n();
  const scrollRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
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
            beamWidth={isMobile ? 2.2 : 1}
            beamHeight={15}
            beamNumber={isMobile ? 12 : 28}
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="md:hidden -mx-4 px-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              type="button"
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const step = el.clientWidth * 0.86 + 16;
                el.scrollBy({ left: step, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 active:scale-[0.98] transition btn-electric btn-heartbeat btn-spectrum"
            >
              <span>{t("projects.swipeMore")}</span>
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2" ref={scrollRef}>
            {projects.map((p) => (
              <motion.div
                key={p.title}
                variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                className="snap-center shrink-0 w-[86%]"
              >
                <ProjectCard {...p} />
              </motion.div>
            ))}
            <div className="shrink-0 w-[14%] relative flex items-center justify-end">
              <button
                type="button"
                aria-label={t("projects.swipeNext")}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  const step = el.clientWidth * 0.86 + 16;
                  el.scrollBy({ left: step, behavior: "smooth" });
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white shadow-sm hover:bg-white/15 btn-electric btn-heartbeat btn-spectrum"
              >
                <span>{t("projects.swipeNext")}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tablet/Desktop grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((p) => (
            <motion.div key={p.title} variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}>
              <ProjectCard {...p} />
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};
