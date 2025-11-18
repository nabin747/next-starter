# Architecture Overview

## Goals

- RSC-first, ISR/SSG by default with selective hydration for interactive islands.
- Separation of concerns: routing/layouts ↔ UI primitives ↔ services/hooks ↔ state.
- Secure by default: JWT-backed APIs, middleware gating protected pages.
- DX-friendly: strict types, path aliases, lint/test/format/CI baked in.

## Layout & Routing

- App Router under `/app`.
- Public: landing (`/`) under `(public)`, health/auth APIs.
- Protected: `/dashboard` under `(private)` guarded by `middleware.ts` (JWT from cookie/Authorization). Extend matcher/public list as needed.
- Shared chrome in `app/layout.tsx`; segment-level `error.tsx` and `loading.tsx` where applicable (dashboard has an error boundary at `app/(private)/error.tsx`).

## UI System

- ShadCN-inspired primitives in `components/ui` (button, badge, card, skeleton) using CVA + tailwind-merge + Lucide icons.
- Layout components in `components/layout`.
- Styling via Tailwind v4 and theme tokens in `app/globals.css`.

## Data & APIs

- Transport: `services/api.ts` wraps `fetch` with timeouts, optional retries, JSON parsing, `ApiError` + `normalizeApiError`, and helpers (`apiClient.get/post/...`).
- Hooks: `hooks/useApi.ts` for client components (loading/error/data, `execute`, callbacks).
- Domain services: `services/metrics.ts`, `services/projects.ts`, etc., to keep components lean and typed.
- API routes: `/app/api/auth` (Zod validation + JWT issuance), `/app/api/health`.
- Auth helpers in `lib/auth.ts`; validations in `lib/validations/`.

## State

- Client-only interactive islands use Zustand (`store/useCounterStore.ts`).

## Error Handling

- Transport errors normalized by `normalizeApiError`; surface via hooks and future toast/banner.
- Render errors caught by segment `error.tsx` (e.g., dashboard).
- Routing/error patterns documented in `docs/ROUTING_AND_ERRORS.md`.

## SEO & Analytics

- Metadata defaults + OG/Twitter via `baseMetadata()` in `app/layout.tsx`.
- JSON-LD helpers in `lib/seo.ts`; injected on `(public)/page.tsx`.
- Robots/sitemap routes under `app/robots.txt` and `app/sitemap.xml`.
- GTM/GA bootstraps env-guarded in `app/layout.tsx`; client helpers in `lib/gtm.ts` and `lib/analytics.ts`.

## Tooling & CI

- ESLint (`pnpm lint`), TypeScript strict (`pnpm typecheck`), Jest + RTL (`pnpm test`), Prettier (`pnpm format`).
- GitHub Actions CI runs lint → typecheck → tests (coverage) → format check → build.

## Developer Workflow

- Setup and commands in `docs/DEVELOPER_ONBOARDING.md`.
- Access control details in `docs/ACCESS_CONTROL.md`.
- API patterns in `docs/API_ARCHITECTURE.md`.
- SEO/analytics guide in `docs/SEO_ANALYTICS.md`.
