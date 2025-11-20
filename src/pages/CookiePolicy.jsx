import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO.jsx";

export const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO path="/cookie-policy" title="Politique de Cookies – Optimum Tech" description="En savoir plus sur les cookies utilisés par Optimum Tech et vos choix en matière de consentement selon le RGPD." />
      <Navbar />
      <main className="container mx-auto max-w-3xl px-6 py-16 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Politique de Cookies</h1>
        <p className="text-gray-300">Contenu à venir…</p>
      </main>
      <Footer />
    </div>
  );
};