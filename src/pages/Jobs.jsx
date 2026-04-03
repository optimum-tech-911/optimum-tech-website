import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeEuro,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Database,
  Handshake,
  Mail,
  MessageCircle,
  PhoneCall,
  Shield,
  Target,
  Users,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO.jsx';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../i18n.jsx';

const contentByLang = {
  fr: {
    seoTitle: 'Jobs | Optimum Tech',
    seoDescription:
      "Profitez des opportunites chez Optimum Tech comme agent commercial, agent telephonique, apporteur d'affaires ou developpeur specialise.",
    badge: 'Business development',
    title: 'Profitez de nos opportunites.',
    subtitle:
      "Nous ouvrons plusieurs opportunites pour des profils commerciaux, reseau et techniques qui veulent evoluer avec Optimum Tech autour de nos services, applications, solutions web, developpement backend et cybersecurite.",
    primaryCta: 'Postuler via la page contact',
    secondaryCta: 'Discuter sur WhatsApp',
    introTitle: 'Des opportunites concretes',
    introBody:
      "Nous recherchons des personnes capables de vendre, prospecter, ouvrir leur reseau ou renforcer notre execution technique. Certaines missions sont basees sur la performance, d autres peuvent evoluer vers une collaboration plus structuree.",
    highlights: [
      'Missions commerciales et techniques',
      'Collaboration flexible selon le profil',
      'Recompenses, commissions ou evolution selon les resultats',
    ],
    rolesTitle: 'Offres ouvertes',
    roles: [
      {
        icon: BriefcaseBusiness,
        title: 'Agent commercial',
        tag: 'Prospection terrain et digitale',
        description:
          "Vous prospectez nos services et nos applications aupres de clients potentiels, creez des opportunites et nous aidez a transformer les besoins en contrats.",
        responsibilities: [
          'Prospecter entreprises, commercants et porteurs de projet',
          'Presenter nos services web, logiciels, IA et applications',
          'Qualifier les besoins et generer des rendez-vous utiles',
          'Suivre les opportunites commerciales avec serieux',
        ],
        profile: [
          'Aisance commerciale et gout du resultat',
          'Bonne presentation et communication claire',
          'Interet reel pour la vente de services digitaux',
        ],
      },
      {
        icon: PhoneCall,
        title: 'Agent telephonique',
        tag: 'Telephone, email, relance',
        description:
          "Vous prospectez principalement par telephone, email et suivi commercial afin de generer des rendez-vous et faire avancer les discussions avec les prospects.",
        responsibilities: [
          'Appeler des prospects et suivre les leads',
          'Envoyer des emails et relances structurees',
          'Qualifier l interet avant transmission',
          'Tenir un suivi propre des echanges et des reponses',
        ],
        profile: [
          'Bonne diction et aisance au telephone',
          'Patience, rigueur et constance',
          'Capacite a convaincre sans etre agressif',
        ],
      },
      {
        icon: Building2,
        title: "Business owners / apporteurs d'affaires",
        tag: 'Reseau et recommandations',
        description:
          "Vous etes chef d entreprise ou bien connecte dans votre secteur et pouvez nous recommander a des contacts utiles en echange de recompenses et d une collaboration legere.",
        responsibilities: [
          'Nous mettre en relation avec des contacts qualifiees',
          'Recommander nos services a votre reseau',
          'Identifier des besoins business simples et concrets',
          'Faire une prospection legere quand une opportunite se presente',
        ],
        profile: [
          'Bon carnet d adresses ou forte credibilite locale',
          'Sens du relationnel et confiance naturelle',
          'Interet pour un modele simple avec rewards sur apport',
        ],
      },
      {
        icon: Database,
        title: 'Developpeur backend',
        tag: 'Execution technique',
        description:
          "Vous participez a la conception et au developpement de la partie serveur de nos projets, API, logiques metier et integrations techniques.",
        responsibilities: [
          'Developper des APIs et logiques backend propres',
          'Travailler sur les bases de donnees et integrations',
          'Assurer performance, maintenabilite et securite',
          'Collaborer avec les besoins produit et business',
        ],
        profile: [
          'Bonne base backend et architecture applicative',
          'Esprit propre, rigoureux et autonome',
          'Capacite a livrer des solutions stables',
        ],
      },
      {
        icon: Shield,
        title: 'Developpeur cybersecurite',
        tag: 'Protection et securisation',
        description:
          "Vous nous aidez a renforcer la securite de nos produits, workflows et environnements, avec une approche preventive et concrete.",
        responsibilities: [
          'Participer a la securisation des applications et services',
          'Identifier failles, risques et points faibles',
          'Proposer des correctifs et bonnes pratiques',
          'Contribuer a une culture de securite dans les projets',
        ],
        profile: [
          'Sensibilite forte a la securite applicative',
          'Esprit d analyse et reflexes defensifs',
          'Volonte de construire des solutions robustes',
        ],
      },
    ],
    fitTitle: 'Ce que nous recherchons',
    fitItems: [
      'Des profils serieux, autonomes et utiles',
      'Des personnes capables de creer une vraie valeur',
      'Des commerciaux orientes opportunites et conversion',
      'Des profils techniques solides et fiables',
    ],
    processTitle: 'Comment postuler',
    processItems: [
      'Envoyez votre profil, votre experience et votre zone geographique',
      'Precisez le poste qui vous interesse',
      'Ajoutez vos langues, secteurs et disponibilite',
      'Si vous avez des resultats, contacts ou references, mentionnez-les clairement',
    ],
    finalTitle: 'Une approche plus forte pour recruter',
    finalBody:
      "Cette page fonctionne mieux si elle vend une opportunite plutot qu une demande d aide. Elle positionne Optimum Tech comme un endroit ou des profils commerciaux et techniques peuvent gagner, evoluer et profiter d un vrai potentiel.",
    finalPoints: [
      'Affichez un systeme de reward ou commission tres simple',
      'Mettez en avant vos services les plus faciles a vendre',
      'Demandez le poste vise des le premier contact',
    ],
  },
  en: {
    seoTitle: 'Jobs | Optimum Tech',
    seoDescription:
      'Explore opportunities at Optimum Tech as a sales agent, phone agent, referral partner, backend developer, or cybersecurity developer.',
    badge: 'Business development',
    title: 'Take advantage of our opportunities.',
    subtitle:
      'We are opening multiple opportunities for commercial, network-driven, and technical profiles who want to grow with Optimum Tech around our services, apps, backend development, and cybersecurity work.',
    primaryCta: 'Apply via contact page',
    secondaryCta: 'Talk on WhatsApp',
    introTitle: 'Real opportunities',
    introBody:
      'We are looking for people who can sell, prospect, activate their network, or strengthen our technical delivery. Some roles are performance-based, while others can evolve into deeper collaboration.',
    highlights: [
      'Commercial and technical openings',
      'Flexible collaboration depending on the role',
      'Rewards, commissions, or growth based on results',
    ],
    rolesTitle: 'Open roles',
    roles: [
      {
        icon: BriefcaseBusiness,
        title: 'Sales agent',
        tag: 'Field and digital prospecting',
        description:
          'You prospect our services and apps to potential clients, create opportunities, and help turn needs into signed projects.',
        responsibilities: [
          'Prospect businesses, merchants, and project owners',
          'Present our web, software, AI, and app services',
          'Qualify needs and generate useful meetings',
          'Follow commercial opportunities seriously',
        ],
        profile: [
          'Strong commercial instincts and results focus',
          'Clear communication and confident presence',
          'Real interest in selling digital services',
        ],
      },
      {
        icon: PhoneCall,
        title: 'Phone agent',
        tag: 'Phone, email, follow-up',
        description:
          'You prospect mainly through phone calls, email, and follow-up sequences in order to generate meetings and move leads forward.',
        responsibilities: [
          'Call prospects and follow up leads',
          'Send structured emails and reminders',
          'Qualify interest before handoff',
          'Keep clean tracking of exchanges and replies',
        ],
        profile: [
          'Clear speaking skills and phone confidence',
          'Patience, discipline, and consistency',
          'Ability to persuade without sounding aggressive',
        ],
      },
      {
        icon: Handshake,
        title: 'Business owners / referral partners',
        tag: 'Network and recommendations',
        description:
          'You are a business owner or a well-connected profile and can introduce us to useful contacts in exchange for rewards and light prospecting collaboration.',
        responsibilities: [
          'Introduce us to qualified contacts',
          'Recommend our services to your network',
          'Spot simple and concrete business needs',
          'Do light prospecting when a good opportunity appears',
        ],
        profile: [
          'Strong network or trusted local presence',
          'Good relationship skills and credibility',
          'Interest in a simple reward-based model',
        ],
      },
      {
        icon: Database,
        title: 'Backend developer',
        tag: 'Technical execution',
        description:
          'You help design and build the server side of our projects, APIs, business logic, and technical integrations.',
        responsibilities: [
          'Build APIs and clean backend logic',
          'Work on databases and integrations',
          'Ensure performance, maintainability, and security',
          'Collaborate with product and business needs',
        ],
        profile: [
          'Solid backend and application architecture foundations',
          'Clean, rigorous, and autonomous mindset',
          'Ability to ship stable solutions',
        ],
      },
      {
        icon: Shield,
        title: 'Cybersecurity developer',
        tag: 'Protection and hardening',
        description:
          'You help strengthen the security of our products, workflows, and environments with a practical and preventive mindset.',
        responsibilities: [
          'Contribute to securing applications and services',
          'Identify vulnerabilities, risks, and weak points',
          'Recommend fixes and good practices',
          'Support a stronger security culture across projects',
        ],
        profile: [
          'Strong sensitivity to application security',
          'Analytical mindset and defensive instincts',
          'Motivation to build robust systems',
        ],
      },
    ],
    fitTitle: 'What we are looking for',
    fitItems: [
      'Serious, autonomous, and useful profiles',
      'People who can create real value',
      'Commercial profiles focused on opportunity and conversion',
      'Technical profiles who are solid and reliable',
    ],
    processTitle: 'How to apply',
    processItems: [
      'Send your profile, experience, and geographic area',
      'Tell us which role you want',
      'Add your languages, sectors, and availability',
      'If you have results, contacts, or references, mention them clearly',
    ],
    finalTitle: 'A stronger recruiting angle',
    finalBody:
      'This page works better when it sells an opportunity rather than asking for help. It positions Optimum Tech as a place where commercial and technical profiles can win, grow, and benefit from real upside.',
    finalPoints: [
      'Show a very simple reward or commission model',
      'Highlight the services that are easiest to sell',
      'Ask for the target role from the first contact',
    ],
  },
};

