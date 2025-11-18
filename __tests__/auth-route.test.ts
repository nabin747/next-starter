import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { signAuthToken, verifyAuthToken } from '@/lib/auth';

vi.mock('@/lib/auth', () => ({
  signAuthToken: vi.fn(),
  verifyAuthToken: vi.fn(),
}));

type RouteHandlers = typeof import('@/app/api/auth/route');

describe('auth route', () => {
  const email = 'dev@example.com';
  let POST: RouteHandlers['POST'];
  let GET: RouteHandlers['GET'];

  beforeAll(async () => {
    const routes = await import('@/app/api/auth/route');
    POST = routes.POST;
    GET = routes.GET;
  });

  beforeEach(() => {
    vi.resetAllMocks();
    (signAuthToken as ReturnType<typeof vi.fn>).mockResolvedValue('mock-token');
    (verifyAuthToken as ReturnType<typeof vi.fn>).mockResolvedValue({ email, sub: email });
  });

  it('issues a JWT on POST', async () => {
    const res = await POST(
      new Request('http://localhost/api/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password: 'supersecret' }),
      }),
    );

    expect(res.status).toBe(200);
    const payload = await res.json();
    expect(payload.token).toBe('mock-token');
    expect(signAuthToken).toHaveBeenCalledWith({ email, sub: email });
    expect(payload.user.email).toBe(email);
  });

  it('rejects invalid payload', async () => {
    const res = await POST(
      new Request('http://localhost/api/auth', {
        method: 'POST',
        body: JSON.stringify({ email, password: 'short' }),
      }),
    );

    expect(res.status).toBe(400);
  });

  it('validates tokens on GET', async () => {
    const res = await GET(
      new Request('http://localhost/api/auth', {
        headers: { authorization: 'Bearer mock-token' },
      }),
    );

    expect(res.status).toBe(200);
    expect(verifyAuthToken).toHaveBeenCalledWith('mock-token');
    const payload = await res.json();
    expect(payload.user.email).toBe(email);
  });
});
