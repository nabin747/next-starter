/**
 * JSON-LD Structured Data Component
 *
 * This component renders JSON-LD structured data for better SEO.
 * Use it in your page components to add rich snippets to search results.
 *
 * @example
 * ```tsx
 * <JsonLd data={buildArticleJsonLd({...})} />
 * ```
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
