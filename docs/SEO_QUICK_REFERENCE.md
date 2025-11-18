# SEO Quick Reference Guide

Quick reference for implementing SEO in your Next.js pages.

## Table of Contents

- [Page Metadata](#page-metadata)
- [JSON-LD Structured Data](#json-ld-structured-data)
- [Image Optimization](#image-optimization)
- [Common Patterns](#common-patterns)
- [Checklist](#checklist)

## Page Metadata

### Basic Page Metadata

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description for search engines',
};
```

### Dynamic Page Metadata

```tsx
import { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await getData(params.slug);

  return genMeta({
    title: data.title,
    description: data.description,
    path: `/page/${params.slug}`,
    imageUrl: data.imageUrl,
    type: 'article', // or 'website'
  });
}
```

### Complete Metadata with All Fields

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.description,

    // Canonical URL
    alternates: {
      canonical: `/blog/${params.slug}`,
    },

    // Keywords
    keywords: post.tags,

    // Open Graph
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${params.slug}`,
      siteName: 'Your Site Name',
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
    },
  };
}
```

## JSON-LD Structured Data

### Article/Blog Post

```tsx
import { buildArticleJsonLd } from '@/lib/seo';

const jsonLd = buildArticleJsonLd({
  title: 'Article Title',
  description: 'Article description',
  path: '/blog/article-slug',
  publishedDate: '2024-01-15T10:00:00Z',
  modifiedDate: '2024-01-20T15:00:00Z',
  authorName: 'John Doe',
  imageUrl: 'https://example.com/image.jpg',
  tags: ['Next.js', 'React'],
});

// In component
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
```

### Product

```tsx
import { buildProductJsonLd } from '@/lib/seo';

const jsonLd = buildProductJsonLd({
  name: 'Product Name',
  description: 'Product description',
  imageUrl: 'https://example.com/product.jpg',
  price: 99.99,
  currency: 'USD',
  availability: 'InStock', // or 'OutOfStock' or 'PreOrder'
  rating: 4.5,
  reviewCount: 100,
  brand: 'Brand Name',
  sku: 'PROD-123',
});
```

### Person/Profile

```tsx
import { buildPersonJsonLd } from '@/lib/seo';

const jsonLd = buildPersonJsonLd({
  name: 'John Doe',
  jobTitle: 'Software Developer',
  url: 'https://johndoe.com',
  imageUrl: 'https://example.com/avatar.jpg',
  description: 'Full-stack developer and technical writer',
  email: 'john@example.com',
});
```

### Breadcrumbs

```tsx
import { buildBreadcrumbJsonLd } from '@/lib/seo';

const jsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Electronics', path: '/products?category=electronics' },
  { name: 'Product Name', path: '/products/product-slug' },
]);
```

### Using the JsonLd Component

```tsx
import { JsonLd } from '@/components/seo/json-ld';

export default function Page() {
  const articleJsonLd = buildArticleJsonLd({...});
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([...]);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {/* Page content */}
    </>
  );
}
```

## Image Optimization

### Responsive Images with Proper Loading

```tsx
// Above-the-fold (hero image)
<img
  src={imageUrl}
  alt="Descriptive alt text"
  loading="eager"
  className="h-auto w-full object-cover"
/>

// Below-the-fold (lazy loading)
<img
  src={imageUrl}
  alt="Descriptive alt text"
  loading="lazy"
  className="h-auto w-full object-cover"
/>
```

### Open Graph Images

Open Graph images should be:

- **Dimensions**: 1200x630px (1.91:1 aspect ratio)
- **Format**: JPG or PNG
- **Size**: Less than 8MB
- **URL**: Absolute URL (https://...)

```tsx
openGraph: {
  images: [
    {
      url: 'https://example.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Image description',
    },
  ],
}
```

## Common Patterns

### Static Site Generation (SSG)

```tsx
// Generate static paths at build time
export async function generateStaticParams() {
  const items = await getAllItems();

  return items.map((item) => ({
    slug: item.slug,
  }));
}

// Page component with params
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getItem(slug);

  return <div>{/* content */}</div>;
}
```

### Handling Not Found

```tsx
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  const { slug } = await params;

  let data;
  try {
    data = await getData(slug);
  } catch {
    notFound(); // Shows 404 page
  }

  return <div>{/* content */}</div>;
}
```

### Date Formatting for SEO

```tsx
// ISO 8601 format for dateTime attribute
<time dateTime={post.publishedAt}>
  {new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</time>
```

### Semantic HTML

```tsx
<article>
  <header>
    <h1>{title}</h1>
    <time dateTime={publishedAt}>{formattedDate}</time>
  </header>

  <div>{content}</div>

  <footer>
    <address>{author}</address>
  </footer>
</article>
```

## Checklist

### Before Deploying

- [ ] All pages have unique `title` tags
- [ ] All pages have descriptive `description` meta tags
- [ ] Open Graph tags are implemented
- [ ] Twitter Card tags are implemented
- [ ] Canonical URLs are set correctly
- [ ] JSON-LD structured data is added
- [ ] Images have descriptive `alt` attributes
- [ ] Proper image loading strategies (`eager` vs `lazy`)
- [ ] `robots.txt` is configured
- [ ] `sitemap.xml` is generated
- [ ] 404 pages handle errors gracefully
- [ ] All dynamic routes use `generateStaticParams()`

### Testing

- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validate with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Check with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] View page source to verify meta tags
- [ ] Test all dynamic routes
- [ ] Verify images load correctly
- [ ] Check 404 pages

### Performance

- [ ] Images are optimized (size and format)
- [ ] Critical content uses `loading="eager"`
- [ ] Below-fold content uses `loading="lazy"`
- [ ] Static generation is used where possible
- [ ] Metadata is generated at build time

## Environment Setup

Add to `.env.local`:

```env
# Required for SEO
SITE_URL=https://yourdomain.com

# Optional analytics
GTM_ID=GTM-XXXXXXX
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Useful Commands

```bash
# Build and check static generation
pnpm build

# Start production server
pnpm start

# Check generated pages
ls -la .next/server/app/(public)/

# Type checking
pnpm typecheck

# Lint
pnpm lint
```

## Quick Tips

1. **Always use absolute URLs** for images in metadata
2. **Keep titles under 60 characters** for best display in search results
3. **Keep descriptions between 150-160 characters**
4. **Use descriptive alt text** for all images
5. **Include canonical URLs** to avoid duplicate content issues
6. **Test on mobile** - Most searches are mobile
7. **Use semantic HTML** - Helps search engines understand content
8. **Add structured data** - Enables rich results in search
9. **Generate static pages** when possible - Better for SEO
10. **Monitor Core Web Vitals** - Affects search ranking

## Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)
- [MDN SEO Guide](https://developer.mozilla.org/en-US/docs/Glossary/SEO)
