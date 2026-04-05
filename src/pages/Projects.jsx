import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProjectCard } from '../components/ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n.jsx';
import { SEO } from '../components/SEO.jsx';
import { supabase } from '../../supabaseClient';
import { useTheme } from '../context/ThemeContext';

const ProjectCarousel = ({ title, projects }) => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => setActiveIndex((i) => (i + 1) % projects.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + projects.length) % projects.length);

  if (projects.length === 0) return null;

  const btnClass = `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition active:scale-[0.98] ${
    theme === 'dark'
      ? 'border-white/15 bg-white/5 text-white hover:bg-white/10'
      : 'border-black/10 bg-black/5 text-black hover:bg-black/10'
  }`;

  return (
    <div className="mb-24 last:mb-0">
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`text-2xl md:text-3xl font-bold mb-8 text-center ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          {title}
        </motion.h2>
      )}

      {/* Mobile Carousel */}
      <div className="md:hidden -mx-4 px-4">
        <div className="mb-3 flex flex-col items-center gap-2">
          <motion.div
            key={projects[activeIndex]?.title || `Project ${activeIndex + 1}`}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`text-xs ${theme === 'dark' ? 'text-white' : 'text-black'}`}
          >
            {projects[activeIndex]?.title
              ? projects[activeIndex].title
              : `Project ${activeIndex + 1}`}
          </motion.div>
          <div className={`w-full h-1 rounded-full overflow-hidden ${
            theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
          }`}>
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
            className={btnClass}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>{t('projects.prev')}</span>
          </button>
          <button
            type="button"
            aria-label={t('projects.next')}
            onClick={goNext}
            className={btnClass}
          >
            <span>{t('projects.next')}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <AnimatePresence initial={false} mode="wait">
          {(() => {
            const p = projects[activeIndex];
            if (!p) return null;
            
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

      {/* Desktop Carousel */}
      <div className="hidden md:block">
        <div className="max-w-5xl mx-auto">
          <div className="mb-3 flex flex-col items-center gap-2">
            <motion.div
              key={projects[activeIndex]?.title || `Project ${activeIndex + 1}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`text-sm md:text-base ${theme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              {projects[activeIndex]?.title
                ? `${projects[activeIndex].title} — ${projects[activeIndex].desc || 'Project'}`
                : `Project ${activeIndex + 1}`}
            </motion.div>
            <div className={`w-full max-w-3xl h-1.5 md:h-1.5 rounded-full overflow-hidden ${
              theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
            }`}>
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
              className={btnClass}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>{t('projects.prev')}</span>
            </button>
            <button
              type="button"
              aria-label={t('projects.next')}
              onClick={goNext}
              className={btnClass}
            >
              <span>{t('projects.next')}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <AnimatePresence initial={false} mode="wait">
            {(() => {
              const p = projects[activeIndex];
              if (!p) return null;

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
    </div>
  );
};

export const Projects = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [projects, setProjects] = useState({ launched: [], progress: [] });
  const [loading, setLoading] = useState(true);
  const [showProgress, setShowProgress] = useState(false);

  const BlueMatrix = () => {
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
        fontSize = Math.max(18, Math.floor(width / 90));
        columns = Math.max(10, Math.floor(width / fontSize));
        drops = new Array(columns).fill(0);
      };
      const handleResize = () => {
        cancelAnimationFrame(resizeRaf);
        resizeRaf = requestAnimationFrame(resize);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      const draw = () => {
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          const head = Math.random() < 0.12;
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
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0" />;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      if (!supabase) {
        console.warn('Supabase not configured. Using empty project list.');
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('sort_order', { ascending: true }); // Use sort_order
        
        if (error) throw error;
        
        const mappedData = (data || []).map(p => ({
          ...p,
          desc: p.description || p.status,
          href: p.url || '#'
        }));

        setProjects({
          launched: mappedData.filter(p => p.status !== 'In progress'),
          progress: mappedData.filter(p => p.status === 'In progress')
        });
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
      }`}>
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
          theme === 'dark' ? 'border-white' : 'border-black'
        }`}></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-500 ${
      theme === 'dark' ? 'text-white' : 'bg-[#F5F5F7] text-black'
    }`}>
      {theme === 'dark' && <div className="fixed inset-0 z-[-10] bg-[#050505]" />}
      <SEO
        path="/projects"
        title="Réalisations web et digitales | Optimum Tech"
        description="Découvrez des réalisations, projets web et solutions digitales signées Optimum Tech pour illustrer notre approche en création de site, logiciel et automatisation."
      />
      <Navbar />
      
      {theme === 'dark' && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <BlueMatrix />
        </div>
      )}

      <main className="container mx-auto w-full max-w-6xl pt-32 pb-16 relative z-10 min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className={`text-5xl md:text-7xl font-bold tracking-tighter mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            {t('projects.title')}
          </h1>
          <p className={`text-xl md:text-2xl font-light max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-white/50' : 'text-black/50'
          }`}>
            {t('hero.ctaSee')}
          </p>
        </motion.div>
        
        <div className="space-y-12">
          {projects.launched.length > 0 && (
             <ProjectCarousel title="" projects={projects.launched} />
          )}

          {projects.progress.length > 0 && (
             <div className={`flex flex-col items-center border-t pt-12 mt-12 w-full ${
               theme === 'dark' ? 'border-white/10' : 'border-black/10'
             }`}>
               <button
                 onClick={() => setShowProgress(!showProgress)}
                 className={`flex items-center gap-3 px-8 py-3 rounded-2xl border transition-all group ${
                   theme === 'dark' 
                     ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
                     : 'bg-black/5 border-black/10 text-black hover:bg-black/10'
                 }`}
               >
                 <span className="font-medium text-lg">Current Progress Projects</span>
                 <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showProgress ? 'rotate-180' : ''} text-blue-400`} />
               </button>

               <AnimatePresence>
                 {showProgress && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     transition={{ duration: 0.4, ease: "easeInOut" }}
                     className="w-full overflow-hidden"
                   >
                     <div className="pt-12">
                       <ProjectCarousel title="" projects={projects.progress} />
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          )}

          {projects.launched.length === 0 && projects.progress.length === 0 && (
             <div className="flex flex-col items-center justify-center py-20">
                <p className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>
                  No projects found. Add some in the admin panel.
                </p>
             </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
