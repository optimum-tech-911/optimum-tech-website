import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Cpu, BarChart3, TrendingUp, Search, ShieldCheck, Maximize } from 'lucide-react';
import Logo2 from '../assets/Logo 2.jpeg';
import { useI18n } from '../i18n.jsx';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const { theme } = useTheme();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = (y - centerY) / 10;
    const ry = (centerX - x) / 10;
    setRotateX(rx);
    setRotateY(ry);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={`${className} transition-colors duration-500 ${
        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-500/10 border-black/10 backdrop-blur-2xl shadow-2xl'
      }`}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

const GrowthGraph = () => {
  const { theme } = useTheme();
  const color = theme === 'dark' ? '#007BFF' : '#0056b3';
  return (
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <motion.path
          d="M0 350C100 320 200 380 300 300C400 220 500 280 600 150C700 20 800 50 800 50"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path
          d="M0 350C100 320 200 380 300 300C400 220 500 280 600 150C700 20 800 50 800 50V400H0V350Z"
          fill="url(#paint0_linear)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
        <defs>
          <linearGradient id="paint0_linear" x1="400" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor={color} />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          { x: 300, y: 300 },
          { x: 600, y: 150 },
          { x: 800, y: 50 }
        ].map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="6"
            fill={color}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.3, type: "spring" }}
          />
        ))}
      </svg>
    </div>
  );
};

