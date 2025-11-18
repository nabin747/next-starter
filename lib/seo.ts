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

export function buildArticleJsonLd({
  title,
  description,
  path,
  publishedDate,
  modifiedDate,
  authorName,
  imageUrl,
  tags,
}: {
  title: string;
  description: string;
  path: string;
  publishedDate: string;
  modifiedDate?: string;
  authorName: string;
  imageUrl?: string;
  tags?: string[];
}) {
  const url = `${siteUrl}${path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Next Starter',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.ico`,
      },
    },
    image: imageUrl || `${siteUrl}/og-image.png`,
    keywords: tags?.join(', '),
  };
}

export function buildProductJsonLd({
  name,
  description,
  imageUrl,
  price,
  currency = 'USD',
  availability = 'InStock',
  rating,
  reviewCount,
  brand,
  sku,
}: {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: number;
  reviewCount?: number;
  brand?: string;
  sku?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: imageUrl,
    brand: brand
      ? {
          '@type': 'Brand',
          name: brand,
        }
      : undefined,
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: siteUrl,
    },
    aggregateRating:
      rating && reviewCount
        ? {
            '@type': 'AggregateRating',
            ratingValue: rating.toString(),
            reviewCount: reviewCount.toString(),
          }
        : undefined,
    sku,
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function buildPersonJsonLd({
  name,
  jobTitle,
  url,
  imageUrl,
  description,
  email,
}: {
  name: string;
  jobTitle?: string;
  url?: string;
  imageUrl?: string;
  description?: string;
  email?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    url: url || `${siteUrl}`,
    image: imageUrl,
    description,
    email,
  };
}

export function generateMetadata({
  title,
  description,
  path,
  imageUrl,
  imageAlt,
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  imageUrl?: string;
  imageAlt?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  type?: 'website' | 'article';
}): Metadata {
  const url = `${siteUrl}${path}`;
  const image = imageUrl || `${siteUrl}/og-image.png`;
  const fullTitle = `${title} | Next Starter`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Next Starter',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt || title,
        },
      ],
      type,
      publishedTime,
      modifiedTime,
      authors,
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    keywords: tags,
  };
}
