import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, PhoneCall } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const proofPoints = [
  'Cadrage clair avant design',
  'Développement direct, sans intermédiaire opaque',
  'Mise en ligne, suivi et améliorations après livraison',
];

const featuredScreens = [
  {
    title: 'Kabamana',
    label: 'Plateforme logistique',
    image: '/projects/kabamana.jpg',
    to: '/realisations/kabamana',
  },
  {
    title: 'UFSBD 34',
    label: 'Site institutionnel',
    image: '/projects/ufsbd34.jpg',
    to: '/realisations/ufsbd34',
  },
  {
    title: 'Facturation Optimum',
    label: 'Outil métier',
    image: '/projects/facturation-optimum.jpg',
    to: '/realisations/facturation-optimum',
  },
];

const serviceShortcuts = [
  ['Site vitrine', '/creation-site-web'],
  ['Web app métier', '/application-web-sur-mesure'],
  ['SEO local', '/referencement-seo'],
  ['Automatisation sobre', '/automatisation-ia'],
];

export const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className={`relative overflow-hidden ${isDark ? 'bg-[#050607]' : 'bg-[#F7F8FA]'}`}>
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'opacity-[0.10] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)]'
            : 'opacity-[0.45] [background-image:linear-gradient(rgba(12,18,28,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(12,18,28,0.08)_1px,transparent_1px)]'
        } [background-size:44px_44px]`}
        aria-hidden="true"
      />

      <section className="relative mx-auto grid min-h-[92vh] w-full max-w-7xl items-center gap-12 px-4 pb-14 pt-28 md:px-6 md:pb-20 md:pt-36 lg:grid-cols-[1fr_0.92fr]">
        <div className="max-w-3xl">
          <div
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${
              isDark
                ? 'border-white/[0.12] bg-white/[0.06] text-white/75'
                : 'border-black/10 bg-white text-black/70 shadow-sm'
            }`}
          >
            <MapPin className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
            Optimum Tech, studio web à Sète
          </div>

          <h1
            className={`mt-7 text-4xl font-bold leading-[1.04] sm:text-5xl md:text-6xl ${
              isDark ? 'text-white' : 'text-[#111318]'
            }`}
          >
            Création de sites web et d’applications utiles pour entreprises locales
          </h1>

          <p className={`mt-6 max-w-2xl text-lg leading-8 md:text-xl ${isDark ? 'text-white/70' : 'text-black/70'}`}>
            Des pages plus claires, des parcours de contact plus simples et, quand le
            besoin le mérite, des outils métier qui font gagner du temps. Chaque projet
            part de votre offre, de vos clients et du résultat attendu.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#0A84FF] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#0A84FF]/20 transition hover:bg-[#0576e6] active:scale-[0.99]"
            >
              Demander un devis
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              to="/realisations"
              className={`inline-flex items-center justify-center gap-3 rounded-lg border px-6 py-4 text-base font-semibold transition active:scale-[0.99] ${
                isDark
                  ? 'border-white/[0.12] bg-white/[0.06] text-white hover:bg-white/[0.10]'
                  : 'border-black/10 bg-white text-black hover:border-[#0A84FF]/40'
              }`}
            >
              Voir les réalisations
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {proofPoints.map((point) => (
              <div key={point} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0A84FF]" aria-hidden="true" />
                <span className={`text-sm leading-6 ${isDark ? 'text-white/70' : 'text-black/60'}`}>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className={`relative overflow-hidden rounded-lg border ${
              isDark
                ? 'border-white/[0.12] bg-[#101318] shadow-2xl shadow-black/50'
                : 'border-black/10 bg-white shadow-2xl shadow-black/10'
            }`}
          >
            <div className={`flex items-center gap-2 border-b px-4 py-3 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className={`ml-3 text-xs font-medium ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                Réalisations récentes
              </span>
            </div>

            <Link to={featuredScreens[0].to} className="group block">
              <div className="aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={featuredScreens[0].image}
                  alt={`Aperçu du projet ${featuredScreens[0].title}`}
                  className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.02]"
                  loading="eager"
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className={`text-xs font-semibold uppercase ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                    {featuredScreens[0].label}
                  </p>
                  <p className={`mt-1 text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    {featuredScreens[0].title}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-[#0A84FF] transition group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
            </Link>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {featuredScreens.slice(1).map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className={`group overflow-hidden rounded-lg border transition hover:-translate-y-0.5 ${
                  isDark ? 'border-white/10 bg-white/[0.05]' : 'border-black/10 bg-white shadow-lg shadow-black/[0.05]'
                }`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={`Aperçu du projet ${item.title}`}
                    className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.025]"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className={`text-xs font-semibold uppercase ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                    {item.label}
                  </p>
                  <p className={`mt-1 font-bold ${isDark ? 'text-white' : 'text-black'}`}>{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`relative border-y ${isDark ? 'border-white/[0.08] bg-white/[0.03]' : 'border-black/10 bg-white/70'}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex flex-wrap gap-2">
            {serviceShortcuts.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                  isDark
                    ? 'border-white/10 text-white/70 hover:border-[#0A84FF]/40 hover:text-white'
                    : 'border-black/10 text-black/70 hover:border-[#0A84FF]/40 hover:text-black'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <a
            href="tel:+33745305113"
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
              isDark ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'
            }`}
          >
            <PhoneCall className="h-4 w-4 text-[#0A84FF]" aria-hidden="true" />
            +33 7 45 30 51 13
          </a>
        </div>
      </section>
    </header>
  );
};
