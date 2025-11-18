export const GA_ID = process.env.GA_MEASUREMENT_ID;

export function pageview(url: string) {
  if (!GA_ID || typeof window === 'undefined' || !(window as any).gtag) return;
  (window as any).gtag('config', GA_ID, { page_path: url });
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (!GA_ID || typeof window === 'undefined' || !(window as any).gtag) return;
  (window as any).gtag('event', action, params);
}
