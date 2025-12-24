const KEY = 'ot_cookies_prefs';

export const getPrefs = () => {
  try {
    const v = localStorage.getItem(KEY);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
};

export const setPrefs = (prefs) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch (err) {
    /* ignore localStorage write errors */
  }
};

export const hasConsent = (category) => {
  const prefs = getPrefs();
  if (!prefs) return false;
  return !!prefs[category];
};
