# API Wrapper & Hook Checklist

- [ ] Define API base URL in env (`NEXT_PUBLIC_API_URL` or `API_URL`).
- [x] Centralize transport in `services/api.ts` with timeout, retry, JSON parsing, and `ApiError`.
- [x] Normalize errors with `normalizeApiError` for consistent UI messaging.
- [x] Expose typed helpers (`get/post/put/patch/delete`) and generic `request`.
- [ ] Wrap endpoints in domain services with typed request/response shapes.
- [x] Create reusable client hook (`hooks/useApi.ts`) for loading/error/data and imperative `execute`.
- [ ] Add UI toast/banner component that consumes hook errors for user-friendly messaging.
- [ ] Add tests for service + hook flows (happy path, 4xx/5xx, timeout).
- [ ] Document usage patterns and examples for new developers.
- [x] Define access control rules (public vs. protected) in `middleware.ts` and document in `docs/ACCESS_CONTROL.md`.
- [ ] Add onboarding notes so teammates know how to add/remove protected routes and surface auth errors in UI.
- [x] Add routing + error-handling guidelines in `docs/ROUTING_AND_ERRORS.md` and ensure segment-level `error.tsx` exists for protected areas.
- [x] Create `docs/SEO_ANALYTICS.md` and ensure metadata/OG/JSON-LD, robots/sitemap, and GTM/GA env hooks exist.
- [ ] Provide/verify OG image at `public/og-image.png` and align content per page.
