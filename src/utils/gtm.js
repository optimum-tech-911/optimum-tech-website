let initialized = false;

export const pushEvent = (event) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
};

export const initGTM = ({ gtmId = 'GTM-XXXXXXX', gaId = 'G-XXXXXXXXXX' } = {}) => {
  if (initialized) return;
  const useGtm = gtmId && !/XXXXXXX/.test(gtmId);
  window.dataLayer = window.dataLayer || [];
  if (useGtm) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(s);
  } else if (gaId && !/XXXXXXXXXX/.test(gaId)) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaId);
  }
  initialized = true;
};