export const Hero = () => {
  const { t, lang } = useI18n();
  const containerRef = useRef(null);
  const { theme } = useTheme();

  const tokensByLang = {
    fr: ['IA', 'automatisations', 'code', 'développement logiciel', 'applications', 'web apps', 'softwares'],
    en: ['AI', 'automations', 'coding', 'software development', 'applications', 'web apps', 'softwares'],
    es: ['IA', 'automatizaciones', 'código', 'desarrollo de software', 'aplicaciones', 'web apps', 'softwares'],
    ar: ['الذكاء الاصطناعي', 'الأتمتة', 'البرمجة', 'تطوير البرمجيات', 'التطبيقات', 'تطبيقات الويب'],
  };
  const tokens = tokensByLang[lang] || ['AI', 'automations'];

  const HighlightText = ({ text }) => {
    if (!text) return null;
    const pattern = new RegExp(
      `(${tokens.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
      'gi'
    );
    const parts = String(text).split(pattern);
    return (
      <>
        {parts.map((p, i) =>
          pattern.test(p) ? (
            <span key={i} className="text-[#007BFF] font-semibold">
              {p}
            </span>
          ) : (
            <span key={i}>{p}</span>
          )
        )}
      </>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* 1. Intro Heading Section */}
      <section className="min-h-[78vh] md:min-h-screen flex items-center justify-center py-10 md:py-20">
        <ScrollReveal className="w-full max-w-5xl px-6">
          <TiltCard className="rounded-[2.5rem] md:rounded-[4rem] border p-8 md:p-16 shadow-2xl relative overflow-hidden text-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <motion.h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}
            >
              <span className="block">
                {t('hero.build')} <span className="text-[#007BFF]">{t('hero.faster')}</span>.
              </span>
              <span className="block">
                {t('hero.automate')} <span className="text-[#007BFF]">{t('hero.everything')}</span>.
              </span>
              <span className="block">
                {t('hero.grow')} <span className="text-[#007BFF]">{t('hero.smarter')}</span>.
              </span>
            </motion.h1>
          </TiltCard>
        </ScrollReveal>
      </section>

      {/* 1b. Intro Blurb Section (Separate Frame) */}
      <section className="md:min-h-screen flex items-center justify-center py-10 md:py-20">
        <ScrollReveal className="w-full max-w-4xl px-6">
          <TiltCard className="rounded-[2rem] md:rounded-[3rem] border p-8 md:p-12 shadow-2xl relative overflow-hidden text-center group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#007BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <motion.p
              className={`text-xl md:text-3xl font-light leading-relaxed max-w-[50ch] mx-auto ${
                theme === 'dark' ? 'text-white/90' : 'text-black/80'
              }`}
            >
              <HighlightText text={t('hero.blurb')} />
            </motion.p>
          </TiltCard>
        </ScrollReveal>
      </section>

      {/* 2. Logo Section */}
      <section className="md:min-h-screen flex items-center justify-center py-10 md:py-20">
        <ScrollReveal className="w-full max-w-md px-6">
          <TiltCard className="relative p-7 md:p-8 rounded-[3rem] border shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#007BFF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={Logo2}
              alt="Optimum Tech logo"
              className="rounded-2xl w-full h-auto object-contain transform group-hover:scale-[1.05] transition-transform duration-700 shadow-2xl"
            />
          </TiltCard>
        </ScrollReveal>
      </section>

      {/* 2b. Growth & Results Section */}
      <section className="md:min-h-screen flex items-center justify-center py-10 md:py-20">
        <ScrollReveal className="w-full max-w-5xl px-6">
          <TiltCard className="rounded-[2.5rem] md:rounded-[3.5rem] border p-8 md:p-16 shadow-2xl relative overflow-hidden group">
            <GrowthGraph />
            
            <div className="relative z-10 text-left">
              <h3 className={`text-3xl md:text-5xl font-bold tracking-tight mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                {t('hero.growthTitle')}
              </h3>
              <p className={`text-lg md:text-xl font-light mb-8 md:mb-12 max-w-xl ${
                theme === 'dark' ? 'text-white/50' : 'text-black/50'
              }`}>
                {t('services.subtitle')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {[
                  { icon: TrendingUp, label: t('hero.growth1'), desc: "+40% conversion" },
                  { icon: Search, label: t('hero.growth2'), desc: "SEO Optimized" },
                  { icon: ShieldCheck, label: t('hero.growth3'), desc: "Secure & Simple" },
                  { icon: Maximize, label: t('hero.growth4'), desc: "Future Ready" },
                ].map(({ icon: Icon, label, desc }, i) => (
                  <motion.div 
                    key={i} 
                    className={`flex flex-col gap-4 p-6 md:p-8 rounded-[2rem] border transition-all duration-500 group/item ${
                      theme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-[#007BFF]/5 hover:border-[#007BFF]/30' : 'bg-gray-500/10 border-black/10 backdrop-blur-xl hover:bg-[#007BFF]/5 hover:border-[#007BFF]/30 shadow-lg'
                    }`}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#007BFF]/10 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-500">
                      <Icon className="w-7 h-7 text-[#007BFF]" />
                    </div>
                    <div>
                      <span className={`text-2xl md:text-3xl font-bold block mb-1 ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}>{label}</span>
                      <span className={`text-base font-light ${
                        theme === 'dark' ? 'text-white/40' : 'text-black/40'
                      }`}>{desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>
      </section>

      {/* 3. Buttons Section */}
      <section className="md:min-h-screen flex items-center justify-center py-10 md:py-20">
        <ScrollReveal className="w-full max-w-4xl px-6 flex flex-col items-center gap-10 md:gap-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
            <Link
              to="/contact"
              className="group relative overflow-hidden rounded-full bg-[#007BFF] px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-semibold text-white transition-all duration-300 hover:bg-[#007BFF]/90 hover:scale-[1.05] active:scale-95 shadow-xl shadow-[#007BFF]/20 w-full md:w-auto text-center"
            >
              <span className="flex items-center gap-3 justify-center">
                {t('hero.ctaStart')}
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              to="/projects"
              className={`group relative rounded-full border px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-[1.05] active:scale-95 shadow-2xl w-full md:w-auto text-center ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-white/90 hover:bg-white/10' : 'bg-gray-500/10 border-black/10 text-black/90 backdrop-blur-xl hover:bg-gray-500/20 shadow-lg'
              }`}
            >
              <span className="flex items-center gap-3 justify-center">
                <span className="w-8 h-8 rounded-full overflow-hidden border border-[#007BFF]/20">
                  <img src={Logo2} alt="Logo" className="w-full h-full object-cover" />
                </span>
                <span>{t('hero.ctaSee')}</span>
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
            {[
              { icon: Zap, label: `${t('hero.build')} ${t('hero.faster')}` },
              { icon: BarChart3, label: `${t('hero.grow')} ${t('hero.smarter')}` },
              { icon: Cpu, label: `${t('hero.automate')} ${t('hero.everything')}` },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className={`inline-flex items-center gap-2 rounded-full border px-5 md:px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10' : 'bg-gray-500/10 border-black/10 text-black/80 backdrop-blur-xl hover:bg-gray-500/20 shadow-md'
              }`}>
                <Icon className="h-4 w-4 text-[#007BFF]" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 4. Mission Section */}
      <section className="md:min-h-screen flex items-center justify-center py-10 md:py-20">
        <ScrollReveal className="w-full max-w-4xl px-6">
          <TiltCard className="rounded-[3rem] border p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#007BFF]/10 blur-[100px] rounded-full group-hover:bg-[#007BFF]/20 transition-all duration-1000" />
            <h3 className={`text-4xl md:text-5xl font-bold tracking-tight mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              {t('hero.missionTitle')}
            </h3>
            <div className={`space-y-6 text-xl font-light leading-relaxed ${
              theme === 'dark' ? 'text-white/80' : 'text-black/80'
            }`}>
              <p><HighlightText text={t('hero.mission1')} /></p>
              <p><HighlightText text={t('hero.mission2')} /></p>
              <p><HighlightText text={t('hero.mission3')} /></p>
            </div>
          </TiltCard>
        </ScrollReveal>
      </section>

      {/* 5. Vision Section */}
      <section className="md:min-h-screen flex items-center justify-center py-10 md:py-20">
        <ScrollReveal className="w-full max-w-4xl px-6">
          <TiltCard className="rounded-[3rem] border p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#007BFF]/10 blur-[100px] rounded-full group-hover:bg-[#007BFF]/20 transition-all duration-1000" />
            <h3 className={`text-4xl md:text-5xl font-bold tracking-tight mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}>
              {t('hero.visionTitle')}
            </h3>
            <div className={`space-y-6 text-xl font-light leading-relaxed ${
              theme === 'dark' ? 'text-white/70' : 'text-black/70'
            }`}>
              <p><HighlightText text={t('hero.vision1')} /></p>
              <p><HighlightText text={t('hero.vision2')} /></p>
              <p><HighlightText text={t('hero.vision3')} /></p>
            </div>
          </TiltCard>
        </ScrollReveal>
      </section>
    </div>
  );
};
