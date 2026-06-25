import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { siteMeta } from '../data/siteMeta';

export const ContactActions = ({ includeContactPage = false, className = '' }) => {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <a
        href={siteMeta.socialLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-[#25D366]/90"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
      <a
        href={siteMeta.emailHref}
        className={`inline-flex items-center justify-center gap-3 rounded-lg border px-6 py-3 text-sm font-semibold transition hover:scale-[1.01] ${
          theme === 'dark'
            ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
            : 'border-black/10 bg-white/70 text-black hover:bg-white'
        }`}
      >
        <Mail className="h-4 w-4 text-[#007BFF]" />
        Envoyer un e-mail
      </a>
      {includeContactPage ? (
        <Link
          to="/contact"
          className={`inline-flex items-center justify-center gap-3 rounded-lg border px-6 py-3 text-sm font-semibold transition hover:scale-[1.01] ${
            theme === 'dark'
              ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
              : 'border-black/10 bg-white/70 text-black hover:bg-white'
          }`}
        >
          Parler de votre projet
          <ArrowRight className="h-4 w-4 text-[#007BFF]" />
        </Link>
      ) : null}
    </div>
  );
};
