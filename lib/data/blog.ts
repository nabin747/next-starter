import type { BlogPost } from '@/types/content';
import { notFound } from 'next/navigation';

// Mock data - Replace with actual database or CMS calls
const mockBlogPosts: BlogPost[] = [
  {
    slug: 'getting-started-with-nextjs-15',
    title: 'Getting Started with Next.js 15: A Complete Guide',
    description:
      'Learn how to build modern web applications with Next.js 15, including Server Components, App Router, and more.',
    content: `
# Getting Started with Next.js 15

Next.js 15 brings exciting new features and improvements to the React framework...

## Key Features

- **Server Components**: Build faster applications with React Server Components
- **App Router**: New routing system with improved performance
- **Streaming**: Progressive rendering for better user experience

## Installation

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

...more content here...
    `,
    author: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      bio: 'Full-stack developer and technical writer',
    },
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    tags: ['Next.js', 'React', 'Web Development', 'Tutorial'],
    readingTime: 8,
    category: 'Tutorial',
  },
  {
    slug: 'mastering-typescript-advanced-patterns',
    title: 'Mastering TypeScript: Advanced Patterns and Best Practices',
    description:
      'Deep dive into advanced TypeScript patterns, generics, and type manipulation techniques.',
    content: `
# Mastering TypeScript

TypeScript has become essential for building scalable applications...

## Advanced Generics

Learn how to create reusable type-safe components...
    `,
    author: {
      name: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      bio: 'TypeScript enthusiast and open source contributor',
    },
    publishedAt: '2024-02-10T09:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Advanced'],
    readingTime: 12,
    category: 'Tutorial',
  },
  {
    slug: 'building-scalable-apis-with-nodejs',
    title: 'Building Scalable APIs with Node.js and Express',
    description:
      'Learn best practices for building production-ready APIs with Node.js, Express, and TypeScript.',
    content: `
# Building Scalable APIs

A comprehensive guide to API development...
    `,
    author: {
      name: 'Mike Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      bio: 'Backend engineer specializing in Node.js',
    },
    publishedAt: '2024-03-05T14:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
    tags: ['Node.js', 'API', 'Backend', 'Express'],
    readingTime: 15,
    category: 'Backend',
  },
];

/**
 * Get all blog posts
 * @param options - Filtering and pagination options
 * @returns Promise resolving to array of blog posts
 */
export async function getBlogPosts(options?: {
  tag?: string;
  category?: string;
  limit?: number;
}): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let posts = [...mockBlogPosts];

  if (options?.tag) {
    posts = posts.filter((post) =>
      post.tags.some((t) => t.toLowerCase() === options.tag?.toLowerCase()),
    );
  }

  if (options?.category) {
    posts = posts.filter((post) => post.category.toLowerCase() === options.category?.toLowerCase());
  }

  if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/**
 * Get a single blog post by slug
 * @param slug - The post slug
 * @returns Promise resolving to blog post or throws notFound
 */
export async function getBlogPost(slug: string): Promise<BlogPost> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return post;
}

/**
 * Get all blog post slugs for static generation
 * @returns Promise resolving to array of slugs
 */
export async function getBlogPostSlugs(): Promise<string[]> {
  return mockBlogPosts.map((post) => post.slug);
}

/**
 * Get related blog posts
 * @param currentSlug - Current post slug
 * @param limit - Number of related posts to return
 * @returns Promise resolving to array of related posts
 */
export async function getRelatedBlogPosts(currentSlug: string, limit = 3): Promise<BlogPost[]> {
  const currentPost = mockBlogPosts.find((p) => p.slug === currentSlug);
  if (!currentPost) return [];

  // Find posts with overlapping tags
  const related = mockBlogPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const commonTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      return { post, score: commonTags.length };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return related;
}
