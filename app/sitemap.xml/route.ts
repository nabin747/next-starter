import { NextResponse } from 'next/server';

const siteUrl = process.env.SITE_URL?.replace(/\/$/, '') || 'https://example.com';

const routes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/dashboard', changefreq: 'daily', priority: 0.8 },
];

export async function GET() {
  const pages = routes
    .map(
      (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages}
</urlset>`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
