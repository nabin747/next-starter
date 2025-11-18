# Dynamic Page Examples

Visual guide showing what each dynamic page type includes.

## Blog Post Page

**URL:** `/blog/[slug]`

**Example:** `/blog/getting-started-with-nextjs-15`

### Page Structure

```
┌─────────────────────────────────────────────────────┐
│ 🏷️  Tutorial                          [Category Badge]│
│                                                       │
│ Getting Started with Next.js 15:                     │
│ A Complete Guide                           [Title H1]│
│                                                       │
│ Learn how to build modern web applications           │
│ with Next.js 15, including Server Components,        │
│ App Router, and more.                   [Description]│
│                                                       │
│ 👤 John Doe  📅 January 15, 2024  ⏱️ 8 min read      │
│                                                       │
│ #Next.js #React #Web Development #Tutorial   [Tags]  │
│                                                       │
│ ┌─────────────────────────────────────────────┐     │
│ │                                             │     │
│ │        [Featured Image]                     │     │
│ │                                             │     │
│ └─────────────────────────────────────────────┘     │
│                                                       │
│ ┌─────────────────────────────────────────────┐     │
│ │                                             │     │
│ │  # Getting Started with Next.js 15          │     │
│ │                                             │     │
│ │  Next.js 15 brings exciting new features... │     │
│ │                                             │     │
│ │  ## Key Features                            │     │
│ │  - Server Components                        │     │
│ │  - App Router                               │     │
│ │  ...                                        │     │
│ │                           [Article Content]  │     │
│ └─────────────────────────────────────────────┘     │
│                                                       │
│ ────────────────────────────────────────────────     │
│                                                       │
│ 👤 John Doe                         [Author Bio]     │
│ Full-stack developer and technical writer             │
│                                                       │
│ ────────────────────────────────────────────────     │
│                                                       │
│ Related Articles                                      │
│                                                       │
│ ┌────────┐ ┌────────┐ ┌────────┐   [Related Posts]  │
│ │ Post 1 │ │ Post 2 │ │ Post 3 │                    │
│ └────────┘ └────────┘ └────────┘                    │
└─────────────────────────────────────────────────────┘
```

### SEO Metadata Included

```html
<!-- Page Title -->
<title>Getting Started with Next.js 15 | Next Starter</title>

<!-- Meta Description -->
<meta name="description" content="Learn how to build modern web..." />

<!-- Keywords -->
<meta name="keywords" content="Next.js, React, Web Development, Tutorial" />

<!-- Canonical URL -->
<link rel="canonical" href="https://example.com/blog/getting-started-with-nextjs-15" />

<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:type" content="article" />
<meta property="og:title" content="Getting Started with Next.js 15" />
<meta property="og:description" content="Learn how to build..." />
<meta property="og:image" content="https://images.unsplash.com/..." />
<meta property="og:published_time" content="2024-01-15T10:00:00Z" />
<meta property="og:author" content="John Doe" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Getting Started with Next.js 15" />
<meta name="twitter:description" content="Learn how to build..." />

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Getting Started with Next.js 15",
    "datePublished": "2024-01-15T10:00:00Z",
    "author": {
      "@type": "Person",
      "name": "John Doe"
    }
  }
</script>
```

---

## Product Page

**URL:** `/products/[slug]`

**Example:** `/products/wireless-noise-cancelling-headphones`

