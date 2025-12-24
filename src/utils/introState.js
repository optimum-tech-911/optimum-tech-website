const INTRO_KEY = 'introUnlocked';

const hasWindow = () => typeof window !== 'undefined';

export const isIntroUnlocked = () => {
  if (!hasWindow()) return false;
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
};

export const persistIntroUnlocked = () => {
  if (!hasWindow()) return;
  try {
    window.sessionStorage.setItem(INTRO_KEY, '1');
  } catch {
    // ignore storage errors (private mode, etc.)
  }
  try {
    window.dispatchEvent(new CustomEvent('intro:unlocked'));
  } catch {
    // ignore dispatch errors
  }
};

export const subscribeToIntroUnlock = (callback) => {
  if (!hasWindow()) return () => {};
  const handler = () => callback?.();
  window.addEventListener('intro:unlocked', handler);
  return () => window.removeEventListener('intro:unlocked', handler);
};
