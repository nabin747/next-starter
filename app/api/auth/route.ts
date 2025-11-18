import { NextResponse } from 'next/server';
import { signAuthToken, verifyAuthToken } from '@/lib/auth';
import { authSchema } from '@/lib/validations/auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = authSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { email } = parsed.data;
  const token = await signAuthToken({ sub: email, email });

  const response = NextResponse.json({
    token,
    user: { email },
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return response;
}

export async function GET(request: Request) {
  const bearer = request.headers.get('authorization');
  const token = bearer?.startsWith('Bearer ') ? bearer.replace('Bearer ', '') : null;

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 });
  }

  try {
    const payload = await verifyAuthToken(token);
    return NextResponse.json({ user: { email: payload.email } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token', detail: `${error}` }, { status: 401 });
  }
}
