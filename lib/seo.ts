import type { Metadata } from 'next';

const siteUrl = process.env.SITE_URL?.replace(/\/$/, '') || 'https://example.com';

export function baseMetadata(): Metadata {
  const title = 'Next Starter | Scalable Next.js 16 Architecture';
  const description =
    'A production-ready Next.js 16 starter with ShadCN UI, Lucide icons, RSC, ISR, testing, SEO, and CI baked in.';
  const image = `${siteUrl}/og-image.png`;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: siteUrl },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: 'Next Starter',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Next Starter',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildOrgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Next Starter',
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
  };
}

export function buildPageJsonLd({
  title,
  description,
  path = '/',
}: {
  title: string;
  description: string;
  path?: string;
}) {
  const url = `${siteUrl}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
  };
}
