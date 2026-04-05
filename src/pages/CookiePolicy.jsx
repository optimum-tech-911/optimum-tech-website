import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { useTheme } from '../context/ThemeContext';

export const CookiePolicy = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
    }`}>
      <SEO
        path="/cookie-policy"
        title="Politique de Cookies – Optimum Tech"
        description="En savoir plus sur les cookies utilisés par Optimum Tech et vos choix en matière de consentement selon le RGPD."
        robots="noindex, follow"
      />
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 py-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter text-[#007BFF]">Politique de Cookies</h1>
        <div className={`space-y-6 text-lg font-light leading-relaxed ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          <p>Cette page sera complétée avec le détail des cookies, de leurs finalités et des moyens de gestion du consentement sur le site.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
