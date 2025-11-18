# Developer Onboarding & Operations

## Quick Start

1. Install: `pnpm install`
2. Dev server: `pnpm dev`
3. Lint / typecheck / tests: `pnpm lint`, `pnpm typecheck`, `pnpm test --runInBand`
4. Format: `pnpm format`
5. Build preview: `pnpm build`
6. Env: copy `.env.example` to `.env.local` and set `AUTH_SECRET`; add `SITE_URL`, `GTM_ID`, `GA_MEASUREMENT_ID` if using analytics.
7. Git hooks: Husky runs `lint-staged` at pre-commit, `pnpm test --runInBand` at pre-push, and commitlint (Conventional Commits) at commit-msg. `pnpm install` wires hooks via the `prepare` script.

## Architecture Landmarks

- **Routing**: `/` is public (in `(public)`); `/dashboard` is protected (in `(private)`) by `middleware.ts` via JWT. See `docs/ACCESS_CONTROL.md`.
- **API transport**: `services/api.ts` (timeouts, retry, normalized errors); `hooks/useApi.ts` for client consumers.
- **UI**: ShadCN-style primitives in `components/ui`; shared chrome in `components/layout`.
- **State**: `store/` (Zustand) for client-only interactive islands.
- **Data services**: `services/` for typed calls/normalizers used by RSC/clients.
- **Error boundaries**: Segment-level `error.tsx` under `(private)`; patterns in `docs/ROUTING_AND_ERRORS.md`.
- **SEO/Analytics**: Defaults/OG in `app/layout.tsx`, JSON-LD via `lib/seo.ts`, robots/sitemap routes, GTM/GA helpers in `lib/gtm.ts` and `lib/analytics.ts`. See `docs/SEO_ANALYTICS.md`.
- **Tests/CI**: Jest + RTL; CI workflow in `.github/workflows/ci.yml`.

## Common Operations

- **Add a protected route**: place it under the `(private)` group (or expand `middleware.ts` matcher). Keep fetch logic in `services/`; use `useApi` in client components.
- **Add a public route**: place it under `(public)`; update `PUBLIC_PATHS` in `middleware.ts` if it must bypass auth. Provide `loading.tsx`/`error.tsx` where useful.
- **Call an API**:

  ```ts
  import { apiClient } from '@/services/api';
  import { useApi } from '@/hooks/useApi';

  // Server/RSC
  const res = await apiClient.get<MyType>('/api/health');

  // Client
  const { data, error, execute } = useApi<MyType>({
    request: { path: '/api/auth', method: 'POST', body: { email, password } },
    onError: (err) => toast(err.message),
  });
  ```

- **Auth**: JWT issued at `/api/auth` (Zod-validated). Middleware reads cookie/Authorization and injects `x-user-email`.
- **Deploy**: Ensure `AUTH_SECRET` and `SITE_URL` set in environment; add GTM/GA ids if used. CI already runs lint/type/test/format/build. Connect repo to Vercel/AWS as needed.
- **Commit messages**: Use Conventional Commits (`feat: ...`, `fix: ...`, `chore: ...`); commitlint enforces this via Husky.

## Team Guidance

- Keep UI free of fetch/auth logic; add services and use hooks for state + errors.
- Keep public/protected routes explicit; document any role-based rules in `docs/ACCESS_CONTROL.md`.
- When adding features, update `docs/CHECKLIST.md` items (toasts, service tests, domain contracts, SEO/analytics).
- Log significant errors inside boundaries/providers; avoid console noise in components.