const roleCardBase =
  'rounded-[2rem] border p-8 md:p-10 h-full relative overflow-hidden transition-all duration-500';

export const JobsPage = () => {
  const { theme } = useTheme();
  const { lang } = useI18n();
  const copy = contentByLang[lang] || contentByLang.en;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex flex-col relative overflow-x-hidden ${
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
      }`}
    >
      <SEO path="/jobs" title={copy.seoTitle} description={copy.seoDescription} />
      <Navbar />

      <main className="flex-grow relative z-10">
        <section className="container mx-auto px-6 pt-32 pb-16">
          <ScrollReveal className="relative overflow-hidden rounded-[3rem] border px-8 py-12 md:px-14 md:py-16 shadow-2xl">
            <div
              className={`absolute inset-0 ${
                theme === 'dark'
                  ? 'bg-[radial-gradient(circle_at_top_left,_rgba(0,123,255,0.24),_transparent_38%),linear-gradient(135deg,#0d1117_0%,#050505_100%)]'
                  : 'bg-[radial-gradient(circle_at_top_left,_rgba(0,123,255,0.16),_transparent_38%),linear-gradient(135deg,#ffffff_0%,#eef4ff_100%)]'
              }`}
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#007BFF]/20 bg-[#007BFF]/10 px-4 py-2 text-sm font-semibold text-[#007BFF]">
                  <Target className="h-4 w-4" />
                  {copy.badge}
                </span>
                <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tighter md:text-7xl">
                  {copy.title}
                </h1>
                <p
                  className={`mt-6 max-w-3xl text-lg leading-relaxed md:text-2xl ${
                    theme === 'dark' ? 'text-white/68' : 'text-black/65'
                  }`}
                >
                  {copy.subtitle}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-[#007BFF] px-8 py-4 text-base font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#007BFF]/90"
                  >
                    <Mail className="h-5 w-5" />
                    {copy.primaryCta}
                  </Link>
                  <a
                    href="https://wa.me/33745305113?text=Hello%20Optimum%20Tech%2C%20I%20am%20interested%20in%20your%20jobs%20page."
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center justify-center gap-3 rounded-full border px-8 py-4 text-base font-semibold transition-all hover:scale-[1.02] ${
                      theme === 'dark'
                        ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                        : 'border-black/10 bg-white/70 text-black hover:bg-white'
                    }`}
                  >
                    <MessageCircle className="h-5 w-5" />
                    {copy.secondaryCta}
                  </a>
                </div>
              </div>

              <div
                className={`rounded-[2rem] border p-8 backdrop-blur-xl ${
                  theme === 'dark'
                    ? 'border-white/10 bg-white/5'
                    : 'border-black/10 bg-white/70 shadow-xl'
                }`}
              >
                <h2 className="text-xl font-semibold tracking-tight">{copy.introTitle}</h2>
                <p
                  className={`mt-4 text-base leading-relaxed ${
                    theme === 'dark' ? 'text-white/65' : 'text-black/60'
                  }`}
                >
                  {copy.introBody}
                </p>
                <div className="mt-6 space-y-3">
                  {copy.highlights.map((item) => (
                    <div
                      key={item}
                      className={`flex items-start gap-3 rounded-2xl border px-4 py-4 ${
                        theme === 'dark'
                          ? 'border-white/10 bg-black/20'
                          : 'border-black/10 bg-black/[0.03]'
                      }`}
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#007BFF]" />
                      <p className={theme === 'dark' ? 'text-white/75' : 'text-black/70'}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="container mx-auto px-6 py-8">
          <ScrollReveal className="mb-10">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-[#007BFF]" />
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{copy.rolesTitle}</h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-2">
            {copy.roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <ScrollReveal key={role.title} delay={index * 0.08}>
                  <article
                    className={`${roleCardBase} ${
                      theme === 'dark'
                        ? 'border-white/10 bg-white/5'
                        : 'border-black/10 bg-white/70 shadow-xl'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/10 via-transparent to-transparent opacity-80" />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#007BFF]/15 text-[#007BFF]">
                            <Icon className="h-7 w-7" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#007BFF]">
                              {role.tag}
                            </p>
                            <h3 className="mt-1 text-2xl font-bold tracking-tight">{role.title}</h3>
                          </div>
                        </div>
                        <BadgeEuro className="h-6 w-6 flex-shrink-0 text-[#007BFF]/70" />
                      </div>
                      <p
                        className={`mt-6 text-base leading-relaxed ${
                          theme === 'dark' ? 'text-white/68' : 'text-black/65'
                        }`}
                      >
                        {role.description}
                      </p>

                      <div className="mt-8 grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#007BFF]">
                            Responsibilities
                          </h4>
                          <ul className="mt-4 space-y-3">
                            {role.responsibilities.map((item) => (
                              <li
                                key={item}
                                className={`flex gap-3 text-sm leading-relaxed ${
                                  theme === 'dark' ? 'text-white/72' : 'text-black/70'
                                }`}
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#007BFF]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#007BFF]">
                            Ideal profile
                          </h4>
                          <ul className="mt-4 space-y-3">
                            {role.profile.map((item) => (
                              <li
                                key={item}
                                className={`flex gap-3 text-sm leading-relaxed ${
                                  theme === 'dark' ? 'text-white/72' : 'text-black/70'
                                }`}
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#007BFF]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <section className="container mx-auto grid gap-8 px-6 py-16 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal>
            <div
              className={`rounded-[2.5rem] border p-8 md:p-10 ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5'
                  : 'border-black/10 bg-white/70 shadow-xl'
              }`}
            >
              <h2 className="text-3xl font-bold tracking-tight">{copy.fitTitle}</h2>
              <div className="mt-6 space-y-4">
                {copy.fitItems.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#007BFF]" />
                    <p className={theme === 'dark' ? 'text-white/72' : 'text-black/70'}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div
              className={`rounded-[2.5rem] border p-8 md:p-10 ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5'
                  : 'border-black/10 bg-white/70 shadow-xl'
              }`}
            >
              <h2 className="text-3xl font-bold tracking-tight">{copy.processTitle}</h2>
              <div className="mt-6 space-y-4">
                {copy.processItems.map((item) => (
                  <div key={item} className="flex gap-3">
                    <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-[#007BFF]" />
                    <p className={theme === 'dark' ? 'text-white/72' : 'text-black/70'}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section className="container mx-auto px-6 pb-20">
          <ScrollReveal>
            <div
              className={`relative overflow-hidden rounded-[3rem] border p-10 md:p-14 ${
                theme === 'dark'
                  ? 'border-white/10 bg-[linear-gradient(135deg,rgba(0,123,255,0.16),rgba(255,255,255,0.04))]'
                  : 'border-black/10 bg-[linear-gradient(135deg,rgba(0,123,255,0.12),rgba(255,255,255,0.95))] shadow-xl'
              }`}
            >
              <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">
                {copy.finalTitle}
              </h2>
              <p
                className={`mt-5 max-w-3xl text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-white/70' : 'text-black/70'
                }`}
              >
                {copy.finalBody}
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {copy.finalPoints.map((item) => (
                  <div
                    key={item}
                    className={`rounded-[1.75rem] border p-5 ${
                      theme === 'dark'
                        ? 'border-white/10 bg-black/20'
                        : 'border-black/10 bg-white/70'
                    }`}
                  >
                    <p className="text-sm font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-semibold transition-all hover:scale-[1.02] ${
                    theme === 'dark'
                      ? 'bg-white text-black'
                      : 'bg-black text-white'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  {copy.primaryCta}
                </Link>
                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center gap-3 rounded-full border px-7 py-4 text-sm font-semibold transition-all hover:scale-[1.02] ${
                    theme === 'dark'
                      ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                      : 'border-black/10 bg-white/70 text-black hover:bg-white'
                  }`}
                >
                  Contact page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </div>
  );
};
