import React from 'react';
import { getPrefs, setPrefs } from '../utils/cookies.js';
import { useI18n } from '../i18n.jsx';

export const CookieSettings = () => {
  const { t } = useI18n();
  const [open, setOpen] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(() => !!getPrefs()?.analytics);
  const [showReopen, setShowReopen] = React.useState(() => !getPrefs());
  const save = () => {
    setPrefs({ analytics });
    setOpen(false);
    setShowReopen(false);
  };
  return (
    <>
      {showReopen && (
        <button
          type="button"
          className="ot-cookie-reopen"
          aria-label={t('cookies.settings')}
          onClick={() => setOpen(true)}
        >
          {t('cookies.reopen')}
        </button>
      )}
      {open && (
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
              <button type="button" className="ot-btn ot-btn-primary" onClick={save}>
                {t('cookies.save')}
              </button>
              <button
                type="button"
                className="ot-btn ot-btn-secondary"
                onClick={() => setOpen(false)}
              >
                {t('cookies.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
