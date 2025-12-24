import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProjectCard } from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useI18n } from '../i18n.jsx';
import Beams from '../components/Beams/Beams.jsx';
import { SEO } from '../components/SEO.jsx';
import { supabase } from '../../supabaseClient';

export const Projects = () => {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        const mappedData = (data || []).map(p => ({
          ...p,
          desc: p.description || p.status, // Fallback if description is missing
          href: p.url || '#'
        }));
        
        setProjects(mappedData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // mobile detection removed — not used in layout
  const goNext = () => setActiveIndex((i) => (i + 1) % projects.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        path="/projects"
        title="Nos Réalisations – Sites Web, Applications & IA | Optimum Tech"
        description="Découvrez les projets réalisés par Optimum Tech : sites web professionnels, applications modernes et automatisations IA conçues pour améliorer la performance de nos clients."
      />
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
          {t('projects.title')}
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
              {projects[activeIndex]?.title
                ? projects[activeIndex].title
                : `Project ${activeIndex + 1}`}
            </motion.div>
            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={false}
                animate={{
                  width: `${Math.round((activeIndex / Math.max(projects.length - 1, 1)) * 100)}%`,
                }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 shadow-[0_0_6px_rgba(10,132,255,0.6)]"
              />
            </div>
          </div>
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label={t('projects.prev')}
              onClick={goPrev}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 active:scale-[0.98] transition btn-electric btn-heartbeat btn-spectrum"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>{t('projects.prev')}</span>
            </button>
            <button
              type="button"
              aria-label={t('projects.next')}
              onClick={goNext}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 active:scale-[0.98] transition btn-electric btn-heartbeat btn-spectrum"
            >
              <span>{t('projects.next')}</span>
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
                {projects[activeIndex]?.title
                  ? `${projects[activeIndex].title} — ${projects[activeIndex].desc || 'Project'}`
                  : `Project ${activeIndex + 1}`}
              </motion.div>
              <div className="w-full max-w-3xl h-1.5 md:h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{
                    width: `${Math.round((activeIndex / Math.max(projects.length - 1, 1)) * 100)}%`,
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 shadow-[0_0_8px_rgba(10,132,255,0.6)]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                aria-label={t('projects.prev')}
                onClick={goPrev}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 active:scale-[0.98] transition btn-electric btn-heartbeat btn-spectrum"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{t('projects.prev')}</span>
              </button>
              <button
                type="button"
                aria-label={t('projects.next')}
                onClick={goNext}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 active:scale-[0.98] transition btn-electric btn-heartbeat btn-spectrum"
              >
                <span>{t('projects.next')}</span>
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
