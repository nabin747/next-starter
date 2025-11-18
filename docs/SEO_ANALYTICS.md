# SEO & Analytics Guide

## Env

- `SITE_URL` (canonical base, no trailing slash)
- `GTM_ID` (optional, enable Google Tag Manager)
- `GA_MEASUREMENT_ID` (optional, enable GA4; recommended via GTM)

## Metadata & OG

- Defaults set in `app/layout.tsx` via `baseMetadata()` from `lib/seo.ts`.
- Customize per page with `generateMetadata` if you add more routes.
- OG/Twitter images default to `${SITE_URL}/og-image.png` (replace as needed).

## Structured Data

- Helpers in `lib/seo.ts` build `Organization`, `WebSite`, and `WebPage` JSON-LD.
- Landing page injects JSON-LD in `(public)/page.tsx`.
- For new pages, add:
  ```tsx
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify([buildPageJsonLd({...})]) }}
  />
  ```

## Robots & Sitemap

- `app/robots.txt/route.ts` allows all and disallows `/dashboard`; updates with `SITE_URL`.
- `app/sitemap.xml/route.ts` lists `/` and `/dashboard`; extend as routes grow.

## Tagging

- GTM bootstrap lives in `app/layout.tsx` (env-guarded). Use `lib/gtm.ts` to `gtmPush` events client-side.
- GA bootstrap optional; uses `GA_MEASUREMENT_ID` if set. Use `lib/analytics.ts` for `pageview`/`trackEvent`.
- Load scripts `afterInteractive` to avoid blocking render.

## Privacy & Consent

- Gate dataLayer/gtag pushes behind consent if your product requires it.
- Respect `Do Not Track` and regional compliance policies.

## Checklist (add to PRs)

- [ ] Metadata: title/description, OG/Twitter images true to content.
- [ ] JSON-LD: correct type and URL for the page.
- [ ] Robots/sitemap updated for new public routes; protected paths disallowed.
- [ ] Env vars set in deployment (`SITE_URL`, GTM/GA as needed).
- [ ] Analytics/consent tested in browser (scripts present only when env vars set).
