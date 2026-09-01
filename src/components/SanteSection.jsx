import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck2,
  MapPin,
  Monitor,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import cabinetDesktopAvif from '../assets/sante/cabinet-dentaire-desktop.avif';
import cabinetDesktopJpg from '../assets/sante/cabinet-dentaire-desktop.jpg';
import cabinetMobileAvif from '../assets/sante/cabinet-dentaire-mobile.avif';
import cabinetMobileJpg from '../assets/sante/cabinet-dentaire-mobile.jpg';
import imagingDesktopAvif from '../assets/sante/imagerie-dentaire-desktop.avif';
import imagingDesktopJpg from '../assets/sante/imagerie-dentaire-desktop.jpg';
import imagingMobileAvif from '../assets/sante/imagerie-dentaire-mobile.avif';
import imagingMobileJpg from '../assets/sante/imagerie-dentaire-mobile.jpg';

const features = [
  {
    number: '01',
    title: 'Plateforme digitale',
    description:
      'Des plateformes modernes, rapides et pensées sur mesure pour présenter votre cabinet et offrir une expérience fluide à vos patients.',
    tags: ['Design sur mesure', 'Mobile', 'Performance'],
    icon: Monitor,
  },
  {
    number: '02',
    title: 'Visibilité locale',
    description:
      'Une architecture et des contenus pensés pour renforcer votre présence sur les recherches locales pertinentes.',
    tags: ['SEO Local', 'Google Business', 'Pages traitements'],
    icon: MapPin,
  },
  {
    number: '03',
    title: 'Prise de rendez-vous',
    description:
      'Un parcours clair pour transformer vos visiteurs en demandes de rendez-vous et les orienter vers vos outils existants.',
    tags: ['Doctolib', 'Formulaires', 'Conversion'],
    icon: CalendarCheck2,
  },
  {
    number: '04',
    title: 'Croissance continue',
    description:
      'Mesure, avis patients et automatisations pour faire évoluer votre présence digitale dans le temps.',
    tags: ['Analytics', 'Avis Google', 'Automatisation'],
    icon: TrendingUp,
  },
];

const ResponsiveSanteImage = ({
  desktopAvif,
  desktopJpg,
  mobileAvif,
  mobileJpg,
  alt,
  className,
  sizes,
}) => (
  <picture className="block h-full w-full">
    <source media="(max-width: 639px)" type="image/avif" srcSet={mobileAvif} />
    <source media="(max-width: 639px)" srcSet={mobileJpg} />
    <source type="image/avif" srcSet={desktopAvif} />
    <img
      src={desktopJpg}
      alt={alt}
      width="1440"
      height="810"
      loading="lazy"
      decoding="async"
      sizes={sizes}
      className={className}
    />
  </picture>
);

