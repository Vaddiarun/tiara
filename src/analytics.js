// --- IDs (replace with yours) ---
export const GA_ID = 'G-XXXXXXXXXX';          // GA4 Measurement ID
export const FB_PIXEL_ID = 'YOUR_PIXEL_ID';   // Meta Pixel (optional)

// --- UTM capture (stored for the session) ---
export function persistUtmParams() {
  const p = new URLSearchParams(window.location.search);
  const utm = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content']
    .reduce((acc,k) => ({ ...acc, [k]: p.get(k) || sessionStorage.getItem(k) || null }), {});
  Object.entries(utm).forEach(([k,v]) => v && sessionStorage.setItem(k, v));
  return utm;
}
export function getUtmParams() {
  const keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
  return keys.reduce((acc,k)=> ({...acc, [k]: sessionStorage.getItem(k) || null}), {});
}

// --- Pageview (GA4 + Meta) ---
export function trackPageview(url) {
  try {
    if (window.gtag && GA_ID) {
      window.gtag('event', 'page_view', { page_path: url, ...getUtmParams() });
    }
    if (window.fbq && FB_PIXEL_ID) {
      window.fbq('track', 'PageView');
    }
  } catch {}
}

// --- Vercel custom events (and mirror to GA4) ---
export function trackEvent(name, props = {}) {
  try {
    // Vercel Web Analytics custom event
    // eslint-disable-next-line no-undef
    if (window.va && typeof window.va.track === 'function') {
      window.va.track(name, { ...props, ...getUtmParams() });
    }
  } catch {}
  try {
    if (window.gtag && GA_ID) {
      window.gtag('event', name, props); // mirrors into GA4
    }
  } catch {}
  try {
    if (window.fbq && FB_PIXEL_ID) {
      // map common events (adjust as needed)
      const map = { lead: 'Lead', booking: 'CompleteRegistration' };
      const std = map[name];
      if (std) window.fbq('track', std, props);
      else window.fbq('trackCustom', name, props);
    }
  } catch {}
}

// --- Convenience wrappers ---
export const trackContactClick = (channel) =>
  trackEvent('contact_click', { channel });

export const trackLead = ({ method='form', service } = {}) =>
  trackEvent('lead', { method, service });

export const trackBooking = ({ service, value, currency='INR' } = {}) =>
  trackEvent('booking', { service, value, currency });
