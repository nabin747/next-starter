# Next.js 16 Scalable Starter

Opinionated, production-ready Next.js 16 starter using the App Router, TypeScript, ShadCN-flavored UI primitives, Lucide icons, JWT-secured API routes, Zustand state, ISR/RSC defaults, SEO-friendly metadata/JSON-LD, and automated testing + CI.

## Stack

- Next.js 16 (App Router, RSC, ISR/SSG, image optimization)
- TypeScript with strict types, path aliases (`@/*`)
- Tailwind CSS v4 + ShadCN-inspired primitives + Lucide icons
- Zustand for lightweight client state
- Jest + React Testing Library for unit/integration tests
- GitHub Actions CI (lint, typecheck, tests + coverage, format check, build)
- Typed API transport + reusable `useApi` hook for consistent data fetching & errors
- Edge middleware for public vs. protected routes (JWT)

## Folder Structure

```
app/
  api/                 # Route handlers (JWT auth, health)
  (public)/page.tsx    # Marketing/landing (ISR)
  (private)/dashboard  # Server-rendered dashboard with client islands
  (private)/error.tsx  # Protected segment error boundary
  robots.txt/route.ts  # Robots directives
  sitemap.xml/route.ts # Sitemap
  globals.css          # Tailwind baseline + theme tokens
  layout.tsx           # Root layout + metadata + GTM/GA bootstraps
components/
  layout/              # Layout primitives (header)
  ui/                  # Reusable ShadCN-style primitives
lib/                   # Utils, auth helpers, validation, SEO helpers
hooks/                 # Client-only hooks (e.g., useApi)
services/              # Data fetching / domain services used by RSC
store/                 # Zustand stores
__tests__/             # Jest + RTL coverage for UI, store, API
.github/workflows/ci.yml # CI pipeline
docs/                  # Architecture plans & checklists
middleware.ts          # Access control (protects /dashboard by JWT)
```

### Project Tree (key files)