export const SanteSection = () => (
  <section
    id="sante"
    aria-labelledby="sante-heading"
    className="relative isolate overflow-hidden border-b border-white/10 bg-[#05080c] text-white"
  >
    <div className="absolute inset-x-0 top-0 h-[60rem] overflow-hidden sm:h-[54rem] lg:h-[52rem]">
      <ResponsiveSanteImage
        desktopAvif={cabinetDesktopAvif}
        desktopJpg={cabinetDesktopJpg}
        mobileAvif={cabinetMobileAvif}
        mobileJpg={cabinetMobileJpg}
        alt="Cabinet dentaire moderne équipé d’outils numériques"
        sizes="100vw"
        className="h-full w-full scale-[1.18] object-cover object-[58%_center] sm:scale-100 sm:object-center lg:object-[68%_center]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#05080c_0%,rgba(5,8,12,0.95)_13%,rgba(5,8,12,0.78)_40%,rgba(5,8,12,0.08)_69%,#05080c_100%)] lg:bg-[linear-gradient(90deg,#05080c_0%,rgba(5,8,12,0.98)_18%,rgba(5,8,12,0.84)_42%,rgba(5,8,12,0.18)_66%,rgba(5,8,12,0.08)_82%,#05080c_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,12,0.18)_0%,transparent_54%,#05080c_100%)]"
        aria-hidden="true"
      />
    </div>

    <div
      className="pointer-events-none absolute left-1/2 top-24 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[#0A84FF]/[0.06] blur-[120px]"
      aria-hidden="true"
    />

    <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 md:px-6 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20">
      <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#0A84FF] sm:text-sm">
        Secteur santé
      </p>
      <span className="mx-auto mt-3 block h-px w-12 bg-[#0A84FF]" aria-hidden="true" />

      <div className="relative mt-10 flex min-h-[51rem] items-start sm:min-h-[43rem] lg:min-h-[39rem]">
        <div className="relative z-10 max-w-[40rem] pt-5 sm:pt-12 lg:max-w-[42rem] lg:pt-14">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#0A84FF]">
            Optimum Tech Santé
          </p>
          <h2
            id="sante-heading"
            className="mt-5 max-w-[12ch] text-[2.55rem] font-bold leading-[0.98] sm:text-5xl lg:text-[3.7rem] xl:text-[4.15rem]"
          >
            Des plateformes digitales pensées pour les cabinets dentaires<span className="text-[#0A84FF]">.</span>
          </h2>
          <p className="mt-6 max-w-[39rem] text-base leading-8 text-white/[0.68] sm:text-lg">
            Sites web, visibilité locale, prise de rendez-vous, automatisations&nbsp;: nous créons des
            écosystèmes digitaux sur mesure pour améliorer l’expérience patient et accompagner la
            croissance de votre cabinet.
          </p>
          <div className="mt-7 flex max-w-[34rem] items-start gap-3 text-sm font-semibold leading-6 text-[#63B3FF] sm:text-base">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p className="leading-6">Spécialisés dans le secteur dentaire en France</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {features.map(({ number, title, description, tags, icon: Icon }) => (
          <article
            key={number}
            className="group rounded-[1.35rem] border border-white/10 bg-[#091018]/90 p-5 transition duration-300 hover:border-[#0A84FF]/35 sm:p-6"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0A84FF]/10 text-[#3A9CFF] ring-1 ring-inset ring-[#0A84FF]/10">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-xs font-bold text-[#0A84FF]">{number}</p>
                <h3 className="mt-1 text-xl font-bold leading-tight text-white">{title}</h3>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/[0.62]">{description}</p>
            <div className="mt-5 flex flex-wrap gap-2" aria-label={`Compétences liées à ${title}`}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.055] px-2.5 py-1.5 text-xs font-medium text-white/65"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#08101a] lg:grid lg:grid-cols-[0.72fr_1fr_auto] lg:items-stretch">
        <div className="relative h-52 overflow-hidden sm:h-64 lg:h-auto lg:min-h-[15rem]">
          <ResponsiveSanteImage
            desktopAvif={imagingDesktopAvif}
            desktopJpg={imagingDesktopJpg}
            mobileAvif={imagingMobileAvif}
            mobileJpg={imagingMobileJpg}
            alt="Interface d’imagerie dentaire numérique dans un cabinet moderne"
            sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 460px"
            className="h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,#08101a_100%)] lg:bg-[linear-gradient(90deg,transparent_55%,#08101a_100%)]"
            aria-hidden="true"
          />
        </div>

        <div className="relative px-5 py-7 sm:px-8 lg:flex lg:flex-col lg:justify-center lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0A84FF]">Accompagnement sur mesure</p>
          <h3 className="mt-3 max-w-xl text-2xl font-bold leading-tight sm:text-3xl">
            Un partenaire digital pour les cabinets dentaires en France.
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/[0.62] sm:text-base">
            Performance, technologie et accompagnement sur mesure.
          </p>
        </div>

        <div className="px-5 pb-7 sm:px-8 lg:flex lg:items-center lg:px-8 lg:py-8">
          <Link to="/contact" className="brand-btn brand-btn-gold w-full whitespace-nowrap lg:w-auto">
            Discutons de votre projet
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);