### Page Structure

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│ ┌──────────────────┐  🏷️  Electronics        [Category]    │
│ │                  │                                         │
│ │  [Main Product   │  Premium Wireless Noise-Cancelling     │
│ │     Image]       │  Headphones                   [Title]  │
│ │                  │                                         │
│ └──────────────────┘  ⭐⭐⭐⭐⭐ 4.8 (1,247 reviews)          │
│                                                              │
│ [Thumb] [Thumb]      $299.99                      [Price]   │
│ [Thumb] [Thumb]                                              │
│                       Experience immersive sound with        │
│                       advanced noise cancellation...         │
│                                            [Description]     │
│                       ✅ In Stock               [Status]     │
│                                                              │
│                       🛒 Add to Cart            [CTA]        │
│                                                              │
│                       ┌─────────────────────────┐           │
│                       │ Key Features:           │           │
│                       │ ✓ 30-hour battery life  │           │
│                       │ ✓ Active Noise Cancel.  │           │
│                       │ ✓ Hi-Res audio          │           │
│                       └─────────────────────────┘           │
│                                                              │
│                       Brand: AudioTech                       │
│                       SKU: AT-WH-1000-BLK                    │
│                                                              │
│ ──────────────────────────────────────────────────          │
│                                                              │
│ Product Description                                          │
│ These premium wireless headphones deliver...                │
│                                                              │
│ ──────────────────────────────────────────────────          │
│                                                              │
│ Specifications                              [Specs Table]   │
│ ┌────────────────────────────────────────────────┐          │
│ │ Driver Size        │ 40mm                      │          │
│ │ Frequency Response │ 4Hz - 40kHz               │          │
│ │ Battery Life       │ 30 hours                  │          │
│ └────────────────────────────────────────────────┘          │
│                                                              │
│ ──────────────────────────────────────────────────          │
│                                                              │
│ Related Products                        [Related Products]  │
│ ┌────────┐ ┌────────┐ ┌────────┐                           │
│ │Product1│ │Product2│ │Product3│                           │
│ └────────┘ └────────┘ └────────┘                           │
└──────────────────────────────────────────────────────────────┘
```

### SEO Metadata Included

```html
<title>Premium Wireless Noise-Cancelling Headphones | Next Starter</title>

<meta name="description" content="Experience immersive sound..." />

<!-- Product Schema for Google Shopping -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Premium Wireless Noise-Cancelling Headphones",
    "description": "Experience immersive sound...",
    "image": "https://images.unsplash.com/...",
    "brand": {
      "@type": "Brand",
      "name": "AudioTech"
    },
    "offers": {
      "@type": "Offer",
      "price": "299.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1247"
    }
  }
</script>

<!-- Breadcrumb Navigation -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "position": 1, "name": "Home", "item": "https://example.com/" },
      { "position": 2, "name": "Products", "item": "https://example.com/products" },
      {
        "position": 3,
        "name": "Electronics",
        "item": "https://example.com/products?category=Electronics"
      },
      {
        "position": 4,
        "name": "Premium Wireless...",
        "item": "https://example.com/products/wireless-..."
      }
    ]
  }
</script>
```

---

## User Profile Page

**URL:** `/users/[username]`

**Example:** `/users/johndoe`

### Page Structure

```
┌─────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────┐ │
│ │                                                       │ │
│ │         [Cover Image Background]                     │ │
│ │                                                       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌────────────────────────────────────────────────────┐  │
│ │  ┌────┐                                            │  │
│ │  │👤  │  John Doe                        [Name]    │  │
│ │  └────┘  @johndoe                   [Username]     │  │
│ │  Avatar                                            │  │
│ │          Full-stack developer | Open source        │  │
│ │          enthusiast | Building cool stuff          │  │
│ │          with React & Next.js              [Bio]   │  │
│ │                                                     │  │
│ │          📍 San Francisco, CA                       │  │
│ │          🌐 johndoe.dev                            │  │
│ │          📧 john@example.com                       │  │
│ │          📅 Joined January 2022                     │  │
│ │                                                     │  │
│ │          [GitHub] [Twitter] [LinkedIn]    [Social] │  │
│ │                                                     │  │
│ │  ─────────────────────────────────────────────     │  │
│ │                                                     │  │
│ │     89          1,234         567        [Stats]   │  │
│ │    Posts       Followers    Following              │  │
│ └────────────────────────────────────────────────────┘  │
│                                                           │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Recent Activity                                    │  │
│ │                                                     │  │
│ │ No recent activity to display.                     │  │
│ └────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### SEO Metadata Included

```html
<title>John Doe (@johndoe) | Next Starter</title>

<meta name="description" content="Full-stack developer | Open source..." />

<!-- Person Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "John Doe",
    "url": "https://johndoe.dev",
    "image": "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    "description": "Full-stack developer | Open source enthusiast...",
    "email": "john@example.com"
  }
</script>
```

---

## Available Example Data

### 3 Blog Posts

1. **getting-started-with-nextjs-15**
   - Title: "Getting Started with Next.js 15: A Complete Guide"
   - Category: Tutorial
   - Reading Time: 8 min
   - Tags: Next.js, React, Web Development, Tutorial

2. **mastering-typescript-advanced-patterns**
   - Title: "Mastering TypeScript: Advanced Patterns and Best Practices"
   - Category: Tutorial
   - Reading Time: 12 min
   - Tags: TypeScript, JavaScript, Programming, Advanced

