let initialized = false;
export const GA_MEASUREMENT_ID = 'G-MW97M0ZCQG';

export const pushEvent = (event) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
};

export const initGTM = ({ gtmId = 'GTM-XXXXXXX', gaId = 'G-XXXXXXXXXX' } = {}) => {
  if (typeof window === 'undefined') return;
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
    window.gtag('config', gaId, { send_page_view: false });
  }
  initialized = true;
};

export const trackPageView = ({ gaId = GA_MEASUREMENT_ID, path, title, location } = {}) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'page_view', {
    page_title: title || document.title,
    page_path: path || window.location.pathname,
    page_location: location || window.location.href,
    send_to: gaId,
  });
};
