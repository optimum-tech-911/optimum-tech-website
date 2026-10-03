import React from 'react';
import { BriefcaseBusiness, EyeOff, Mail, MessageCircle, Phone, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { siteMeta } from '../data/siteMeta';
import { useI18n } from '../i18n.jsx';
import './FloatingContact.css';

export const FloatingContact = () => {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const rootRef = React.useRef(null);
  const triggerRef = React.useRef(null);

  React.useEffect(() => {
    setHidden(false);
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (hidden) return null;

  const whatsappBusinessHref = `${siteMeta.socialLinks.whatsapp}&text=${encodeURIComponent(
    'Bonjour Optimum Tech, je vous contacte via WhatsApp Business pour parler de mon projet.'
  )}`;

  return (
    <div className="floating-contact" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="floating-contact__trigger"
        aria-expanded={open}
        aria-controls="floating-contact-panel"
        aria-label={open ? t('floatingContact.close') : t('floatingContact.open')}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
        <span>{t('floatingContact.button')}</span>
      </button>

      {open ? (
        <section
          className="floating-contact__panel"
          id="floating-contact-panel"
          role="region"
          aria-labelledby="floating-contact-title"
        >
          <div className="floating-contact__header">
            <div>
              <p>{t('floatingContact.eyebrow')}</p>
              <h2 id="floating-contact-title">{t('floatingContact.title')}</h2>
            </div>
            <button
              type="button"
              className="floating-contact__close"
              aria-label={t('floatingContact.close')}
              onClick={() => setOpen(false)}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          <p className="floating-contact__description">{t('floatingContact.description')}</p>

          <div className="floating-contact__actions">
            <a href={siteMeta.phoneHref} data-analytics-category="contact">
              <Phone aria-hidden="true" />
              <span>{t('floatingContact.call')}<small>{siteMeta.phone}</small></span>
            </a>
            <a href={siteMeta.emailHref} data-analytics-category="contact">
              <Mail aria-hidden="true" />
              <span>{t('floatingContact.email')}<small>{siteMeta.email}</small></span>
            </a>
            <a href={siteMeta.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" data-analytics-category="contact">
              <MessageCircle aria-hidden="true" />
              <span>{t('floatingContact.whatsapp')}<small>{siteMeta.phone}</small></span>
            </a>
            <a href={whatsappBusinessHref} target="_blank" rel="noopener noreferrer" data-analytics-category="contact">
              <BriefcaseBusiness aria-hidden="true" />
              <span>{t('floatingContact.whatsappBusiness')}<small>{siteMeta.phone}</small></span>
            </a>
          </div>

          <button
            type="button"
            className="floating-contact__hide"
            onClick={() => {
              setHidden(true);
              document.activeElement?.blur?.();
            }}
          >
            <EyeOff aria-hidden="true" />
            {t('floatingContact.hide')}
          </button>
        </section>
      ) : null}
    </div>
  );
};
