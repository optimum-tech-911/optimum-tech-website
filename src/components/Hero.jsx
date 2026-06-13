import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

const SoftCard = ({ children, className = '' }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${className} transition-colors duration-500 ${
        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-500/10 border-black/10 backdrop-blur-2xl shadow-2xl'
      }`}
    >
      <div>
        {children}
      </div>
    </div>
  );
};

export const Hero = () => {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const proof = [
    'Cadrage et devis transparents',
    'Échange direct avec le développeur',
    'Conception, mise en ligne et suivi',
  ];

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <section className="flex min-h-[82vh] items-center justify-center pb-12 pt-28 md:pb-16 md:pt-36">
        <ScrollReveal className="w-full max-w-6xl px-6">
          <SoftCard className="rounded-[2.5rem] md:rounded-[4rem] border p-8 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/8 via-transparent to-transparent opacity-80" />
            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="inline-flex rounded-full border border-[#007BFF]/20 bg-[#007BFF]/10 px-4 py-2 text-sm font-semibold text-[#007BFF]">
                  Sète, Hérault, Occitanie, France
                </div>
                <motion.h1
                  className={`mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                >
                  Sites web et applications sur mesure pour faire avancer votre entreprise
                </motion.h1>
                <motion.p
                  className={`mt-6 max-w-2xl text-lg md:text-2xl font-light leading-relaxed ${
                    theme === 'dark' ? 'text-white/78' : 'text-black/75'
                  }`}
                >
                  Depuis Sète, Optimum Tech conçoit des sites professionnels, des applications
                  web, des outils métier et des automatisations utiles. Chaque projet vise un
                  résultat concret : mieux présenter votre offre, obtenir plus de demandes ou
                  simplifier vos opérations.
                </motion.p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#007BFF] px-8 py-4 text-base md:text-lg font-semibold text-white transition-all duration-300 hover:bg-[#007BFF]/90 hover:scale-[1.012] active:scale-[0.985] shadow-xl shadow-[#007BFF]/20"
                  >
                    Demander un devis
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    to="/services"
                    className={`inline-flex items-center justify-center gap-3 rounded-full border px-8 py-4 text-base md:text-lg font-semibold transition-all duration-300 hover:scale-[1.012] active:scale-[0.985] ${
                      theme === 'dark'
                        ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        : 'bg-white/70 border-black/10 text-black hover:bg-white shadow-lg'
                    }`}
                  >
                    Explorer nos solutions
                  </Link>
                </div>
              </div>

              <div className="grid gap-4">
                {proof.map((item) => (
                  <div
                    key={item}
                    className={`rounded-[1.75rem] border px-5 py-5 ${
                      theme === 'dark'
                        ? 'border-white/10 bg-white/5'
                        : 'border-black/10 bg-white/70 shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#007BFF]/15">
                        <CheckCircle2 className="h-5 w-5 text-[#007BFF]" aria-hidden="true" />
                      </div>
                      <p className={`text-sm md:text-base font-medium ${theme === 'dark' ? 'text-white/85' : 'text-black/85'}`}>
                        {item}
                      </p>
                    </div>
                  </div>
                ))}

                <div
                  className={`rounded-[2rem] border p-6 ${
                    theme === 'dark'
                      ? 'border-white/10 bg-white/5'
                      : 'border-black/10 bg-white/70 shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 rounded-2xl overflow-hidden border border-[#007BFF]/20">
                      <img src="/apple-touch-icon.png" alt="" width="48" height="48" className="h-full w-full object-cover" />
                    </span>
                    <div>
                      <p className={`text-sm uppercase tracking-[0.22em] ${theme === 'dark' ? 'text-white/45' : 'text-black/45'}`}>
                        Optimum Tech
                      </p>
                      <p className={`mt-1 text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                        Sites web, applications et solutions digitales utiles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SoftCard>
        </ScrollReveal>
      </section>

      <section className="pb-8 md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-6">
          <a
            href="tel:+33745305113"
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
                : 'border-black/10 bg-white/70 text-black/80 hover:bg-white'
            }`}
          >
            <PhoneCall className="h-4 w-4 text-[#007BFF]" />
            +33 7 45 30 51 13
          </a>
          <Link
            to="/realisations"
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
                : 'border-black/10 bg-white/70 text-black/80 hover:bg-white'
            }`}
          >
            Voir nos réalisations
          </Link>
        </div>
      </section>
    </div>
  );
};
