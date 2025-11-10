import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Logo2 from "../assets/Logo 2.jpeg";
import { useI18n } from "../i18n.jsx";

export const Hero = () => {
  const { t } = useI18n();
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } } };
  return (
    <motion.section className="container mx-auto flex min-h-[calc(100vh-80px)] items-center py-24 flex-col md:flex-row gap-12" variants={container} initial="hidden" animate="visible">
      <div className="max-w-3xl md:flex-1">
        <motion.h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-7xl" variants={item}>
          {t("hero.build")} <span className="text-primary">{t("hero.faster")}</span>. {t("hero.grow")} <span className="text-accent">{t("hero.smarter")}</span>. {t("hero.automate")} <span className="text-primary">{t("hero.everything")}</span>.
        </motion.h1>
        <motion.p className="mt-6 text-lg leading-8 text-gray-300 md:text-xl" variants={item}>
          {t("hero.blurb")}
        </motion.p>
        <motion.div className="mt-10 flex items-center gap-x-6" variants={item}>
          <a href="/contact" className="relative overflow-hidden rounded-md px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-300 active:scale-95 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient">
            {t("hero.ctaStart")}
          </a>
          <a href="/projects" className="group flex items-center gap-x-2 text-sm font-semibold leading-6 text-white rounded-md border border-white/10 bg-white/5 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/10">
            {t("hero.ctaSee")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
      <motion.div variants={item} className="w-full md:w-auto md:flex-1">
        <div className="relative mx-auto max-w-sm">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-xl">
            <img src={Logo2} alt="Optimum Tech secondary logo" className="rounded-lg w-full h-auto object-contain" />
          </div>
          <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-r from-primary/40 via-accent/40 to-fuchsia-500/40 opacity-30 blur-2xl animate-gradient" aria-hidden />
        </div>
      </motion.div>
    </motion.section>
  );
};
