import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useI18n } from '../i18n.jsx';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO.jsx';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { 
  Rocket, 
  ChevronLeft, 
  Send, 
  Smartphone, 
  Globe, 
  Cpu, 
  Zap, 
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

import appImg from '../assets/images/planning application.webp';
import webImg from '../assets/images/online commerce .png';
import softwareImg from '../assets/images/optimum tech software dev.png';
import aiImg from '../assets/images/optimum tech digital shop.webp';
import consultationImg from '../assets/images/optimum tech online meeting.webp';

const ContactOption = ({ icon: Icon, title, onClick, active, image, delay = 0 }) => {
  const { theme } = useTheme();
  const cardRef = useRef(null);
  
  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay: delay * 0.1 },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.2
        }
      }}
      style={{
        perspective: "1200px",
      }}
      className="flex-shrink-0 w-[280px] sm:w-[320px]"
    >
      <motion.button
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`relative w-full aspect-[3/4.5] rounded-[2.5rem] overflow-hidden group transition-all duration-500 shadow-2xl ${
          active ? 'ring-4 ring-[#007BFF]' : 'border border-white/10'
        }`}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        
        {/* Overlays */}
        <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${
          theme === 'dark' 
            ? 'bg-black/50 group-hover:bg-black/30' 
            : 'bg-gray-500/10 group-hover:bg-gray-500/5'
        }`} />
        
        {/* Content */}
        <div className="relative z-20 h-full w-full p-8 flex flex-col items-center justify-end text-center" style={{ transform: "translateZ(60px)" }}>
          <div className={`mb-4 p-4 rounded-2xl backdrop-blur-xl transition-all duration-500 shadow-xl ${
            theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
          }`}>
            <Icon size={32} />
          </div>
          <h3 className={`text-2xl font-bold tracking-tighter mb-2 drop-shadow-lg ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            {title}
          </h3>
          <div className={`flex items-center gap-2 text-sm font-bold transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 ${
            theme === 'dark' ? 'text-[#007BFF]' : 'text-[#007BFF]'
          }`}>
            <span>Commencer</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

