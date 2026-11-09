(() => {
  'use strict';
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const platform = isIOS ? 'ios'
    : /Android/.test(ua) ? 'android'
    : /Windows/.test(ua) ? 'windows'
    : /Mac/.test(ua) ? 'mac' : null;
  const card = platform && document.querySelector('[data-platform="' + platform + '"]');
  if (card) {
    card.classList.add('current');
    const label = card.querySelector('.detected');
    if (label) label.hidden = false;
  }
  const installLabel = document.querySelector('[data-install-label]');
  if (installLabel && (isIOS || platform === 'android')) {
    installLabel.textContent = 'Ajouter à l’écran d’accueil';
  }
})();