```
app/
├─ (public)/
│  └─ page.tsx              # Marketing/landing (ISR)
├─ (private)/
│  ├─ dashboard/
│  │  ├─ client-counter.tsx # Zustand client island
│  │  ├─ loading.tsx        # Suspense fallback
│  │  └─ page.tsx           # Server-rendered dashboard (ISR)
│  └─ error.tsx             # Segment error boundary
├─ api/
│  ├─ auth/route.ts         # JWT issuance/verification
│  └─ health/route.ts       # Health check
├─ robots.txt/route.ts      # Robots
├─ sitemap.xml/route.ts     # Sitemap
├─ layout.tsx               # Root layout + header + SEO + GTM/GA
├─ globals.css              # Tailwind v4 theme
└─ favicon.ico
components/
├─ layout/site-header.tsx
└─ ui/                      # ShadCN-style primitives
services/
├─ api.ts                   # Typed fetch wrapper + retry
├─ metrics.ts               # RSC data service
└─ projects.ts              # RSC data service
hooks/
└─ useApi.ts                # Client data hook
store/
└─ useCounterStore.ts       # Zustand store
lib/
├─ auth.ts                  # JWT helpers
├─ utils.ts                 # cn/twMerge
├─ validations/auth.ts      # Zod schema
├─ seo.ts                   # Metadata + JSON-LD builders
├─ gtm.ts                   # dataLayer helper
└─ analytics.ts             # GA helper
__tests__/
├─ auth-route.test.ts
├─ button.test.tsx
└─ useCounterStore.test.ts
.github/workflows/ci.yml    # CI pipeline
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Visit http://localhost:3000 for the marketing page and http://localhost:3000/dashboard for the dashboard.

### Scripts

- `pnpm dev` – start dev server
- `pnpm lint` – ESLint (Next.js rules)
- `pnpm typecheck` – strict TypeScript
- `pnpm test` – Jest + React Testing Library (coverage enabled in CI)
- `pnpm format` / `pnpm format:check` – Prettier
- `pnpm build` – production build
- `pnpm ci` – run lint → typecheck → tests w/ coverage → build

### Environment

Create `.env.local` from `.env.example`:

```
AUTH_SECRET=your-secure-key
SITE_URL=https://your-site.com
GTM_ID=GTM-XXXX (optional)
GA_MEASUREMENT_ID=G-XXXX (optional)
```

## Architecture Notes

- **Routing & layouts**: App Router under `/app`, shared chrome via `app/layout.tsx`. Marketing page uses ISR (`revalidate = 60`); dashboard revalidates every 30s. Public pages live in `(public)`; protected dashboard in `(private)`.
- **Data fetching**: Server Components default to cached data (`services/metrics.ts`, `services/projects.ts`) using `React.cache` and `ISR`. Client-only islands hydrate where needed (see `app/(private)/dashboard/client-counter.tsx`).
- **State management**: Zustand store (`store/useCounterStore.ts`) hydrates only when needed; compatible with concurrent rendering/Suspense.
- **UI system**: ShadCN-style primitives (`components/ui`) using `class-variance-authority`, `tailwind-merge`, and Lucide icons for consistent, reusable components.
- **API transport**: `services/api.ts` is the typed wrapper (timeouts, retries, error normalization) with helpers (`apiClient.get/post/...`). `hooks/useApi.ts` provides reusable loading/error/data management for client components.
- **API routes**: `/app/api/auth` issues/verifies JWTs with Zod validation; `/app/api/health` for health checks. Use `Authorization: Bearer <token>` for authenticated requests. Add domain services under `services/` to avoid UI-level fetch logic.
- **Access control**: `middleware.ts` protects `/dashboard` (add more via matcher/public lists). Reads JWT from cookie or `Authorization` header and redirects unauthorized users to `/`. See `docs/ACCESS_CONTROL.md`.
- **Routing & errors**: Route grouping keeps dashboard isolated from public pages; render-time issues fall back to `app/(private)/error.tsx`. See `docs/ROUTING_AND_ERRORS.md` for how to extend public/protected routes and handle errors (data + render).
- **SEO/Analytics**: Metadata + OG defaults via `baseMetadata` in `app/layout.tsx`; JSON-LD helpers in `lib/seo.ts`; robots/sitemap routes in `app/robots.txt` and `app/sitemap.xml`; GTM/GA hooks in layout and helpers (`lib/gtm.ts`, `lib/analytics.ts`). See `docs/SEO_ANALYTICS.md`.
- **Security**: JWT signing secret pulled from env; payload validation via Zod; cookies are httpOnly/lax in `POST /api/auth`.
- **Performance**: RSC-first rendering, selective hydration, ISR on marketing/dashboard, dynamic imports for client islands, and image optimization via Next `<Image>` when needed.
- **Testing**: Jest config in `jest.config.cjs`, setup in `jest.setup.ts`. Sample coverage for UI, store, and API route logic.
- **CI/CD**: GitHub Actions workflow installs deps, lints, type-checks, runs tests with coverage, formats, then builds. Ready to hook into Vercel/AWS deployment.
- **Onboarding**: See `docs/DEVELOPER_ONBOARDING.md` for daily workflows, env setup, and how to add public/protected routes and services.
- **Architecture map**: See `docs/ARCHITECTURE_OVERVIEW.md` for the high-level structure across routing, UI, services/hooks, auth, SEO, and tooling.
- **Git hooks**: Husky enforces `lint-staged` on commit, tests on push, and Conventional Commit messages via commitlint.

## API Architecture

- See `docs/API_ARCHITECTURE.md` for the layered plan and examples.
- Use `apiClient` helpers for all HTTP calls; wrap them in domain-specific services with typed contracts.
- In client components, prefer `useApi` for loading/error state and normalized errors that can flow into banners/toasts.

## Extending

- Add new primitives to `components/ui` for shared styling.
- Place domain/data logic in `services/` so RSCs remain lean.
- Add more routes under `app/(group)/` to scope layouts and middleware.
- Protect additional APIs by reusing helpers in `lib/auth.ts` + `lib/validations`.
- Update SEO assets (OG image), JSON-LD, and sitemap/robots when adding public routes.
