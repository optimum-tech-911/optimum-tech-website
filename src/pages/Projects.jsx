import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProjectCard } from "../components/ProjectCard";
import { motion } from "framer-motion";
import { useI18n } from "../i18n.jsx";

export const Projects = () => {
  const { t } = useI18n();
  const projects = [
    { title: "UFSBD34.fr", desc: "Dental Association Website", href: "https://ufsbd34.fr" },
    { title: "CandyPlanet.fr", desc: "Sweet Shop E-Commerce", href: "https://candyplanet.fr" },
    { title: "Abdessamed.pages.dev", desc: "Personal Portfolio / Dev Site", href: "https://abdessamed.pages.dev/" },
    { title: "Marcellino Mockup", desc: "Design mockup preview", href: "https://marcellino-mockup.pages.dev/" },
    { title: "Abattoire Seddik", desc: "Business site preview", href: "https://abattoire-seddik.pages.dev/" },
    { title: "Sweet Serve Admin", desc: "Admin dashboard preview", href: "https://sweet-serve-admin1.pages.dev/" },
    { title: "Carioca Artisan Orders", desc: "Orders portal preview", href: "https://carioca-artisan-orders.pages.dev/" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto w-full max-w-6xl py-16">
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
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
            {projects.map((p) => (
              <motion.div
                key={p.title}
                variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
                className="snap-center shrink-0 w-[86%]"
              >
                <ProjectCard {...p} />
              </motion.div>
            ))}
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
