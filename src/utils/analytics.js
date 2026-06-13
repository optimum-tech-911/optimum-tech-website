import { hasConsent } from './cookies.js';

const SESSION_KEY = 'ot_analytics_session';
const MAX_LABEL_LENGTH = 120;

const getSessionId = () => {
  if (typeof window === 'undefined') return null;

  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;

    const value = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_KEY, value);
    return value;
  } catch {
    return null;
  }
};

const cleanText = (value, limit = MAX_LABEL_LENGTH) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, limit);

const cleanTarget = (value) => {
  if (!value || typeof window === 'undefined') return null;

  try {
    const url = new URL(value, window.location.origin);
    if (!['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)) return null;
    return `${url.protocol}//${url.host}${url.pathname}`.slice(0, 500);
  } catch {
    return null;
  }
};

export const trackBehavior = async ({ eventName, category, label, projectId = null, targetUrl = null }) => {
  if (typeof window === 'undefined' || !hasConsent('analytics')) return;
  if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/auth')) return;

  const sessionId = getSessionId();
  if (!sessionId) return;

  const payload = {
    p_event_name: cleanText(eventName, 50),
    p_category: cleanText(category, 50),
    p_label: cleanText(label),
    p_project_id: cleanText(projectId, 100) || null,
    p_path: cleanText(window.location.pathname, 500),
    p_target_url: cleanTarget(targetUrl),
    p_session_id: sessionId,
  };

  try {
    const { supabase } = await import('../../supabaseClient');
    if (!supabase) return;
    await supabase.rpc('record_analytics_event', payload);
  } catch (error) {
    if (import.meta.env.DEV) console.warn('Analytics event was not recorded:', error);
  }
};

export const trackFirstPartyPageView = () =>
  trackBehavior({
    eventName: 'page_view',
    category: 'navigation',
    label: document.title || window.location.pathname,
  });

const getClickDetails = (element) => {
  const projectId = element.dataset.analyticsProject || null;
  const explicitCategory = element.dataset.analyticsCategory;
  const label =
    element.dataset.analyticsLabel ||
    element.getAttribute('aria-label') ||
    element.getAttribute('title') ||
    element.textContent;

  return {
    eventName: 'click',
    category: explicitCategory || (projectId ? 'project' : 'button'),
    label: cleanText(label) || element.tagName.toLowerCase(),
    projectId,
    targetUrl: element.getAttribute('href'),
  };
};

export const installClickTracking = () => {
  if (typeof document === 'undefined') return () => {};

  const handleClick = (event) => {
    const element = event.target.closest('a, button, [data-analytics-label]');
    if (!element || element.dataset.analyticsIgnore === 'true') return;
    trackBehavior(getClickDetails(element));
  };

  document.addEventListener('click', handleClick, { capture: true });
  return () => document.removeEventListener('click', handleClick, { capture: true });
};
