import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useI18n } from '../i18n.jsx';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/SEO.jsx';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Rocket, Send } from 'lucide-react';

import { resourceTopics, siteMeta } from '../data/siteMeta';
import { buildContactPageSchema } from '../data/schema';
import { ContactActions } from '../components/ContactActions';

export const Contact = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const location = useLocation();
  const [step, setStep] = useState('form');
  const [category, setCategory] = useState(null);
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
      title: t('contact_v2.questions.app.title'),
    },
    { 
      id: 'web', 
      title: t('contact_v2.questions.web.title'),
    },
    { 
      id: 'software', 
      title: t('contact_v2.questions.software.title'),
    },
    { 
      id: 'ai', 
      title: t('contact_v2.questions.ai.title'),
    },
    { 
      id: 'consultation', 
      title: t('contact_v2.questions.consultation.title'),
    },
  ];

  const categoryLabel = categories.find((item) => item.id === category)?.title || 'Demande générale';

  const buildSubject = () => {
    const companyPart = formData.company ? ` - ${formData.company}` : '';
    return `${categoryLabel}${companyPart}`;
  };

  const buildBody = () => {
    const lines = [
      `Nom: ${formData.fullName || '-'}`,
      `E-mail: ${formData.email || '-'}`,
      `Téléphone: ${formData.phone || '-'}`,
      `Entreprise: ${formData.company || '-'}`,
      `Catégorie: ${categoryLabel}`,
    ];

    if (category === 'app') {
      lines.push(`Secteur: ${formData.businessSector || '-'}`);
      lines.push(`Objectif principal: ${formData.objective || '-'}`);
      lines.push(`Taille de l’équipe: ${formData.teamSize || '-'}`);
      lines.push(`Vision de l’application: ${formData.appVision || '-'}`);
    }

    if (category === 'web') {
      lines.push(`Secteur: ${formData.businessSector || '-'}`);
      lines.push(`Nombre d’employés: ${formData.employeeCount || '-'}`);
      lines.push(`Type de site: ${formData.websiteType || '-'}`);
    }

    if (category === 'software') {
      lines.push(`Role: ${formData.role || '-'}`);
      lines.push(`Secteur: ${formData.businessSector || '-'}`);
      lines.push(`Problème actuel: ${formData.currentProblem || '-'}`);
    }

    if (category === 'ai') {
      lines.push(`Secteur: ${formData.businessSector || '-'}`);
      lines.push(`Problèmes quotidiens: ${formData.dailyProblem || '-'}`);
      lines.push(`Tâche à automatiser: ${formData.replaceTask || '-'}`);
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
      setSubmitError('Le formulaire est temporairement indisponible. Contactez-nous par téléphone ou par e-mail.');
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
      setSubmitError('Votre demande n’a pas pu être envoyée. Réessayez ou contactez-nous directement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    const inputClass = `w-full p-4 rounded-2xl border transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-white/5 border-white/10 focus:border-[#0A84FF]/50 focus:bg-white/10' 
        : 'bg-black/5 border-black/10 focus:border-[#0A84FF]/50 focus:bg-black/10 shadow-sm'
    }`;
    const labelClass = `block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`;

    switch(category) {
      case 'app':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <label htmlFor="app-business-sector" className={labelClass}>Quel est votre domaine d’activité ?</label>
              <input id="app-business-sector" name="businessSector" required type="text" value={formData.businessSector} onChange={setField('businessSector')} className={inputClass} placeholder="Ex: E-commerce, Sport, Éducation..." />
            </div>
            <div>
              <label htmlFor="app-objective" className={labelClass}>Quel est votre objectif principal ?</label>
              <input id="app-objective" name="objective" required type="text" value={formData.objective} onChange={setField('objective')} className={inputClass} placeholder="Ex: Gagner des utilisateurs, automatiser les ventes..." />
            </div>
            <div>
              <label htmlFor="app-team-size" className={labelClass}>Combien de personnes êtes-vous ?</label>
              <input id="app-team-size" name="teamSize" required type="text" value={formData.teamSize} onChange={setField('teamSize')} className={inputClass} placeholder="Ex: 1-5, 10+, Juste moi..." />
            </div>
            <div>
              <label htmlFor="app-vision" className={labelClass}>Décrivez brièvement l’application parfaite que vous imaginez :</label>
              <textarea id="app-vision" name="appVision" required value={formData.appVision} onChange={setField('appVision')} className={inputClass} rows={4} placeholder="Votre vision..." />
            </div>
          </motion.div>
        );
      case 'web':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <label htmlFor="web-business-sector" className={labelClass}>Quel est votre domaine d’activité ?</label>
              <input id="web-business-sector" name="businessSector" required type="text" value={formData.businessSector} onChange={setField('businessSector')} className={inputClass} placeholder="Ex: Immobilier, Restaurant, Portfolio..." />
            </div>
            <div>
              <label htmlFor="web-employee-count" className={labelClass}>Combien d’employés avez-vous ?</label>
              <input id="web-employee-count" name="employeeCount" required type="text" value={formData.employeeCount} onChange={setField('employeeCount')} className={inputClass} placeholder="Nombre de collaborateurs..." />
            </div>
            <div>
              <label htmlFor="website-type" className={labelClass}>Quel type de site souhaitez-vous ?</label>
              <select id="website-type" name="websiteType" required value={formData.websiteType} onChange={setField('websiteType')} className={inputClass}>
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
              <label htmlFor="software-role" className={labelClass}>Êtes-vous propriétaire d’entreprise ou chargé de mission ?</label>
              <input id="software-role" name="role" required type="text" value={formData.role} onChange={setField('role')} className={inputClass} placeholder="Votre rôle..." />
            </div>
            <div>
              <label htmlFor="software-business-sector" className={labelClass}>Quel est votre domaine d’activité ?</label>
              <input id="software-business-sector" name="businessSector" required type="text" value={formData.businessSector} onChange={setField('businessSector')} className={inputClass} placeholder="Ex: Logistique, Finance, Santé..." />
            </div>
            <div>
              <label htmlFor="software-current-problem" className={labelClass}>Quel problème rencontrez-vous actuellement ?</label>
              <textarea id="software-current-problem" name="currentProblem" required value={formData.currentProblem} onChange={setField('currentProblem')} className={inputClass} rows={4} placeholder="Décrivez votre défi technique..." />
            </div>
          </motion.div>
        );
      case 'ai':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className={`p-6 rounded-2xl mb-8 border border-[#0A84FF]/20 bg-[#0A84FF]/5 ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
              <p className="text-sm italic font-light">
                L’objectif n’est pas d’ajouter de l’IA partout, mais d’automatiser les tâches répétitives qui ralentissent réellement votre équipe.
              </p>
            </div>
            <div>
              <label htmlFor="ai-business-sector" className={labelClass}>Quel est votre domaine d’activité ?</label>
              <input id="ai-business-sector" name="businessSector" required type="text" value={formData.businessSector} onChange={setField('businessSector')} className={inputClass} placeholder="Votre secteur..." />
            </div>
            <div>
              <label htmlFor="ai-daily-problem" className={labelClass}>Quels sont les problèmes quotidiens pour lesquels vous seriez prêt à payer ?</label>
              <textarea id="ai-daily-problem" name="dailyProblem" required value={formData.dailyProblem} onChange={setField('dailyProblem')} className={inputClass} rows={3} placeholder="Tâches répétitives, erreurs humaines..." />
            </div>
            <div>
              <label htmlFor="ai-replace-task" className={labelClass}>Quelle tâche souhaiteriez-vous automatiser avec une IA précise et fiable ?</label>
              <textarea id="ai-replace-task" name="replaceTask" required value={formData.replaceTask} onChange={setField('replaceTask')} className={inputClass} rows={4} placeholder="Décrivez le besoin..." />
            </div>
          </motion.div>
        );
      case 'consultation':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <label htmlFor="consultation-business-sector" className={labelClass}>Quel est votre domaine d’activité ?</label>
              <input id="consultation-business-sector" name="businessSector" required type="text" value={formData.businessSector} onChange={setField('businessSector')} className={inputClass} placeholder="Votre secteur..." />
            </div>
            <div>
              <label htmlFor="consultation-need" className={labelClass}>Décrivez brièvement votre problème ou besoin :</label>
              <textarea id="consultation-need" name="consultationNeed" required value={formData.consultationNeed} onChange={setField('consultationNeed')} className={inputClass} rows={4} placeholder="Comment pouvons-nous vous aider ?" />
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
        title="Contact Optimum Tech | Devis site, application ou solution digitale"
        description="Contactez Optimum Tech pour un devis de création de site web, web app, logiciel sur mesure, automatisation utile ou accompagnement en visibilité digitale à Sète, dans l’Hérault, en Occitanie et en France."
        keywords="contact Optimum Tech, devis site web sète, web app sur mesure france, logiciel sur mesure entreprise, agence web hérault, SEO local sète, automatisation IA france"
        schema={buildContactPageSchema({
          path: '/contact',
          title: 'Contact Optimum Tech | Devis site, application ou solution digitale',
          description:
            'Contactez Optimum Tech pour un devis de création de site web, web app, logiciel sur mesure, automatisation utile ou accompagnement en visibilité digitale à Sète, dans l’Hérault, en Occitanie et en France.',
        })}
      />
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-32 flex flex-col items-center">
        <section className={`mb-8 w-full max-w-5xl rounded-[2.5rem] border p-6 md:p-8 ${
          theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-xl'
        }`}>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0A84FF]">
                Contact
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                Un point de contact simple pour cadrer un besoin web, applicatif ou digital
              </h1>
              <p className={`mt-5 max-w-3xl text-base leading-8 ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
                Cette page sert à décrire votre contexte de manière utile. Vous pouvez envoyer
                une demande générale ou choisir un type de projet pour nous aider à préparer
                une réponse plus précise.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Téléphone', siteMeta.phone],
                ['E-mail', siteMeta.email],
                ['Zone couverte', siteMeta.locationLabel],
                ['Délai de retour', 'Réponse rapide par message, e-mail ou téléphone'],
              ].map(([title, value]) => (
                <div
                  key={title}
                  className={`rounded-[1.5rem] border p-4 ${
                    theme === 'dark' ? 'border-white/10 bg-black/20' : 'border-black/10 bg-black/5'
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-[#0A84FF]">{title}</p>
                  <p className="mt-2 text-sm leading-7">{value}</p>
                </div>
              ))}
            </div>
            <ContactActions className="mt-8" />
          </div>
        </section>

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
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Parlez-nous de votre projet</h2>
                <p className={`mt-4 text-base leading-8 md:text-lg ${theme === 'dark' ? 'text-white/65' : 'text-black/65'}`}>
                  Décrivez simplement votre besoin en création de site web, web app, logiciel sur mesure, SEO local, automatisation utile ou accompagnement digital. Nous revenons vers vous rapidement avec une réponse claire.
                </p>
              </div>

              <div className="mb-10 grid gap-4 md:grid-cols-3">
                {[
                  { label: 'Téléphone', value: siteMeta.phone, href: siteMeta.phoneHref },
                  { label: 'E-mail', value: siteMeta.email, href: siteMeta.emailHref },
                  { label: 'WhatsApp', value: 'Envoyer un message', href: siteMeta.socialLinks.whatsapp },
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
                    <div className="text-xs uppercase tracking-[0.16em] text-[#0A84FF]">{item.label}</div>
                    <div className="mt-2 text-sm font-semibold md:text-base">{item.value}</div>
                  </a>
                ))}
              </div>

              <div className={`mb-10 rounded-[1.8rem] border p-5 ${
                theme === 'dark' ? 'border-white/10 bg-black/20' : 'border-black/10 bg-black/5'
              }`}>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0A84FF]">
                  Ce que nous utilisons pour vous répondre correctement
                </p>
                <div className={`mt-4 grid gap-4 md:grid-cols-3 ${theme === 'dark' ? 'text-white/72' : 'text-black/72'}`}>
                  {[
                    'Le type de besoin et le contexte de votre activité',
                    'Les freins actuels : manque de visibilité, site peu clair, processus trop manuels',
                    'Le meilleur chemin de réponse : appel, message, devis ou cadrage plus détaillé',
                  ].map((item) => (
                    <div key={item} className={`rounded-[1.4rem] border p-4 ${
                      theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/70'
                    }`}>
                      <p className="text-sm leading-7">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <p className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                  Vous pouvez aussi préciser votre besoin principal :
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory(null)}
                    aria-pressed={category === null}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      category === null
                        ? 'border-[#0A84FF]/40 bg-[#0A84FF]/15 text-[#0A84FF]'
                        : theme === 'dark'
                          ? 'border-white/10 bg-white/5 text-white/75 hover:bg-white/10'
                          : 'border-black/10 bg-black/5 text-black/75 hover:bg-black/10'
                    }`}
                  >
                    Demande générale
                  </button>
                  {categories.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCategory(item.id)}
                      aria-pressed={category === item.id}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        category === item.id
                          ? 'border-[#0A84FF]/40 bg-[#0A84FF]/15 text-[#0A84FF]'
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
                      <label htmlFor="full-name" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Nom complet</label>
                      <input id="full-name" name="fullName" autoComplete="name" required type="text" value={formData.fullName} onChange={setField('fullName')} placeholder="Ex: Jean Dupont" className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#0A84FF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#0A84FF]/50 shadow-sm'
                      }`} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Email professionnel</label>
                      <input id="email" name="email" autoComplete="email" required type="email" value={formData.email} onChange={setField('email')} placeholder="Ex: jean@entreprise.com" className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#0A84FF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#0A84FF]/50 shadow-sm'
                      }`} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Téléphone</label>
                      <input id="phone" name="phone" autoComplete="tel" inputMode="tel" required type="tel" value={formData.phone} onChange={setField('phone')} placeholder="Ex: +33 6 12 34 56 78" className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#0A84FF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#0A84FF]/50 shadow-sm'
                      }`} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Entreprise / Organisation</label>
                      <input id="company" name="company" autoComplete="organization" type="text" value={formData.company} onChange={setField('company')} placeholder="Nom de votre entreprise" className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#0A84FF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#0A84FF]/50 shadow-sm'
                      }`} />
                    </div>
                  </div>

                  {!category && (
                    <div className="space-y-2">
                      <label htmlFor="message" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Message</label>
                      <textarea id="message" name="message" required value={formData.message} onChange={setField('message')} rows={5} placeholder="Comment pouvons-nous vous aider ?" className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#0A84FF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#0A84FF]/50 shadow-sm'
                      }`} />
                    </div>
                  )}

                  {category && (
                    <div className="space-y-2">
                      <label htmlFor="additional-message" className={`block text-sm font-medium ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>Message complémentaire</label>
                      <textarea id="additional-message" name="message" value={formData.message} onChange={setField('message')} rows={4} placeholder="Ajoutez un contexte utile, vos délais ou votre budget." className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                        theme === 'dark' 
                          ? 'bg-white/5 border-white/10 focus:border-[#0A84FF]/50' 
                          : 'bg-black/5 border-black/10 focus:border-[#0A84FF]/50 shadow-sm'
                      }`} />
                    </div>
                  )}

                  {submitError && (
                    <div role="alert" aria-live="assertive" className={`rounded-2xl border px-4 py-3 text-sm ${
                      theme === 'dark'
                        ? 'border-[#0A84FF]/25 bg-[#0A84FF]/10 text-white'
                        : 'border-[#0A84FF]/30 bg-[#0A84FF]/10 text-[#0A84FF]'
                    }`}>
                      {submitError}
                    </div>
                  )}

                  <button disabled={isSubmitting} aria-busy={isSubmitting} type="submit" className="w-full py-5 rounded-full bg-[#0A84FF] text-white font-bold text-xl shadow-xl shadow-[#0A84FF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100">
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
              <div className="w-24 h-24 bg-[#0A84FF]/20 text-[#0A84FF] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#0A84FF]/30">
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
                <p className="text-[#0A84FF] font-bold text-lg">Contactez-nous sur WhatsApp :</p>
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

        <section className={`mt-8 w-full max-w-5xl rounded-[2.5rem] border p-6 md:p-8 ${
          theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/80 shadow-xl'
        }`}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0A84FF]">
            Avant de nous écrire
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-4xl">
            Quelques ressources qui peuvent déjà vous aider à mieux cadrer votre besoin
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {resourceTopics.map((topic) => (
              <Link
                key={topic.title}
                to={topic.links[0]}
                className={`rounded-[1.6rem] border p-5 transition ${
                  theme === 'dark'
                    ? 'border-white/10 bg-black/20 hover:border-[#0A84FF]/30'
                    : 'border-black/10 bg-black/5 hover:border-[#0A84FF]/30'
                }`}
              >
                <h3 className="text-lg font-semibold">{topic.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                  {topic.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
