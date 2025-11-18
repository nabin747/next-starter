import { NextResponse } from 'next/server';

const siteUrl = process.env.SITE_URL?.replace(/\/$/, '') || 'https://example.com';

export function GET() {
  const body = `User-agent: *
Allow: /
Disallow: /dashboard

Sitemap: ${siteUrl}/sitemap.xml`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
