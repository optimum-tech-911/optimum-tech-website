import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Cpu, BarChart3 } from 'lucide-react';
import Logo2 from '../assets/Logo 2.jpeg';
import { useI18n } from '../i18n.jsx';

// SparkCanvas removed — not used in current UI to avoid unused-variable lint errors.

export const Hero = () => {
  const { t, lang } = useI18n();
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
  };
  const tokensByLang = {
    fr: ['IA', 'automatisations'],
    en: ['AI', 'automations'],
    es: ['IA', 'automatizaciones'],
    ar: ['الذكاء الاصطناعي', 'الأتمتة'],
  };
  const tokens = tokensByLang[lang] || ['AI', 'automations'];
  const HighlightText = ({ text }) => {
    const pattern = new RegExp(
      `(${tokens.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
      'gi'
    );
    const parts = String(text).split(pattern);
    return (
      <>
        {parts.map((p, i) =>
          pattern.test(p) ? (
            <span key={i} className="text-[#007BFF]">
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
    <motion.section
      className="container mx-auto grid grid-cols-12 min-h-[calc(100vh-80px)] items-center py-24 gap-8 md:gap-12 z-10"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="col-span-12 md:col-span-7 max-w-[75ch] md:rounded-2xl md:border md:border-white/10 md:bg-white/5 md:backdrop-blur supports-[backdrop-filter]:md:bg-white/10 md:p-6">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white inline-block rounded-xl border border-white/10 bg-[#0A1A2F]/40 supports-[backdrop-filter]:bg-[#0A1A2F]/30 backdrop-blur px-2 py-2 md:bg-transparent md:border-transparent md:border-0"
          variants={item}
        >
          <span className="md:block inline whitespace-nowrap">
            {t('hero.build')} <span className="text-[#007BFF]">{t('hero.faster')}</span>.
          </span>
          <span className="md:block inline whitespace-nowrap ml-2">
            {t('hero.automate')} <span className="text-[#007BFF]">{t('hero.everything')}</span>.
          </span>
          <span className="block">
            {t('hero.grow')} <span className="text-[#007BFF]">{t('hero.smarter')}</span>.
          </span>
        </motion.h1>
        <motion.p
          className="mt-6 inline-block rounded-xl border border-white/10 bg-black/30 supports-[backdrop-filter]:bg-black/20 backdrop-blur px-3 py-2 text-base md:text-xl leading-relaxed text-white electric-text"
          variants={item}
        >
          {t('hero.blurb')}
        </motion.p>
        <motion.div className="mt-6 flex flex-wrap items-center gap-2" variants={item}>
          {[
            { icon: Zap, label: `${t('hero.build')} ${t('hero.faster')}` },
            { icon: BarChart3, label: `${t('hero.grow')} ${t('hero.smarter')}` },
            { icon: Cpu, label: `${t('hero.automate')} ${t('hero.everything')}` },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} className={i === 2 ? 'mt-2 basis-full' : ''}>
              <div
                className={`inline-flex items-center gap-2 rounded-full border border-white/15 px-4 md:px-5 py-1.5 text-xs md:text-sm whitespace-nowrap bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 animate-gradient w-fit`}
              >
                <Icon className="h-4 w-4 text-white" />
                <span className="text-white">{label}</span>
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div className="mt-10 flex items-center gap-x-3" variants={item}>
          <Link
            to="/contact"
            className="relative overflow-hidden rounded-full border border-white/15 px-4 py-2.5 text-sm md:text-sm font-semibold text-white shadow-sm transition-transform duration-300 active:scale-95 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient md:px-6 md:py-3 md:bg-white/10 md:backdrop-blur supports-[backdrop-filter]:md:bg-white/15 whitespace-nowrap btn-electric btn-heartbeat btn-spectrum"
          >
            {t('hero.ctaStart')}
            <ArrowRight className="inline-block ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/projects"
            className="group flex items-center gap-x-2 text-sm md:text-sm font-semibold leading-6 text-white rounded-full border px-4 py-2.5 md:px-5 md:py-2 backdrop-blur supports-[backdrop-filter]:bg-white/10 md:bg-white/10 whitespace-nowrap btn-golden btn-clockbeat"
          >
            <span className="logo-dot">
              <img src={Logo2} alt="Optimum Tech logo" className="w-full h-full object-cover" />
            </span>
            <span>{t('hero.ctaSee')}</span>
          </Link>
        </motion.div>
        <div className="mt-8 glass-base glass-blue-darker rounded-2xl p-4 glass-blur-2 glass-border-light">
          <h3 className="text-3xl md:text-4xl font-bold electric-blue-glow">
            {t('hero.missionTitle')}
          </h3>
          <p className="mt-3 text-sm md:text-base text-white">
            <HighlightText text={t('hero.mission1')} />
          </p>
          <p className="mt-2 text-sm md:text-base text-white">
            <HighlightText text={t('hero.mission2')} />
          </p>
          <p className="mt-2 text-sm md:text-base text-white">
            <HighlightText text={t('hero.mission3')} />
          </p>
        </div>
      </div>
      <motion.div variants={item} className="col-span-12 md:col-span-5 w-full md:w-auto">
        <div className="relative mx-auto w-full max-w-md md:max-w-sm">
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-xl">
            <div className="logo-golden-wave" aria-hidden />
            <img
              src={Logo2}
              alt="Optimum Tech secondary logo"
              className="relative z-10 rounded-lg w-full h-auto object-contain"
            />
          </div>
          <div className="mt-6 rounded-2xl p-4 glass-blur-2 glass-border-light bg-black/30 supports-[backdrop-filter]:bg-black/20 glass-heartbeat">
            <h3 className="text-3xl md:text-4xl font-bold electric-blue-glow">
              {t('hero.visionTitle')}
            </h3>
            <p className="mt-3 text-sm md:text-base text-white">
              <HighlightText text={t('hero.vision1')} />
            </p>
            <p className="mt-2 text-sm md:text-base text-white">
              <HighlightText text={t('hero.vision2')} />
            </p>
            <p className="mt-2 text-sm md:text-base text-white">
              <HighlightText text={t('hero.vision3')} />
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
