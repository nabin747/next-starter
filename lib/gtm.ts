export const GTM_ID = process.env.GTM_ID;

export function gtmPush(event: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(event);
}
