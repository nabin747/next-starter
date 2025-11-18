# API Architecture Plan (Next.js 16 + TypeScript)

## Goals

- Strong separation of concerns: UI ↔ hooks ↔ service layer ↔ transport.
- Typed, consistent responses and errors.
- Retry/timeout capability for resilience.
- Works in RSC and client components; server favors `fetch`.

## Layers

1. **Transport (services/api.ts)**
   - `request<TData, TBody>(config)` central wrapper around `fetch`.
   - Supports params, JSON body, headers, timeout, optional retry, Next.js `next`/`cache`.
   - Parses JSON/text, throws `ApiError` with status/info, exposes `normalizeApiError`.
   - Helpers: `apiClient.get/post/put/patch/delete`.

2. **Domain Services (e.g., services/projects.ts, services/metrics.ts)**
   - Call `apiClient` with typed contracts per endpoint.
   - Export types (`Project`, etc.) and narrow transforms (normalizers) so UI never handles raw wire-format.
   - Cache/ISR at this layer for RSC.

3. **Hooks (hooks/useApi.ts)**
   - Client-only hook wrapping `apiClient`.
   - Manages loading/error/data; `execute` accepts overrides per call.
   - Lifecycle options: `executeOnMount`, `onSuccess`, `onError`.
   - Standardized error shape (`NormalizedError`) for toasts/UI.

4. **UI / Components**
   - Consume hooks or service functions; render states (loading, errors, data).
   - No fetch/headers logic inside components.

## Error Handling

- `ApiError` for non-2xx or timeouts; `normalizeApiError` returns `{ message, status?, info? }`.
- Components can surface errors via toasts/banners/dialogs.
- Optional global error context can listen for hook errors and route them to a toast system. Pair with access control in `middleware.ts` so unauthorized requests never reach protected UI.

## Retry & Resilience

- `request` accepts `retry: { attempts, delayMs }` and `timeoutMs`.
- Use sparsely: e.g., idempotent GETs. Avoid for non-idempotent writes unless business rules allow.

## Type Safety

- All `apiClient` calls are generic: `apiClient.get<MyType>("/path")`.
- Domain services export response/body types to avoid duplication.
- Hooks are generic: `useApi<MyType, MyBody>({ request: { ... } })`.

## Usage Examples

- **Service (server or client)**:

  ```ts
  import { apiClient } from '@/services/api';
  export type User = { id: string; email: string };
  export async function fetchUsers() {
    return apiClient.get<User[]>('/api/users', { cache: 'no-store' });
  }
  ```

- **Hook in client component**:

  ```ts
  'use client';
  import { useApi } from '@/hooks/useApi';

  const { data, loading, error, execute } = useApi<User[]>({
    request: { path: '/api/users', method: 'GET', retry: { attempts: 2 } },
    executeOnMount: true,
  });
  ```

- **One-off POST with override**:
  ```ts
  await execute({ path: '/api/auth', method: 'POST', body: { email, password } });
  ```

## Public vs Protected Routes

- Public pages: landing, health, auth endpoints.
- Protected pages (e.g., `/dashboard`) are enforced at the edge in `middleware.ts`, which verifies JWTs via `lib/auth` and redirects unauthorized requests. Extend the matcher or `PUBLIC_PATHS` as you add new routes.

## Testing Guidance

- Unit test `services/api.ts` with mocked `fetch` (or `msw`) to assert parsing/error normalization.
- Hook tests: render with RTL, stub `apiClient.request`, assert loading/data/error flows.
- Integration: contract tests against real API routes.
