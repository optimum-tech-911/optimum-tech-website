import React from 'react';
import { setPrefs, getPrefs, hasConsent } from '../utils/cookies.js';
import { initGTM } from '../utils/gtm.js';
import '../styles/cookies.css';
import { useI18n } from '../i18n.jsx';

export const CookieBanner = () => {
  const { t } = useI18n();
  const [visible, setVisible] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(() => hasConsent('analytics'));
  const [canReopen, setCanReopen] = React.useState(() => !getPrefs());

  React.useEffect(() => {
    const prefs = getPrefs();
    if (prefs && prefs.analytics) initGTM({ gaId: 'G-81DWTXG9MZ' });
    if (prefs) setCanReopen(false);
  }, []);

  React.useEffect(() => {
    const prefs = getPrefs();
    if (prefs) return; // already decided, don't show banner
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const acceptAll = () => {
    setPrefs({ analytics: true });
    setAnalytics(true);
    initGTM({ gaId: 'G-81DWTXG9MZ' });
    setVisible(false);
    setCanReopen(false);
  };

  const rejectAll = () => {
    setPrefs({ analytics: false });
    setAnalytics(false);
    setVisible(false);
    setCanReopen(false);
  };

  const saveSettings = () => {
    setPrefs({ analytics });
    if (analytics) initGTM({ gaId: 'G-81DWTXG9MZ' });
    setOpenSettings(false);
    setVisible(false);
    setCanReopen(false);
  };

  return (
    <>
      {visible && (
        <div className="ot-cookie-banner ot-animate-in" role="dialog" aria-live="polite">
          <div className="ot-cookie-content">
            <div className="ot-cookie-title">{t('cookies.bannerTitle')}</div>
            <p className="ot-cookie-text">{t('cookies.bannerText')}</p>
            <div className="ot-cookie-actions">
              <button type="button" className="ot-btn ot-btn-primary" onClick={acceptAll}>
                {t('cookies.acceptAll')}
              </button>
              <button type="button" className="ot-btn ot-btn-secondary" onClick={rejectAll}>
                {t('cookies.rejectAll')}
              </button>
              <button
                type="button"
                className="ot-btn ot-btn-tertiary"
                onClick={() => setOpenSettings(true)}
              >
                {t('cookies.settings')}
              </button>
            </div>
          </div>
        </div>
      )}
      {openSettings && (
        <div className="ot-cookie-modal" role="dialog" aria-modal="true">
          <div className="ot-modal-card ot-animate-in">
            <h2 className="ot-modal-title">{t('cookies.settingsTitle')}</h2>
            <div className="ot-setting">
              <div>
                <div className="ot-setting-title">{t('cookies.analyticsTitle')}</div>
                <div className="ot-setting-desc">{t('cookies.analyticsDesc')}</div>
              </div>
              <label className="ot-switch">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                <span className="ot-slider" />
              </label>
            </div>
            <div className="ot-modal-actions">
              <button type="button" className="ot-btn ot-btn-primary" onClick={saveSettings}>
                {t('cookies.save')}
              </button>
              <button
                type="button"
                className="ot-btn ot-btn-secondary"
                onClick={() => setOpenSettings(false)}
              >
                {t('cookies.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
      {canReopen && (
        <button
          type="button"
          className="ot-cookie-reopen"
          aria-label={t('cookies.settings')}
          onClick={() => setOpenSettings(true)}
        >
          {t('cookies.reopen')}
        </button>
      )}
    </>
  );
};
