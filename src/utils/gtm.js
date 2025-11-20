let initialized = false;

export const pushEvent = (event) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
};

export const initGTM = ({ gtmId = "GTM-XXXXXXX", gaId = "G-XXXXXXXXXX" } = {}) => {
  if (initialized) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "ot_consent_checked" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(s);
  initialized = true;
  pushEvent({ event: "ga4_initialize", ga_measurement_id: gaId });
};