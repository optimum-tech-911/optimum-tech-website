import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { useTheme } from '../context/ThemeContext';

export const PrivacyPolicy = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
    }`}>
      <SEO
        path="/privacy-policy"
        title="Politique de Confidentialité – Optimum Tech"
        description="Découvrez comment Optimum Tech protège vos données personnelles conformément au RGPD."
        robots="noindex, follow"
      />
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 py-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter text-[#007BFF]">Politique de Confidentialité</h1>
        <div className={`space-y-6 text-lg font-light leading-relaxed ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          <p>Cette page sera complétée avec le détail des traitements, finalités, durées de conservation et droits des personnes conformément au RGPD.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
