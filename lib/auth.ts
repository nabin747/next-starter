import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const DEFAULT_EXPIRATION = '2h';

export type AuthTokenPayload = JWTPayload & {
  sub: string;
  email: string;
};

function getSecret() {
  const secret =
    process.env.AUTH_SECRET ||
    process.env.NEXT_PUBLIC_AUTH_SECRET ||
    'dev-insecure-secret-change-me';

  if (!secret) {
    throw new Error('AUTH_SECRET env var is not set.');
  }

  return new TextEncoder().encode(secret);
}

export async function signAuthToken(
  payload: Omit<AuthTokenPayload, 'iat' | 'exp' | 'nbf'>,
  expiresIn = DEFAULT_EXPIRATION,
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

export async function verifyAuthToken(token: string) {
  const verified = await jwtVerify<AuthTokenPayload>(token, getSecret());
  return verified.payload;
}
