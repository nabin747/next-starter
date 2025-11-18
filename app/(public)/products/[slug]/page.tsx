import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, Check, ShoppingCart } from 'lucide-react';
import { getProduct, getProductSlugs, getRelatedProducts } from '@/lib/data/products';
import { generateMetadata as genMeta, buildProductJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for product page (SEO)
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProduct(slug);

    return genMeta({
      title: product.name,
      description: product.description,
      path: `/products/${slug}`,
      imageUrl: product.imageUrl,
      imageAlt: product.name,
      type: 'website',
    });
  } catch {
    return {
      title: 'Product Not Found',
    };
  }
}

/**
 * Generate static params for all products (SSG)
 */
export async function generateStaticParams() {
  const slugs = await getProductSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

/**
 * Product page component
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  let product;
  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(slug);

  // JSON-LD structured data for SEO
  const productJsonLd = buildProductJsonLd({
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    price: product.price,
    currency: product.currency,
    availability: product.inStock ? 'InStock' : 'OutOfStock',
    rating: product.rating,
    reviewCount: product.reviewCount,
    brand: product.brand,
    sku: product.sku,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: product.category, path: `/products?category=${product.category}` },
    { name: product.name, path: `/products/${slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Product Details */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-card">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={800}
                height={800}
                className="h-auto w-full object-cover"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-lg border bg-card">
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={200}
                      height={200}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Category */}
            <div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>

            {/* Rating */}
            {product.rating && product.reviewCount && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating!)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="text-3xl font-bold">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: product.currency,
              }).format(product.price)}
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>

            {/* Stock Status */}
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                product.inStock ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
              }`}
            >
              {product.inStock ? (
                <>
                  <Check className="h-4 w-4" />
                  In Stock
                </>
              ) : (
                'Out of Stock'
              )}
            </div>

            {/* CTA Button */}
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 font-semibold">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Brand & SKU */}
            <div className="space-y-1 text-sm text-muted-foreground">
              {product.brand && (
                <p>
                  <span className="font-medium">Brand:</span> {product.brand}
                </p>
              )}
              <p>
                <span className="font-medium">SKU:</span> {product.sku}
              </p>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 space-y-8">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Product Description</h2>
            <p className="whitespace-pre-line text-muted-foreground">{product.longDescription}</p>
          </div>

          {/* Specifications */}
          {Object.keys(product.specifications).length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">Specifications</h2>
              <div className="rounded-lg border bg-card">
                <table className="w-full">
                  <tbody className="divide-y">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">{key}</td>
                        <td className="px-6 py-4 text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <a
                  key={relatedProduct.slug}
                  href={`/products/${relatedProduct.slug}`}
                  className="group block rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
                >
                  <Image
                    src={relatedProduct.imageUrl}
                    alt={relatedProduct.name}
                    width={400}
                    height={192}
                    className="mb-3 h-48 w-full rounded-md object-cover"
                  />
                  <h3 className="mb-2 font-semibold group-hover:text-primary">
                    {relatedProduct.name}
                  </h3>
                  <p className="mb-2 text-sm text-muted-foreground">{relatedProduct.description}</p>
                  <p className="text-lg font-bold">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: relatedProduct.currency,
                    }).format(relatedProduct.price)}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
