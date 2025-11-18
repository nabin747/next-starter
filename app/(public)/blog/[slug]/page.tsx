import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CalendarDays, Clock, User } from 'lucide-react';
import { getBlogPost, getBlogPostSlugs, getRelatedBlogPosts } from '@/lib/data/blog';
import { generateMetadata as genMeta, buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for blog post page (SEO)
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getBlogPost(slug);

    return genMeta({
      title: post.title,
      description: post.description,
      path: `/blog/${slug}`,
      imageUrl: post.imageUrl,
      imageAlt: post.title,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    });
  } catch {
    return {
      title: 'Blog Post Not Found',
    };
  }
}

/**
 * Generate static params for all blog posts
 * This enables Static Site Generation (SSG)
 */
export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Blog post page component
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(slug);

  // JSON-LD structured data for SEO
  const articleJsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    publishedDate: post.publishedAt,
    modifiedDate: post.updatedAt,
    authorName: post.author.name,
    imageUrl: post.imageUrl,
    tags: post.tags,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-8">
          {/* Category badge */}
          <div className="mb-4">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">{post.title}</h1>

          {/* Description */}
          <p className="mb-6 text-xl text-muted-foreground">{post.description}</p>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-secondary px-2 py-1 text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Featured Image */}
        {post.imageUrl && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, '<br/>'),
            }}
          />
        </div>

        {/* Author bio */}
        <div className="mt-12 border-t pt-8">
          <div className="flex items-start gap-4">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full"
              />
            )}
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
              {post.author.bio && (
                <p className="mt-1 text-sm text-muted-foreground">{post.author.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 border-t pt-8">
            <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <a
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
                >
                  {relatedPost.imageUrl && (
                    <Image
                      src={relatedPost.imageUrl}
                      alt={relatedPost.title}
                      width={400}
                      height={160}
                      className="mb-3 h-40 w-full rounded-md object-cover"
                    />
                  )}
                  <h3 className="mb-2 font-semibold group-hover:text-primary">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{relatedPost.description}</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {relatedPost.readingTime} min read
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
