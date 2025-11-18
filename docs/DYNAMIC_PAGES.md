# Dynamic Pages with SEO Guide

This guide explains how to create dynamic pages with optimal SEO in your Next.js application.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [SEO Utilities](#seo-utilities)
- [Dynamic Page Examples](#dynamic-page-examples)
- [Best Practices](#best-practices)
- [Testing](#testing)

## Overview

This project includes complete examples of dynamic pages with SEO optimization:

1. **Blog Posts** - Article pages with rich metadata
2. **Products** - E-commerce product pages with structured data
3. **User Profiles** - Profile pages with person schema

Each example demonstrates:

- ✅ Dynamic route generation
- ✅ SEO metadata generation
- ✅ JSON-LD structured data
- ✅ Static Site Generation (SSG)
- ✅ Breadcrumbs for better navigation
- ✅ Open Graph & Twitter Cards

## Project Structure

```
app/
  (public)/
    blog/
      [slug]/
        page.tsx          # Dynamic blog post page
    products/
      [slug]/
        page.tsx          # Dynamic product page
    users/
      [username]/
        page.tsx          # Dynamic user profile page

lib/
  data/
    blog.ts              # Blog data fetching
    products.ts          # Product data fetching
    users.ts             # User data fetching
  seo.ts                 # SEO utilities and helpers

types/
  content.ts             # TypeScript types for content

components/
  seo/
    json-ld.tsx          # Reusable JSON-LD component
```

## SEO Utilities

### Location: `lib/seo.ts`

This file contains all SEO-related utilities:

#### 1. `generateMetadata()`

Generates complete metadata for any page including Open Graph and Twitter Cards.

```tsx
import { generateMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug);

  return generateMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${params.slug}`,
    imageUrl: post.imageUrl,
    type: 'article',
    publishedTime: post.publishedAt,
    tags: post.tags,
  });
}
```

#### 2. `buildArticleJsonLd()`

Creates structured data for blog articles.

```tsx
import { buildArticleJsonLd } from '@/lib/seo';

const jsonLd = buildArticleJsonLd({
  title: 'My Article',
  description: 'Article description',
  path: '/blog/my-article',
  publishedDate: '2024-01-15T10:00:00Z',
  authorName: 'John Doe',
  tags: ['Next.js', 'SEO'],
});
```

#### 3. `buildProductJsonLd()`

Creates structured data for products.

```tsx
import { buildProductJsonLd } from '@/lib/seo';

const jsonLd = buildProductJsonLd({
  name: 'Product Name',
  description: 'Product description',
  imageUrl: 'https://example.com/image.jpg',
  price: 99.99,
  currency: 'USD',
  availability: 'InStock',
  rating: 4.5,
  reviewCount: 100,
});
```

#### 4. `buildPersonJsonLd()`

Creates structured data for user profiles.

```tsx
import { buildPersonJsonLd } from '@/lib/seo';

const jsonLd = buildPersonJsonLd({
  name: 'John Doe',
  jobTitle: 'Developer',
  url: 'https://johndoe.com',
  imageUrl: 'https://example.com/avatar.jpg',
  description: 'Full-stack developer',
});
```

#### 5. `buildBreadcrumbJsonLd()`

Creates breadcrumb structured data for better navigation.

```tsx
import { buildBreadcrumbJsonLd } from '@/lib/seo';

const jsonLd = buildBreadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Article Title', path: '/blog/article-slug' },
]);
```

## Dynamic Page Examples

### 1. Blog Post Page

**Location:** `app/(public)/blog/[slug]/page.tsx`

**Features:**

- Dynamic routing with `[slug]`
- SSG with `generateStaticParams()`
- Rich article metadata
- Related posts
- Author information
- Reading time
- Tags and categories

**Example Usage:**

```bash
# Visit any blog post
http://localhost:3000/blog/getting-started-with-nextjs-15
http://localhost:3000/blog/mastering-typescript-advanced-patterns
```

**Key Implementation Details:**

```tsx
// Generate static paths at build time
export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug);
  return generateMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${params.slug}`,
    type: 'article',
  });
}
```

### 2. Product Page

**Location:** `app/(public)/products/[slug]/page.tsx`

**Features:**

- Product gallery with multiple images
- Price and currency formatting
- Stock status
- Star ratings
- Product specifications
- Related products
- Rich product structured data

**Example Usage:**

```bash
# Visit any product
http://localhost:3000/products/wireless-noise-cancelling-headphones
http://localhost:3000/products/mechanical-gaming-keyboard-rgb
```

**Key Features:**

- Product schema for Google Shopping
- Image gallery
- Specifications table
- Feature list
- Add to cart functionality

### 3. User Profile Page

**Location:** `app/(public)/users/[username]/page.tsx`

**Features:**

- User avatar and cover image
- Bio and location
- Social media links
- User statistics (followers, posts)
- Person schema for rich results

**Example Usage:**

