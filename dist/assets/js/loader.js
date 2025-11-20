(() => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.classList.add('loader-idle');
  const soundEnabled = true;
  let visible = false;
  const playSound = () => {
    const src = '/assets/audio/load-sound.mp3';
    const audio = new Audio();
    audio.volume = 0.15;
    audio.src = src;
    audio.addEventListener('error', () => {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(880, ctx.currentTime);
        g.gain.setValueAtTime(0.001, ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
        g.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.20);
        o.connect(g); g.connect(ctx.destination);
        o.start(); o.stop(ctx.currentTime + 0.22);
      } catch {}
    });
    audio.play().catch(() => {});
  };
  const showLoader = () => {
    if (visible) return;
    visible = true;
    loader.classList.remove('loader-idle');
    loader.classList.remove('hidden');
    loader.setAttribute('aria-hidden', 'false');
    if (soundEnabled) playSound();
  };
  const hideLoader = () => {
    if (!visible) {
      loader.setAttribute('aria-hidden', 'true');
      loader.remove();
      return;
    }
    loader.setAttribute('aria-hidden', 'true');
    loader.classList.add('hidden');
    setTimeout(() => { loader.remove(); }, 500);
  };
  const maybeShow = () => {
    if (document.readyState === 'complete') return;
    showLoader();
  };
  const timer = setTimeout(maybeShow, 400);
  const onReady = () => {
    clearTimeout(timer);
    hideLoader();
  };
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', onReady, { once: true });
  }
})();