export const Contact = () => {
  const { t, lang } = useI18n();
  const { theme } = useTheme();
  const location = useLocation();
  const [step, setStep] = useState('form');
  const [category, setCategory] = useState(null);
  const isRTL = lang === 'ar';
  const tapeRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    businessSector: '',
    objective: '',
    teamSize: '',
    appVision: '',
    employeeCount: '',
    websiteType: '',
    role: '',
    currentProblem: '',
    dailyProblem: '',
    replaceTask: '',
    consultationNeed: '',
  });

  const setField = (key) => (e) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type) {
      setCategory(type);
      setStep('form');
    }
  }, [location]);

  const categories = [
    { 
      id: 'app', 
      icon: Smartphone, 
      title: t('contact_v2.questions.app.title'),
      image: appImg
    },
    { 
      id: 'web', 
      icon: Globe, 
      title: t('contact_v2.questions.web.title'),
      image: webImg
    },
    { 
      id: 'software', 
      icon: Cpu, 
      title: t('contact_v2.questions.software.title'),
      image: softwareImg
    },
    { 
      id: 'ai', 
      icon: Zap, 
      title: t('contact_v2.questions.ai.title'),
      image: aiImg
    },
    { 
      id: 'consultation', 
      icon: MessageSquare, 
      title: t('contact_v2.questions.consultation.title'),
      image: consultationImg
    },
  ];

  const tapeBase = isRTL ? [...categories].reverse() : categories;
  const tapeItems = [...tapeBase, ...tapeBase, ...tapeBase];

  useEffect(() => {
    if (step !== 'selection') return;
    const el = tapeRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => {
      const segment = el.scrollWidth / 3;
      if (Number.isFinite(segment) && segment > 0) el.scrollLeft = segment;
    });
    return () => cancelAnimationFrame(raf);
  }, [step, isRTL]);

  useEffect(() => {
    if (step !== 'selection') return;
    const el = tapeRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const speed = 0.9;

    const tick = (now) => {
      const dt = now - last;
      last = now;
      if (!isInteracting) {
        const segment = el.scrollWidth / 3;
        const dir = isRTL ? -1 : 1;
        const delta = (dt / 16.67) * speed * dir;
        el.scrollLeft += delta;

        if (Number.isFinite(segment) && segment > 0) {
          if (el.scrollLeft < segment * 0.5) el.scrollLeft += segment;
          else if (el.scrollLeft > segment * 1.5) el.scrollLeft -= segment;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step, isInteracting, isRTL]);

  const handleTapeScroll = () => {
    const el = tapeRef.current;
    if (!el) return;
    const segment = el.scrollWidth / 3;
    if (!Number.isFinite(segment) || segment <= 0) return;
    if (el.scrollLeft < segment * 0.5) el.scrollLeft += segment;
    else if (el.scrollLeft > segment * 1.5) el.scrollLeft -= segment;
  };

  const categoryLabel = categories.find((item) => item.id === category)?.title || 'Demande générale';

  const buildSubject = () => {
    const companyPart = formData.company ? ` - ${formData.company}` : '';
    return `${categoryLabel}${companyPart}`;
  };

  const buildBody = () => {
    const lines = [
      `Nom: ${formData.fullName || '-'}`,
      `Email: ${formData.email || '-'}`,
      `Telephone: ${formData.phone || '-'}`,
      `Entreprise: ${formData.company || '-'}`,
      `Categorie: ${categoryLabel}`,
    ];

    if (category === 'app') {
      lines.push(`Secteur: ${formData.businessSector || '-'}`);
      lines.push(`Objectif principal: ${formData.objective || '-'}`);
      lines.push(`Taille de l equipe: ${formData.teamSize || '-'}`);
      lines.push(`Vision de l application: ${formData.appVision || '-'}`);
    }

    if (category === 'web') {
      lines.push(`Secteur: ${formData.businessSector || '-'}`);
      lines.push(`Nombre d employes: ${formData.employeeCount || '-'}`);
      lines.push(`Type de site: ${formData.websiteType || '-'}`);
    }

    if (category === 'software') {
      lines.push(`Role: ${formData.role || '-'}`);
      lines.push(`Secteur: ${formData.businessSector || '-'}`);
      lines.push(`Probleme actuel: ${formData.currentProblem || '-'}`);
    }

    if (category === 'ai') {
      lines.push(`Secteur: ${formData.businessSector || '-'}`);
      lines.push(`Problemes quotidiens: ${formData.dailyProblem || '-'}`);
      lines.push(`Tache a automatiser: ${formData.replaceTask || '-'}`);
    }

    if (category === 'consultation') {
      lines.push(`Secteur: ${formData.businessSector || '-'}`);
      lines.push(`Besoin: ${formData.consultationNeed || '-'}`);
    }

    if (!category) {
      lines.push(`Message: ${formData.message || '-'}`);
    } else if (formData.message) {
      lines.push(`Message complementaire: ${formData.message}`);
    }

    return lines.join('\n');
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      businessSector: '',
      objective: '',
      teamSize: '',
      appVision: '',
      employeeCount: '',
      websiteType: '',
      role: '',
      currentProblem: '',
      dailyProblem: '',
      replaceTask: '',
      consultationNeed: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!supabase) {
      setSubmitError('Supabase is not configured.');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        subject: buildSubject(),
        body: buildBody(),
        from_email: formData.email,
        status: 'Unread',
      };

      const { error } = await supabase.from('messages').insert([payload]);
      if (error) throw error;

      resetForm();
      setStep('success');
    } catch (error) {
      console.error('Error sending contact request:', error);
      setSubmitError(error.message || 'Unable to send your request right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    const inputClass = `w-full p-4 rounded-2xl border transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-white/5 border-white/10 focus:border-[#007BFF]/50 focus:bg-white/10' 
        : 'bg-black/5 border-black/10 focus:border-[#007BFF]/50 focus:bg-black/10 shadow-sm'
    }`;
    const labelClass = `block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`;

    switch(category) {
      case 'app':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <label className={labelClass}>Quel est votre domaine d’activité ?</label>
              <input required type="text" value={formData.businessSector} onChange={setField('businessSector')} className={inputClass} placeholder="Ex: E-commerce, Sport, Éducation..." />
            </div>
            <div>
              <label className={labelClass}>Quel est votre objectif principal ?</label>
              <input required type="text" value={formData.objective} onChange={setField('objective')} className={inputClass} placeholder="Ex: Gagner des utilisateurs, automatiser les ventes..." />
            </div>
            <div>
              <label className={labelClass}>Combien de personnes êtes-vous ?</label>
              <input required type="text" value={formData.teamSize} onChange={setField('teamSize')} className={inputClass} placeholder="Ex: 1-5, 10+, Juste moi..." />
            </div>
            <div>
              <label className={labelClass}>Décrivez brièvement l’application parfaite que vous imaginez :</label>
              <textarea required value={formData.appVision} onChange={setField('appVision')} className={inputClass} rows={4} placeholder="Votre vision..." />
            </div>
          </motion.div>
        );
      case 'web':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <label className={labelClass}>Quel est votre domaine d’activité ?</label>
              <input required type="text" value={formData.businessSector} onChange={setField('businessSector')} className={inputClass} placeholder="Ex: Immobilier, Restaurant, Portfolio..." />
            </div>
            <div>
              <label className={labelClass}>Combien d’employés avez-vous ?</label>
              <input required type="text" value={formData.employeeCount} onChange={setField('employeeCount')} className={inputClass} placeholder="Nombre de collaborateurs..." />
            </div>
            <div>
              <label className={labelClass}>Quel type de site souhaitez-vous ?</label>
              <select required value={formData.websiteType} onChange={setField('websiteType')} className={inputClass}>
                <option value="">Sélectionnez un type...</option>
                <option value="vitrine">Site Vitrine</option>
                <option value="ecommerce">Vente de produits (E‑commerce)</option>
                <option value="services">Vente de services</option>
                <option value="reservation">Réservation</option>
                <option value="multi">Multi-services</option>
              </select>
            </div>
          </motion.div>
        );
      case 'software':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <label className={labelClass}>Êtes-vous propriétaire d’entreprise ou chargé de mission ?</label>
              <input required type="text" value={formData.role} onChange={setField('role')} className={inputClass} placeholder="Votre rôle..." />
            </div>
            <div>
              <label className={labelClass}>Quel est votre domaine d’activité ?</label>
              <input required type="text" value={formData.businessSector} onChange={setField('businessSector')} className={inputClass} placeholder="Ex: Logistique, Finance, Santé..." />
            </div>
            <div>
              <label className={labelClass}>Quel problème rencontrez-vous actuellement ?</label>
              <textarea required value={formData.currentProblem} onChange={setField('currentProblem')} className={inputClass} rows={4} placeholder="Décrivez votre défi technique..." />
            </div>
          </motion.div>
        );
      case 'ai':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className={`p-6 rounded-2xl mb-8 border border-[#007BFF]/20 bg-[#007BFF]/5 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
              <p className="text-sm italic font-light">
                “Imaginez un employé précis qui ne fait pas d’erreurs, travaille 24h/24, et que vous ne payez qu’une seule fois. C’est ce que nous construisons avec l’IA.”
              </p>
            </div>
            <div>
              <label className={labelClass}>Quel est votre domaine d’activité ?</label>
              <input required type="text" value={formData.businessSector} onChange={setField('businessSector')} className={inputClass} placeholder="Votre secteur..." />
            </div>
            <div>
              <label className={labelClass}>Quels sont les problèmes quotidiens pour lesquels vous seriez prêt à payer ?</label>
              <textarea required value={formData.dailyProblem} onChange={setField('dailyProblem')} className={inputClass} rows={3} placeholder="Tâches répétitives, erreurs humaines..." />
            </div>
            <div>
              <label className={labelClass}>Quel poste ou tâche souhaiteriez-vous remplacer par une IA précise et infatigable ?</label>
              <textarea required value={formData.replaceTask} onChange={setField('replaceTask')} className={inputClass} rows={4} placeholder="Décrivez le besoin..." />
            </div>
          </motion.div>
        );
      case 'consultation':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <label className={labelClass}>Quel est votre domaine d’activité ?</label>
              <input required type="text" value={formData.businessSector} onChange={setField('businessSector')} className={inputClass} placeholder="Votre secteur..." />
            </div>
            <div>
              <label className={labelClass}>Décrivez brièvement votre problème ou besoin :</label>
              <textarea required value={formData.consultationNeed} onChange={setField('consultationNeed')} className={inputClass} rows={4} placeholder="Comment pouvons-nous vous aider ?" />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#F5F5F7] text-black'
    }`}>
      <SEO
        path="/contact"
        title="Contact Optimum Tech | Devis site web, SEO et automatisation IA"
        description="Contactez Optimum Tech pour un devis de création de site web, de référencement SEO ou d’automatisation IA à Sète, dans l’Hérault, en Occitanie et en France."
        keywords="contact Optimum Tech, devis site web sète, agence web hérault, SEO local sète, automatisation IA france"
      />
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-32 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className={`w-full max-w-3xl p-8 md:p-12 rounded-[3rem] border shadow-2xl relative ${
                theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-gray-500/10 border-black/10 backdrop-blur-2xl shadow-2xl'
              }`}
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Parlez-nous de votre projet</h1>
                <p className={`mt-4 text-base leading-8 md:text-lg ${theme === 'dark' ? 'text-white/65' : 'text-black/65'}`}>
                  Decrivez simplement votre besoin en creation de site web, SEO local, automatisation IA ou accompagnement digital. Nous revenons vers vous rapidement avec une reponse claire.
                </p>
              </div>

              <div className="mb-10 grid gap-4 md:grid-cols-3">
                {[
                  { label: 'Telephone', value: '+33 7 45 30 51 13', href: 'tel:+33745305113' },
                  { label: 'Email', value: 'optimum.tech.911@gmail.com', href: 'mailto:optimum.tech.911@gmail.com' },
                  { label: 'WhatsApp', value: 'Envoyer un message', href: 'https://wa.me/33745305113' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'WhatsApp' ? '_blank' : undefined}
                    rel={item.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                    className={`rounded-[1.6rem] border p-4 transition ${
                      theme === 'dark'
                        ? 'border-white/10 bg-white/5 hover:bg-white/10'
                        : 'border-black/10 bg-black/5 hover:bg-black/10'
                    }`}
                  >
                    <div className="text-xs uppercase tracking-[0.16em] text-[#007BFF]">{item.label}</div>
                    <div className="mt-2 text-sm font-semibold md:text-base">{item.value}</div>
                  </a>
                ))}
              </div>

              <div className="mb-10">
                <p className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                  Vous pouvez aussi preciser votre besoin principal :
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory(null)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      category === null
                        ? 'border-[#007BFF]/40 bg-[#007BFF]/15 text-[#007BFF]'
                        : theme === 'dark'
                          ? 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10'
                          : 'border-black/10 bg-black/5 text-black/75 hover:bg-black/10'
                    }`}
                  >
                    Demande generale
                  </button>
                  {categories.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        category === item.id
                          ? 'border-[#007BFF]/40 bg-[#007BFF]/15 text-[#007BFF]'
                          : theme === 'dark'
                            ? 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10'
                            : 'border-black/10 bg-black/5 text-black/75 hover:bg-black/10'
                      }`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              <form className="space-y-8" onSubmit={handleSubmit}>
                  {category && (
                    <>
                      {renderFormFields()}
                      <div className="pt-8 border-t border-current opacity-10" />
                    </>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Nom complet</label>
                      <input required type="text" value={formData.fullName} onChange={setField('fullName')} placeholder="Ex: Jean Dupont" className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#007BFF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#007BFF]/50 shadow-sm'
                      }`} />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Email professionnel</label>
                      <input required type="email" value={formData.email} onChange={setField('email')} placeholder="Ex: jean@entreprise.com" className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#007BFF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#007BFF]/50 shadow-sm'
                      }`} />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Téléphone</label>
                      <input required type="tel" value={formData.phone} onChange={setField('phone')} placeholder="Ex: +33 6 12 34 56 78" className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#007BFF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#007BFF]/50 shadow-sm'
                      }`} />
                    </div>
                    <div className="space-y-2">
                      <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Entreprise / Organisation</label>
                      <input type="text" value={formData.company} onChange={setField('company')} placeholder="Nom de votre entreprise" className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#007BFF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#007BFF]/50 shadow-sm'
                      }`} />
                    </div>
                  </div>

                  {!category && (
                    <div className="space-y-2">
                      <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Message</label>
                      <textarea required value={formData.message} onChange={setField('message')} rows={5} placeholder="Comment pouvons-nous vous aider ?" className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#007BFF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#007BFF]/50 shadow-sm'
                      }`} />
                    </div>
                  )}

                  {category && (
                    <div className="space-y-2">
                      <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Message complémentaire</label>
                      <textarea value={formData.message} onChange={setField('message')} rows={4} placeholder="Ajoutez un contexte utile, vos délais ou votre budget." className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#007BFF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#007BFF]/50 shadow-sm'
                      }`} />
                    </div>
                  )}

                  {submitError && (
                    <div className={`rounded-2xl border px-4 py-3 text-sm ${
                      theme === 'dark'
                        ? 'border-red-500/20 bg-red-500/10 text-red-200'
                        : 'border-red-500/30 bg-red-500/5 text-red-600'
                    }`}>
                      {submitError}
                    </div>
                  )}

                  <button disabled={isSubmitting} type="submit" className="w-full py-5 rounded-full bg-[#007BFF] text-white font-bold text-xl shadow-xl shadow-[#007BFF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100">
                    <Send size={20} />
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                  </button>
                </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                <Rocket size={48} />
              </div>
              <h2 className="text-4xl font-bold">Demande envoyée !</h2>
                <p className={`text-xl max-w-md mx-auto ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                Nous avons bien reçu votre formulaire. Nous reviendrons vers vous dans les plus brefs délais.
              </p>
              
              <div className={`p-6 rounded-2xl border ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}>
                <p className="text-sm font-medium mb-2">Besoin d’une réponse urgente ?</p>
                <p className="text-[#007BFF] font-bold text-lg">Contactez-nous sur WhatsApp :</p>
                <a href="https://wa.me/33745305113" className="text-2xl font-mono mt-2 block hover:underline">+33 7 45 30 51 13</a>
              </div>

              <button
                onClick={() => { setStep('form'); setCategory(null); }}
                className="px-8 py-4 rounded-full border border-current opacity-50 hover:opacity-100 transition-opacity"
              >
                Envoyer une autre demande
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};
