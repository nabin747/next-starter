# Access Control & Routing Pattern

## Goals

- Clearly separate public vs. protected pages.
- Keep auth logic out of UI components; enforce at the edge (middleware) and in services.
- Provide a predictable way for coworkers to onboard and extend access rules quickly.

## Public vs. Protected

- **Public**: marketing pages (`/`) under `(public)`, health/auth routes, static assets.
- **Protected**: dashboard and any routes that require a verified JWT (currently `/dashboard` via matcher) under `(private)`.

## Middleware

- `middleware.ts` inspects incoming requests:
  - Skips known public paths and Next.js assets.
  - Reads JWT from `Authorization: Bearer` or `token` cookie.
  - Verifies via `lib/auth.verifyAuthToken`.
  - On success: forwards request and sets `x-user-email` header for downstream handlers if present.
  - On failure/missing token: redirects to `/` with `?error=unauthorized` (customize to a dedicated login page).
- To protect more pages, extend `PUBLIC_PATHS` or `config.matcher` in `middleware.ts`.

## Services + Hooks

- Keep token issuance/validation in `/app/api/auth` + `lib/auth`.
- Services/hooks stay the same; middleware keeps UI components free from gatekeeping logic.

## UX Recommendations

- Add a login page that POSTs to `/api/auth`, stores the returned cookie, then routes to `/dashboard`.
- Surface auth errors via toast/banner components using the normalized errors from `services/api.ts` and `hooks/useApi.ts`.

## Quick Onboarding for Coworkers

1. Add protected routes to the matcher and ensure they can read `x-user-email` if needed.
2. Expose new domain services under `services/` so shared patterns remain consistent.
3. Document any access rules or role checks per route in this file for fast reference.
