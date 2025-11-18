# Documentation

Welcome to the Next.js Starter documentation!

## Available Guides

### 📄 [Dynamic Pages Guide](./DYNAMIC_PAGES.md)

Complete guide for creating dynamic pages with SEO optimization. Includes:

- Project structure overview
- Blog post pages
- Product pages
- User profile pages
- Data fetching patterns
- Best practices

### ⚡ [SEO Quick Reference](./SEO_QUICK_REFERENCE.md)

Quick reference guide for implementing SEO. Includes:

- Page metadata examples
- JSON-LD structured data
- Image optimization
- Common patterns
- Pre-deployment checklist

## Project Structure

```
next-starter/
├── app/                      # Next.js 15 App Router
│   ├── (public)/             # Public routes
│   │   ├── blog/[slug]/      # Dynamic blog posts
│   │   ├── products/[slug]/  # Dynamic products
│   │   └── users/[username]/ # Dynamic user profiles
│   ├── (private)/            # Protected routes
│   └── api/                  # API routes
├── components/               # React components
│   ├── seo/                  # SEO components
│   └── layout/               # Layout components
├── lib/                      # Utilities and helpers
│   ├── data/                 # Data fetching functions
│   └── seo.ts                # SEO utilities
├── types/                    # TypeScript types
└── docs/                     # Documentation (you are here)
```

## Quick Start

### 1. View Example Pages

Start the development server:

```bash
pnpm dev
```

Visit the example pages:

- Blog: [http://localhost:3000/blog/getting-started-with-nextjs-15](http://localhost:3000/blog/getting-started-with-nextjs-15)
- Product: [http://localhost:3000/products/wireless-noise-cancelling-headphones](http://localhost:3000/products/wireless-noise-cancelling-headphones)
- User: [http://localhost:3000/users/johndoe](http://localhost:3000/users/johndoe)

### 2. Understanding the Code

Each dynamic page follows this pattern:

```tsx
// 1. Generate metadata for SEO
export async function generateMetadata({ params }) {
  const data = await getData(params.slug);
  return generateMetadata({ ...seoConfig });
}

// 2. Generate static paths (SSG)
export async function generateStaticParams() {
  const items = await getAllItems();
  return items.map((item) => ({ slug: item.slug }));
}

// 3. Page component
export default async function Page({ params }) {
  const data = await getData(params.slug);
  return <div>{/* content */}</div>;
}
```

### 3. Creating Your Own Dynamic Pages

1. **Create data fetching functions** in `lib/data/`
2. **Define TypeScript types** in `types/content.ts`
3. **Create the dynamic route** in `app/(public)/[type]/[slug]/page.tsx`
4. **Add SEO metadata** using utilities from `lib/seo.ts`

See the [Dynamic Pages Guide](./DYNAMIC_PAGES.md) for detailed instructions.

## Key Features

### ✅ SEO Optimized

- Metadata API for all pages
- JSON-LD structured data
- Open Graph & Twitter Cards
- Sitemap and robots.txt
- Breadcrumb navigation

### ✅ Performance

- Static Site Generation (SSG)
- Optimized images with lazy loading
- Efficient data fetching
- Server Components by default

### ✅ Type Safety

- Full TypeScript support
- Type-safe data fetching
- Validated metadata

### ✅ Developer Experience

- Hot reload in development
- Clear project structure
- Reusable components
- Comprehensive documentation

## Common Tasks

### Add a New Blog Post

Edit `lib/data/blog.ts` and add a new entry to `mockBlogPosts`:

```tsx
{
  slug: 'your-post-slug',
  title: 'Your Post Title',
  description: 'Post description',
  content: 'Post content...',
  author: { name: 'Author Name' },
  publishedAt: '2024-01-15T10:00:00Z',
  tags: ['Tag1', 'Tag2'],
  readingTime: 5,
  category: 'Tutorial',
}
```

### Add a New Product

Edit `lib/data/products.ts` and add a new entry to `mockProducts`.

### Customize SEO

Edit `lib/seo.ts` to customize:

- Site name
- Default metadata
- JSON-LD schemas

## Testing

### Test SEO Implementation

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test your structured data

2. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Test Open Graph tags

3. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Test Twitter Cards

### View Generated Pages

```bash
# Build the project
pnpm build

# Check generated static pages
ls -la .next/server/app/(public)/blog/
ls -la .next/server/app/(public)/products/
ls -la .next/server/app/(public)/users/
```

## Environment Variables

Create a `.env.local` file:

```env
# Required for SEO
SITE_URL=https://yourdomain.com

# Optional analytics
GTM_ID=GTM-XXXXXXX
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Need Help?

1. Check the [Dynamic Pages Guide](./DYNAMIC_PAGES.md) for detailed examples
2. Review the [SEO Quick Reference](./SEO_QUICK_REFERENCE.md) for quick tips
3. Look at the example pages in `app/(public)/`
4. Check the utilities in `lib/seo.ts`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)
