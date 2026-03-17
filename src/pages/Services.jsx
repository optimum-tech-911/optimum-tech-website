import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useI18n } from '../i18n.jsx';
import { SEO } from '../components/SEO.jsx';
import { ScrollReveal } from '../components/ScrollReveal';
import { useTheme } from '../context/ThemeContext';
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Zap, 
  Gamepad2, 
  Cloud,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import local images
import webImg from '../assets/images/online commerce .png';
import appImg from '../assets/images/planning application.webp';
import softwareImg from '../assets/images/optimum tech software dev.png';
import aiImg from '../assets/images/optimum tech digital shop.webp';
import gamingImg from '../assets/images/optimum tech gaming.webp';
import consultationImg from '../assets/images/optimum tech online meeting.webp';

const ServiceCard = ({ id, icon: Icon, title, desc, items, image, delay = 0 }) => {
  const { theme } = useTheme();
  return (
    <ScrollReveal delay={delay} className="h-full">
      <div className={`h-full rounded-[2.5rem] border shadow-2xl relative overflow-hidden group transition-all duration-500 flex flex-col ${
        theme === 'dark' 
          ? 'border-white/10 bg-[#0D0D0F] hover:border-[#007BFF]/30' 
          : 'border-black/10 bg-gray-500/10 backdrop-blur-2xl hover:border-[#007BFF]/30 shadow-xl'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* Service Image Section */}
        <div className="h-48 w-full overflow-hidden relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-90" 
          />
          <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
            theme === 'dark' ? 'from-[#0D0D0F]' : 'from-white'
          }`} />
          
          <div className="absolute bottom-4 left-8">
            <div className="w-12 h-12 rounded-xl bg-[#007BFF]/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/10">
              <Icon className="w-6 h-6 text-[#007BFF]" />
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10 pt-4 flex flex-col flex-grow">
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            {title}
          </h3>
          
          <p className={`font-light leading-relaxed mb-6 flex-grow ${
            theme === 'dark' ? 'text-white/50' : 'text-black/50'
          }`}>
            {desc}
          </p>

          <ul className="space-y-3 mb-8">
            {items.map((item, i) => (
              <li key={i} className={`flex items-center gap-3 font-light text-sm ${
                theme === 'dark' ? 'text-white/70' : 'text-black/70'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-[#007BFF]/50" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Link 
            to={`/contact?type=${id}`}
            className="inline-flex items-center gap-2 text-[#007BFF] font-semibold group/link mt-auto relative z-20"
          >
            <span>Demander un devis</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
};

export const Services = () => {
  const { t } = useI18n();
  const { theme } = useTheme();

  const servicesData = [
    {
      id: 'web',
      icon: Globe,
      title: t('services.web.title'),
      desc: t('services.web.desc'),
      items: t('services.web.items'),
      image: webImg
    },
    {
      id: 'app',
      icon: Smartphone,
      title: t('services.mobile.title'),
      desc: t('services.mobile.desc'),
      items: t('services.mobile.items'),
      image: appImg
    },
    {
      id: 'software',
      icon: Cpu,
      title: t('services.software.title'),
      desc: t('services.software.desc'),
      items: t('services.software.items'),
      image: softwareImg
    },
    {
      id: 'ai',
      icon: Zap,
      title: t('services.automation.title'),
      desc: t('services.automation.desc'),
      items: t('services.automation.items'),
      image: aiImg
    },
    {
      id: 'games',
      icon: Gamepad2,
      title: t('services.games.title'),
      desc: t('services.games.desc'),
      items: t('services.games.items'),
      image: gamingImg
    },
    {
      id: 'consultation',
      icon: Cloud,
      title: t('services.infra.title'),
      desc: t('services.infra.desc'),
      items: t('services.infra.items'),
      image: consultationImg
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col relative overflow-x-hidden ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
    }`}>
      <SEO path="/services" title={t('services.title')} />
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-32 relative z-10">
        <ScrollReveal className="text-center mb-24">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8">
            {t('services.title')}
          </h1>
          <p className="text-xl md:text-2xl opacity-50 font-light max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, i) => (
            <ServiceCard 
              key={i}
              {...service}
              delay={i * 0.1}
            />
          ))}
        </div>

        <ScrollReveal className="mt-32">
          <div className={`rounded-[3rem] border p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl ${
            theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-gray-500/10 border-black/10 backdrop-blur-2xl shadow-2xl'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
              {t('contact_v2.readyTitle') || 'Prêt à transformer votre idée ?'}
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#007BFF] text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-[#007BFF]/90 transition-all hover:scale-105 shadow-xl shadow-[#007BFF]/20"
            >
              {t('contact_v2.launchProject') || 'Lancer votre projet'}
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
};
