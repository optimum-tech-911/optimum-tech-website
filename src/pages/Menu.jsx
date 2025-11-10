import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { useI18n, LANG_OPTIONS } from "../i18n.jsx";
import { ArrowRight } from "lucide-react";

export const MenuPage = () => {
  const { t, lang, setLang } = useI18n();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto w-full max-w-4xl py-10">
        <div className="rounded-2xl border border-white/10 bg-primary/10 supports-[backdrop-filter]:bg-primary/10 backdrop-blur-xl p-6 shadow-2xl">
          <h1 className="text-2xl font-semibold text-white mb-6">Menu</h1>
          <div className="grid gap-3">
            <Link to="/" className="group relative flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10">
              <span>{t("nav.home")}</span>
              <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/projects" className="group relative flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10">
              <span>{t("nav.projects")}</span>
              <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/contact" className="group relative flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10">
              <span>{t("nav.contact")}</span>
              <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/policy" className="group relative flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10">
              <span>{t("nav.policy")}</span>
              <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="mt-8">
            <h2 className="text-white font-semibold mb-3">Language</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLang(opt.code)}
                  className={`px-3 py-2 rounded-md text-sm border ${
                    lang === opt.code ? 'border-primary/60 bg-white/10 text-white' : 'border-white/10 text-gray-200 hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

