# Architecture Overview

This document explains the architecture of dynamic pages with SEO in this Next.js starter.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Request                         │
│                   /blog/getting-started                     │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                       │
│              app/(public)/blog/[slug]/page.tsx              │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ├─────────────────┐
                          │                 │
                          ▼                 ▼
              ┌─────────────────┐  ┌─────────────────┐
              │ generateMetadata│  │generateStaticP..│
              │    (SEO Meta)   │  │   (SSG Paths)   │
              └────────┬────────┘  └────────┬────────┘
                       │                    │
                       ▼                    ▼
              ┌─────────────────┐  ┌─────────────────┐
              │   lib/seo.ts    │  │ lib/data/blog.ts│
              │  SEO Utilities  │  │  Data Fetching  │
              └─────────────────┘  └─────────────────┘
                       │                    │
                       └─────────┬──────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    Page Component       │
                    │  - HTML Structure       │
                    │  - JSON-LD Data         │
                    │  - SEO Meta Tags        │
                    └─────────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Rendered HTML Page    │
                    │  - Rich Metadata        │
                    │  - Structured Data      │
                    │  - Static Assets        │
                    └─────────────────────────┘
```

## Data Flow

### 1. Build Time (Static Generation)

```
Build Process
     │
     ├─► generateStaticParams()
     │        │
     │        ├─► getBlogPostSlugs()
     │        │        └─► ['post-1', 'post-2', 'post-3']
     │        │
     │        └─► Generate static pages for each slug
     │
     ├─► For each slug:
     │        │
     │        ├─► generateMetadata()
     │        │        └─► Generate SEO meta tags
     │        │
     │        └─► Page Component
     │                 ├─► Fetch data
     │                 ├─► Generate JSON-LD
     │                 └─► Render HTML
     │
     └─► Output: .next/server/app/(public)/blog/[slug]/
```

### 2. Request Time (User Visit)

```
User visits /blog/my-post
     │
     ├─► Next.js serves pre-built static HTML
     │        │
     │        ├─► HTML with complete SEO meta tags
     │        ├─► JSON-LD structured data
     │        └─► Optimized images
     │
     └─► Search engines can immediately index
```

## Component Structure

### Dynamic Page Structure

```tsx
// app/(public)/blog/[slug]/page.tsx

┌─────────────────────────────────────────────────┐
│ generateStaticParams()                          │
│ ├─ Defines all possible [slug] values          │
│ └─ Enables Static Site Generation               │
└─────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│ generateMetadata({ params })                    │
│ ├─ Creates <title> tag                         │
│ ├─ Creates <meta> tags                         │
│ ├─ Creates Open Graph tags                     │
│ └─ Creates Twitter Card tags                   │
└─────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│ Page({ params })                                │
│ ├─ Fetches data                                │
│ ├─ Generates JSON-LD structured data           │
│ ├─ Renders page content                        │
│ └─ Returns complete HTML                       │
└─────────────────────────────────────────────────┘
```

## SEO Utilities Flow

```
lib/seo.ts
    │
    ├─► generateMetadata()
    │        └─► Complete metadata object for any page
    │
    ├─► buildArticleJsonLd()
    │        └─► JSON-LD for blog posts/articles
    │
    ├─► buildProductJsonLd()
    │        └─► JSON-LD for products
    │
    ├─► buildPersonJsonLd()
    │        └─► JSON-LD for user profiles
    │
    └─► buildBreadcrumbJsonLd()
             └─► JSON-LD for breadcrumb navigation
```

## Data Layer Architecture

```
┌──────────────────────────────────────────────┐
│            Application Layer                 │
│  app/(public)/[type]/[slug]/page.tsx        │
└─────────────────┬────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────┐
│         Data Fetching Layer                  │
│              lib/data/                       │
│  ├─ blog.ts      (Blog operations)          │
│  ├─ products.ts  (Product operations)       │
│  └─ users.ts     (User operations)          │
└─────────────────┬────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────┐
│           Data Source Layer                  │
│  (Currently: Mock Data)                      │
│  (Future: Database, CMS, API)               │
└──────────────────────────────────────────────┘
```

## SEO Output Structure

### What Gets Generated

```html
<!-- In <head> -->
<title>Page Title | Next Starter</title>
<meta name="description" content="Page description..." />
<meta name="keywords" content="tag1, tag2, tag3" />

<!-- Canonical URL -->
<link rel="canonical" href="https://example.com/page" />

<!-- Open Graph -->
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Description..." />
<meta property="og:image" content="https://example.com/og.jpg" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="article" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Description..." />
<meta name="twitter:image" content="https://example.com/og.jpg" />

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Article Title",
    "datePublished": "2024-01-15T10:00:00Z",
    ...
  }
