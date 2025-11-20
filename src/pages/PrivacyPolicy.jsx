import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO.jsx";

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO path="/privacy-policy" title="Politique de Confidentialité – Optimum Tech" description="Découvrez comment Optimum Tech protège vos données personnelles conformément au RGPD." />
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 py-16 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Politique de Confidentialité</h1>
        <p className="text-gray-300">Contenu à venir…</p>
      </main>
      <Footer />
    </div>
  );
};