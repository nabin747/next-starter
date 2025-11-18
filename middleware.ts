import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';

const PUBLIC_PATHS = ['/', '/api/health', '/api/auth', '/favicon.ico'];

function isPublicPath(pathname: string) {
  if (pathname.startsWith('/_next') || pathname.startsWith('/assets')) return true;
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path.endsWith('/') ? path : `${path}/`}`),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const bearer = request.headers.get('authorization');
  const cookieToken = request.cookies.get('token')?.value;
  const token = bearer?.startsWith('Bearer ') ? bearer.replace('Bearer ', '') : cookieToken;

  if (!token) {
    return NextResponse.redirect(new URL(`/?error=unauthorized${search || ''}`, request.url));
  }

  try {
    const payload = await verifyAuthToken(token);
    const requestHeaders = new Headers(request.headers);
    if (payload.email) {
      requestHeaders.set('x-user-email', String(payload.email));
    }
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    return NextResponse.redirect(new URL(`/?error=unauthorized${search || ''}`, request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