</script>
```

## File Organization

```
next-starter/
│
├── app/
│   └── (public)/
│       ├── blog/[slug]/
│       │   └── page.tsx           ◄── Blog post page
│       ├── products/[slug]/
│       │   └── page.tsx           ◄── Product page
│       └── users/[username]/
│           └── page.tsx           ◄── User profile page
│
├── lib/
│   ├── data/
│   │   ├── blog.ts                ◄── Blog data operations
│   │   ├── products.ts            ◄── Product data operations
│   │   └── users.ts               ◄── User data operations
│   └── seo.ts                     ◄── SEO utilities
│
├── types/
│   └── content.ts                 ◄── TypeScript types
│
├── components/
│   └── seo/
│       └── json-ld.tsx            ◄── Reusable JSON-LD component
│
└── docs/
    ├── README.md                  ◄── Documentation index
    ├── DYNAMIC_PAGES.md           ◄── Complete guide
    ├── SEO_QUICK_REFERENCE.md     ◄── Quick reference
    └── ARCHITECTURE.md            ◄── This file
```

## Request Lifecycle

### Static Generation (Build Time)

```
1. Developer runs: pnpm build
   │
2. Next.js calls generateStaticParams()
   │
3. For each param (slug):
   │
   ├─► generateMetadata() is called
   │   ├─ Fetches data for the slug
   │   ├─ Generates metadata object
   │   └─ Returns metadata
   │
   └─► Page component is rendered
       ├─ Fetches full page data
       ├─ Generates JSON-LD
       ├─ Renders complete HTML
       └─ Saves to .next/server/
   │
4. Static HTML pages are generated
   │
5. Ready to serve instantly
```

### Runtime (User Request)

```
1. User requests: /blog/my-post
   │
2. Next.js serves pre-built HTML
   │
3. Browser receives:
   ├─ Complete HTML with content
   ├─ All SEO meta tags in <head>
   ├─ JSON-LD structured data
   └─ Optimized images
   │
4. Search engine crawlers can immediately:
   ├─ Read meta tags
   ├─ Parse structured data
   ├─ Index content
   └─ Generate rich results
```

## Performance Benefits

```
Traditional SSR           Static Generation (This Project)
      │                            │
      ├─ Request received          ├─ Request received
      ├─ Query database            ├─ Serve pre-built HTML
      ├─ Generate HTML             │   (Instant!)
      ├─ Send to client            ├─ Client receives HTML
      │                            │
   ~500ms+                        ~50ms
```

## Integration Points

### Adding a New Data Source

```
Current: Mock Data (lib/data/*.ts)
    │
    ▼
Replace with:
    │
    ├─► Database (Prisma, Drizzle)
    ├─► CMS (Contentful, Sanity)
    ├─► API (REST, GraphQL)
    └─► File System (MDX, Markdown)

Keep the same interface:
- getBlogPost(slug)
- getBlogPosts(options)
- getBlogPostSlugs()
```

### Extending SEO Utilities

```
lib/seo.ts
    │
    ├─ Add new JSON-LD builders
    │   ├─ buildEventJsonLd()
    │   ├─ buildRecipeJsonLd()
    │   └─ buildVideoJsonLd()
    │
    └─ Customize generateMetadata()
        ├─ Add language variants
        ├─ Add author metadata
        └─ Add publisher info
```

## Best Practices Applied

### 1. Separation of Concerns

- **Pages** handle routing and rendering
- **Data layer** handles data fetching
- **SEO utilities** handle metadata generation
- **Components** handle UI

### 2. Type Safety

- All data structures are typed
- Metadata generation is type-safe
- Component props are validated

### 3. Performance

- Static generation for fast delivery
- Lazy loading for images
- Minimal client-side JavaScript

### 4. SEO

- Complete metadata on all pages
- Structured data for rich results
- Semantic HTML markup
- Proper heading hierarchy

### 5. Maintainability

- Clear file organization
- Reusable utilities
- Comprehensive documentation
- Consistent patterns

## Scaling Considerations

### Adding More Page Types

```
1. Create new type in types/content.ts
2. Add data fetching in lib/data/[type].ts
3. Create dynamic route in app/(public)/[type]/[slug]/
4. Add SEO utilities if needed
5. Follow existing patterns
```

### Performance at Scale

```
Static Pages: 1,000s of pages
    │
    ├─ Build time: Linear increase
    ├─ Runtime: No impact
    └─ Solution: Incremental Static Regeneration (ISR)

Dynamic Pages: Real-time data
    │
    ├─ Use Server Components
    ├─ Cache strategically
    └─ Consider edge functions
```

## Monitoring & Analytics

```
SEO Performance
    │
    ├─► Google Search Console
    │        └─ Track rankings, clicks, impressions
    │
    ├─► Google Analytics
    │        └─ Track user behavior
    │
    └─► Lighthouse CI
             └─ Monitor Core Web Vitals
```

## Summary

This architecture provides:

✅ **Fast Performance** - Static generation for instant delivery
✅ **SEO Optimized** - Complete metadata and structured data
✅ **Type Safe** - Full TypeScript coverage
✅ **Scalable** - Clear patterns for growth
✅ **Maintainable** - Organized and documented

The modular design makes it easy to:

- Add new page types
- Integrate data sources
- Customize SEO
- Extend functionality
