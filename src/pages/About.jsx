import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useTheme } from '../context/ThemeContext';
import { siteMeta, trustHighlights } from '../data/siteMeta';
import { ContactActions } from '../components/ContactActions';
import { buildCanonicalUrl, buildWebPageSchema, schemaIds } from '../data/schema';

export const AboutPage = () => {
  const { theme } = useTheme();
  const breadcrumbs = [
    { label: 'Accueil', to: '/' },
    { label: 'À propos', to: '/a-propos' },
  ];

  return (
    <div
      className={`ux-page flex min-h-screen flex-col transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
      }`}
    >
      <SEO
        path="/a-propos"
        title="À propos d’Optimum Tech | Sites, applications et solutions digitales"
        description="Découvrez Optimum Tech, studio de création de sites web, web apps, logiciels sur mesure, automatisations utiles et visibilité digitale pour les entreprises à Montpellier et Sète, dans l’Hérault, en Occitanie et en France."
        schema={[
          { ...buildWebPageSchema({
            path: '/a-propos',
            dateModified: '2026-10-02',
            title: 'À propos d’Optimum Tech | Sites, applications et solutions digitales',
            description:
              'Découvrez Optimum Tech, studio de création de sites web, web apps, logiciels sur mesure, automatisations utiles et visibilité digitale pour les entreprises à Montpellier et Sète, dans l’Hérault, en Occitanie et en France.',
          }), '@type': 'AboutPage', mainEntity: { '@id': schemaIds.organization } },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((item, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.label,
              item: buildCanonicalUrl(item.to),
            })),
          },
        ]}
      />
      <Navbar />

      <main className="flex-1 px-5 pb-20 pt-28 sm:px-6 md:pt-32">
        <section className="mx-auto max-w-5xl">
          <div
            className={`rounded-[1.75rem] border px-5 py-8 sm:px-6 md:rounded-[2.8rem] md:px-10 md:py-14 ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5'
                : 'border-black/10 bg-white/75 shadow-xl'
            }`}
          >
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="max-w-4xl text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-6xl">
              Optimum Tech, studio web pour entreprises et cabinets dentaires
            </h1>
            <p className={`mt-5 max-w-3xl text-lg leading-8 ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
              Optimum Tech conçoit des sites internet, des plateformes web et des logiciels
              sur mesure pour les entreprises de Montpellier, Sète et de l’Hérault.
              Notre travail réunit le design, le développement, le référencement local et
              l’automatisation, avec des projets également accompagnés à distance en France.
            </p>
            <dl className={`mt-7 grid gap-5 border-t pt-6 text-sm leading-7 sm:grid-cols-2 ${theme === 'dark' ? 'border-white/10 text-white/75' : 'border-black/10 text-black/75'}`}>
              <div><dt className="font-bold">Pour qui ?</dt><dd>Entreprises locales, dentistes, commerces, indépendants, PME et porteurs de plateformes.</dd></div>
              <div><dt className="font-bold">Où intervenons-nous ?</dt><dd>Montpellier, Sète, Frontignan, Béziers et l’Hérault ; accompagnement à distance en France.</dd></div>
              <div><dt className="font-bold">Parler de votre besoin</dt><dd><a href={siteMeta.phoneHref} className="underline underline-offset-4">{siteMeta.phone}</a></dd></div>
              <div><dt className="font-bold">Nous écrire</dt><dd><a href={siteMeta.emailHref} className="break-all underline underline-offset-4">{siteMeta.email}</a></dd></div>
            </dl>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-5xl grid gap-6 md:grid-cols-2">
          {trustHighlights.map((item) => (
            <div
              key={item}
              className={`rounded-[2rem] border p-6 ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5'
                  : 'border-black/10 bg-white/80 shadow-lg'
              }`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 text-[#0A84FF]" />
                <p className="text-base leading-7">{item}</p>
              </div>
            </div>
          ))}
        </section>

        <section className={`mx-auto mt-12 max-w-5xl rounded-[2rem] border p-6 md:p-8 ${
          theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-lg'
        }`}>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Du site internet à la plateforme métier</h2>
          <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
            <p>
              Un cabinet dentaire a besoin de présenter ses soins et de faciliter la préparation
              d’un rendez-vous. Un commerce doit rendre ses produits accessibles. Une plateforme
              doit organiser des comptes, des demandes, des documents ou des transactions.
              Le parcours et les fonctionnalités sont conçus à partir de ces usages.
            </p>
            <p>
              Nous intervenons sur la structure des contenus, l’identité visuelle, les interfaces
              mobiles, le développement et les parcours de contact. Selon le projet, cela inclut
              un espace client, une administration, des animations, une scène 3D ou des
              automatisations liées à votre activité.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 font-semibold text-[#0576e6]">
              <Link to="/creation-site-web-montpellier" className="underline underline-offset-4">Créer un site à Montpellier</Link>
              <Link to="/site-internet-dentiste" className="underline underline-offset-4">Créer un site de cabinet dentaire</Link>
              <Link to="/application-web-sur-mesure" className="underline underline-offset-4">Développer une plateforme</Link>
              <Link to="/referencement-seo" className="underline underline-offset-4">Travailler le référencement local</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-5xl grid gap-6 lg:grid-cols-2">
          <div className={`rounded-[2rem] border p-6 md:p-8 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-lg'
          }`}>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Notre manière de travailler</h2>
            <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
              <p>
                Le premier échange sert à définir votre activité, vos visiteurs, les actions
                attendues et les outils déjà utilisés. Nous cadrons ensuite les pages, les
                fonctionnalités, les contenus à réunir et les priorités de lancement.
              </p>
              <p>
                Les choix de design et de développement suivent ce périmètre. Les parcours
                essentiels, l’affichage mobile, les moyens de contact et la présence des
                contenus sont vérifiés avant la mise en ligne. La maintenance et les évolutions
                se définissent selon les besoins du projet.
              </p>
            </div>
          </div>

          <div className={`rounded-[2rem] border p-6 md:p-8 ${
            theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-lg'
          }`}>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Des réalisations que vous pouvez explorer</h2>
            <div className={`mt-5 space-y-4 text-base leading-8 ${theme === 'dark' ? 'text-white/76' : 'text-black/76'}`}>
              <p>
                Le <Link to="/realisations/cabinet-dentaire-sete" className="underline underline-offset-4">Cabinet Dentaire Sète</Link> et
                l’<Link to="/realisations/ufsbd34" className="underline underline-offset-4">UFSBD34</Link> illustrent notre travail dans la santé.
                {' '}<Link to="/realisations/kabamana" className="underline underline-offset-4">Kabamana</Link> présente une marketplace de transport et
                {' '}<Link to="/realisations/oree-entreprises" className="underline underline-offset-4">Orée Entreprises</Link> un parcours de création de société avec espace client.
              </p>
              <p>
                Côté design, <Link to="/realisations/krew-media" className="underline underline-offset-4">Krew Media</Link> met la vidéo au centre de son univers,
                tandis que <Link to="/realisations/nonails" className="underline underline-offset-4">Nonails</Link> propose une scène de nail art en 3D au défilement.
                Chaque présentation donne accès au projet en ligne pour découvrir son fonctionnement.
              </p>
            </div>
          </div>
        </section>

        <section className={`mx-auto mt-12 max-w-5xl rounded-[2rem] border p-6 md:p-8 ${
          theme === 'dark' ? 'border-[#0A84FF]/20 bg-[#0A84FF]/10' : 'border-[#0A84FF]/15 bg-[#0A84FF]/8 shadow-lg'
        }`}>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Parler à une personne, pas à une interface opaque</h2>
          <p className={`mt-4 max-w-3xl text-base leading-8 ${theme === 'dark' ? 'text-white/78' : 'text-black/78'}`}>
            Pour un besoin de site, d’application, d’outil interne, de visibilité locale ou
            d’automatisation, le plus simple reste de décrire votre contexte. Vous pouvez joindre Optimum Tech par téléphone au
            {` ${siteMeta.phone} `}ou par e-mail à {siteMeta.email}.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#0A84FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0A84FF]/90"
          >
            Nous parler de votre projet
            <ArrowRight className="h-4 w-4" />
          </Link>
          <ContactActions className="mt-6" />
        </section>
      </main>

      <Footer />
    </div>
  );
};
