# Routing & Error Handling Plan

## Route Groups & Access

- **Public**: `/`, `/api/health`, `/api/auth`, assets (`/_next`, `/favicon.ico`). Grouped under `(public)`.
- **Protected**: `/dashboard` (and children) are guarded in `middleware.ts`. Extend `PUBLIC_PATHS` or `matcher` to add/remove coverage. Grouped under `(private)`.
- **Pattern**: Keep dashboard under `(private)/dashboard` (or rename the group to `(app)` if scope widens). Marketing/public pages stay in `(public)` for clarity.

## Middleware (auth gate)

- Located at `middleware.ts`.
- Accepts JWT from `Authorization: Bearer` or `token` cookie.
- On success: passes through and annotates request with `x-user-email`.
- On failure: redirects to `/` with `?error=unauthorized` (swap to `/login` when available).

## Data Fetching Errors

- Transport: `services/api.ts` uses `ApiError` + `normalizeApiError` with optional retry/timeout.
- Hooks: `hooks/useApi.ts` exposes `error`, `loading`, `data`, and `onError` so UI can funnel errors into toasts/banners.
- UI: render loading skeletons; show normalized error messages in a toast/banner component (to add next).

## Render Errors

- Route-level boundaries: `app/(private)/error.tsx` handles render-time failures with a retry + home link.
- Add more `error.tsx` per segment as needed (e.g., marketing, auth).

## Developer Workflow

- Add new protected routes: update `matcher` and avoid duplicating auth checks inside components.
- Add new public routes: append to `PUBLIC_PATHS` if they need to bypass middleware.
- Keep all API calls in services/hooks; components focus on rendering normalized states (data | loading | error).