```bash
# Visit any user profile
http://localhost:3000/users/johndoe
http://localhost:3000/users/janesmith
```

## Best Practices

### 1. **Always Use Static Generation When Possible**

```tsx
// ✅ Good: Use SSG for content that doesn't change often
export async function generateStaticParams() {
  const items = await getItems();
  return items.map((item) => ({ slug: item.slug }));
}

// ❌ Avoid: Server-side rendering for static content
export const dynamic = 'force-dynamic'; // Don't do this for static content
```

### 2. **Implement Proper Error Handling**

```tsx
export default async function Page({ params }) {
  let data;
  try {
    data = await getData(params.slug);
  } catch {
    notFound(); // Returns 404 page
  }

  return <div>{/* ... */}</div>;
}
```

### 3. **Use Semantic HTML and ARIA Labels**

```tsx
<article>
  <header>
    <h1>{post.title}</h1>
    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
  </header>
  <div>{post.content}</div>
</article>
```

### 4. **Optimize Images**

```tsx
// Use appropriate loading strategies
<img
  src={post.imageUrl}
  alt={post.title}
  loading="eager"  // For above-the-fold images
/>

<img
  src={relatedPost.imageUrl}
  alt={relatedPost.title}
  loading="lazy"   // For below-the-fold images
/>
```

### 5. **Include All Necessary Metadata**

```tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  return {
    title: post.title,
    description: post.description,
    // Open Graph
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
      type: 'article',
    },
    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
    },
    // Canonical URL
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  };
}
```

### 6. **Add Structured Data (JSON-LD)**

```tsx
import { JsonLd } from '@/components/seo/json-ld';

export default async function Page() {
  const jsonLd = buildArticleJsonLd({...});

  return (
    <>
      <JsonLd data={jsonLd} />
      {/* Page content */}
    </>
  );
}
```

## Data Fetching

### Blog Data (`lib/data/blog.ts`)

```tsx
import { getBlogPost, getBlogPosts } from '@/lib/data/blog';

// Get a single post
const post = await getBlogPost('my-slug');

// Get all posts
const posts = await getBlogPosts();

// Get filtered posts
const taggedPosts = await getBlogPosts({ tag: 'Next.js' });
const categoryPosts = await getBlogPosts({ category: 'Tutorial' });
const limitedPosts = await getBlogPosts({ limit: 5 });

// Get related posts
const related = await getRelatedBlogPosts('current-slug', 3);
```

### Product Data (`lib/data/products.ts`)

```tsx
import { getProduct, getProducts } from '@/lib/data/products';

// Get a single product
const product = await getProduct('product-slug');

// Get all products
const products = await getProducts();

// Get filtered products
const categoryProducts = await getProducts({ category: 'Electronics' });

// Get related products
const related = await getRelatedProducts('current-slug', 3);
```

### User Data (`lib/data/users.ts`)

```tsx
import { getUser, getUsers } from '@/lib/data/users';

// Get a single user
const user = await getUser('username');

// Get all users
const users = await getUsers();
```

## Testing

### 1. Test SEO Metadata

Use these tools to validate your SEO implementation:

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

### 2. Test Dynamic Routes

```bash
# Start development server
pnpm dev

# Visit dynamic pages
http://localhost:3000/blog/getting-started-with-nextjs-15
http://localhost:3000/products/wireless-noise-cancelling-headphones
http://localhost:3000/users/johndoe
```

### 3. Test Build and Static Generation

```bash
# Build the project
pnpm build

# Check generated static pages
ls -la .next/server/app/(public)/blog/
ls -la .next/server/app/(public)/products/
ls -la .next/server/app/(public)/users/
```

### 4. View Page Source

Right-click on any page and select "View Page Source" to verify:

- Meta tags are present
- JSON-LD structured data is included
- Canonical URLs are correct

## Customization

### Adding New Dynamic Page Types

1. **Create a new data file** in `lib/data/`
2. **Define TypeScript types** in `types/content.ts`
3. **Create the dynamic route** in `app/(public)/[type]/[slug]/page.tsx`
4. **Implement SEO utilities** if needed in `lib/seo.ts`

### Example: Adding a "Courses" Page

```tsx
// types/content.ts
export interface Course {
  slug: string;
  title: string;
  description: string;
  // ... other fields
}

// lib/data/courses.ts
export async function getCourse(slug: string): Promise<Course> {
  // Implementation
}

// app/(public)/courses/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const course = await getCourse(params.slug);
  return generateMetadata({
    title: course.title,
    description: course.description,
    path: `/courses/${params.slug}`,
  });
}
```

## Environment Variables

Add these to your `.env.local`:

```env
SITE_URL=https://yourdomain.com
```

## Additional Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

## Need Help?

If you have questions or need assistance:

1. Check the example pages in `app/(public)/`
2. Review the SEO utilities in `lib/seo.ts`
3. Consult the Next.js documentation
4. Test your pages with the validation tools mentioned above
