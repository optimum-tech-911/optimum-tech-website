import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { siteMeta } from '../data/siteMeta';

export const ContactActions = ({ includeContactPage = false, className = '' }) => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col flex-wrap gap-3 sm:flex-row relative z-20 ${className}`}>
      <a
        href={siteMeta.socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[56px] shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-xl bg-[#0A84FF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0576e6]"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
      <a
        href={siteMeta.emailHref}
        className={`inline-flex min-h-[56px] shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-xl border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
          theme === 'dark'
            ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
            : 'border-black/10 bg-white/70 text-black hover:bg-white'
        }`}
      >
        <Mail className="h-5 w-5 text-[#0A84FF]" />
        Envoyer un e-mail
      </a>
      {includeContactPage ? (
        <Link
          to="/contact"
          className={`inline-flex min-h-[56px] shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-xl border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${
            theme === 'dark'
              ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              : 'border-black/10 bg-white/70 text-black hover:bg-white'
          }`}
        >
          Parler de votre projet
          <ArrowRight className="h-5 w-5 text-[#0A84FF]" />
        </Link>
      ) : null}
    </div>
  );
};
