import { ArrowLeft, Home, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer.jsx';
import { Navbar } from '../components/Navbar.jsx';
import { SEO } from '../components/SEO.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export const NotFoundPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'}`}>
      <SEO
        path="/404"
        title="Page introuvable | Optimum Tech"
        description="Cette page n’existe pas ou a été déplacée. Retrouvez les services, réalisations et ressources d’Optimum Tech."
        robots="noindex, follow"
      />
      <Navbar />
      <main className="flex flex-1 items-center px-4 pb-16 pt-32 md:px-6">
        <section className={`mx-auto w-full max-w-4xl overflow-hidden rounded-[2.5rem] border p-8 text-center md:p-14 ${
          theme === 'dark'
            ? 'border-white/10 bg-white/5'
            : 'border-black/10 bg-white/80 shadow-xl'
        }`}>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A84FF]/15 text-[#0A84FF]">
            <Search className="h-7 w-7" aria-hidden="true" />
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#0A84FF]">Erreur 404</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">Cette page reste introuvable.</h1>
          <p className={`mx-auto mt-5 max-w-2xl text-base leading-8 md:text-lg ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
            Le lien est peut-être ancien ou l’adresse comporte une erreur. Vous pouvez revenir à l’accueil ou explorer nos services.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0A84FF] px-6 py-3 font-semibold text-white transition hover:bg-[#0A84FF]/90">
              <Home className="h-4 w-4" aria-hidden="true" />
              Retour à l’accueil
            </Link>
            <Link to="/services" className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-semibold transition ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5 hover:bg-white/10'
                : 'border-black/10 bg-black/5 hover:bg-black/10'
            }`}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voir les services
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