3. **building-scalable-apis-with-nodejs**
   - Title: "Building Scalable APIs with Node.js and Express"
   - Category: Backend
   - Reading Time: 15 min
   - Tags: Node.js, API, Backend, Express

### 3 Products

1. **wireless-noise-cancelling-headphones**
   - Premium Wireless Noise-Cancelling Headphones
   - Price: $299.99
   - Category: Electronics
   - Rating: 4.8 (1,247 reviews)

2. **mechanical-gaming-keyboard-rgb**
   - Mechanical Gaming Keyboard with RGB
   - Price: $159.99
   - Category: Gaming
   - Rating: 4.6 (892 reviews)

3. **smart-fitness-watch-pro**
   - Smart Fitness Watch Pro
   - Price: $249.99
   - Category: Wearables
   - Rating: 4.7 (2,134 reviews)

### 3 Users

1. **johndoe**
   - John Doe
   - Full-stack developer
   - 1,234 followers, 89 posts

2. **janesmith**
   - Jane Smith
   - UI/UX Designer & Frontend Developer
   - 2,456 followers, 156 posts

3. **mikejohnson**
   - Mike Johnson
   - Backend Engineer
   - 3,421 followers, 234 posts

---

## Key Features Demonstrated

### 1. SEO Features ✅

- Dynamic page titles
- Meta descriptions
- Open Graph tags
- Twitter Cards
- JSON-LD structured data
- Breadcrumb navigation
- Canonical URLs
- Keywords/tags

### 2. Performance Features ✅

- Static Site Generation (SSG)
- Lazy loading images
- Optimized rendering
- Pre-generated at build time

### 3. User Experience ✅

- Related content
- Clear navigation
- Responsive design
- Rich information display
- Social sharing ready

### 4. Developer Experience ✅

- Type-safe data fetching
- Reusable utilities
- Clear patterns
- Easy to customize

---

## Testing URLs

Once you start the dev server with `pnpm dev`, visit these URLs:

### Blog Posts

```
http://localhost:3000/blog/getting-started-with-nextjs-15
http://localhost:3000/blog/mastering-typescript-advanced-patterns
http://localhost:3000/blog/building-scalable-apis-with-nodejs
```

### Products

```
http://localhost:3000/products/wireless-noise-cancelling-headphones
http://localhost:3000/products/mechanical-gaming-keyboard-rgb
http://localhost:3000/products/smart-fitness-watch-pro
```

### Users

```
http://localhost:3000/users/johndoe
http://localhost:3000/users/janesmith
http://localhost:3000/users/mikejohnson
```

---

## What to Check

When viewing these pages:

1. **View Page Source** (Right-click → View Page Source)
   - Look for `<title>` tag
   - Check meta tags
   - Find JSON-LD `<script type="application/ld+json">`

2. **Test Social Sharing**
   - Use Facebook Debugger
   - Use Twitter Card Validator
   - Check LinkedIn Inspector

3. **Validate Structured Data**
   - Use Google Rich Results Test
   - Check for errors/warnings

4. **Check Performance**
   - Open DevTools → Network tab
   - See how fast the page loads
   - Check if images lazy load

---

## Customization Examples

### Change Blog Post Content

Edit `lib/data/blog.ts`:

```tsx
const mockBlogPosts: BlogPost[] = [
  {
    slug: 'your-post-slug',
    title: 'Your Post Title',
    description: 'Your description',
    content: 'Your content...',
    author: {
      name: 'Your Name',
      avatar: 'your-avatar-url',
      bio: 'Your bio',
    },
    publishedAt: '2024-01-15T10:00:00Z',
    tags: ['Tag1', 'Tag2'],
    readingTime: 5,
    category: 'Tutorial',
  },
  // ... more posts
];
```

### Change Product Data

Edit `lib/data/products.ts`:

```tsx
const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'your-product-slug',
    name: 'Your Product Name',
    description: 'Short description',
    longDescription: 'Long description...',
    price: 99.99,
    currency: 'USD',
    imageUrl: 'product-image-url',
    // ... more fields
  },
  // ... more products
];
```

---

## Next Steps

1. ✅ View all example pages
2. ✅ Check page source for SEO metadata
3. ✅ Test with validation tools
4. ✅ Customize the mock data
5. ✅ Integrate with your own data source
6. ✅ Deploy to production

Happy building! 🚀
