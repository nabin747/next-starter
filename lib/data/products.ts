import type { Product } from '@/types/content';
import { notFound } from 'next/navigation';

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'wireless-noise-cancelling-headphones',
    name: 'Premium Wireless Noise-Cancelling Headphones',
    description: 'Experience immersive sound with advanced noise cancellation technology',
    longDescription: `
      These premium wireless headphones deliver exceptional audio quality with
      industry-leading noise cancellation. Perfect for music lovers, travelers,
      and anyone seeking peace in a noisy world.

      Features include 30-hour battery life, comfortable over-ear design, and
      premium materials for lasting durability.
    `,
    price: 299.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
      'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800',
    ],
    category: 'Electronics',
    brand: 'AudioTech',
    sku: 'AT-WH-1000-BLK',
    inStock: true,
    rating: 4.8,
    reviewCount: 1247,
    features: [
      'Advanced Active Noise Cancellation',
      '30-hour battery life',
      'Premium comfort design',
      'Hi-Res audio certified',
      'Touch controls',
      'Foldable design with carrying case',
    ],
    specifications: {
      'Driver Size': '40mm',
      'Frequency Response': '4Hz - 40kHz',
      Impedance: '47 ohms',
      Weight: '250g',
      Connectivity: 'Bluetooth 5.0, 3.5mm jack',
      'Charging Time': '3 hours',
    },
  },
  {
    id: '2',
    slug: 'mechanical-gaming-keyboard-rgb',
    name: 'Mechanical Gaming Keyboard with RGB',
    description: 'Professional gaming keyboard with customizable RGB lighting',
    longDescription: `
      Elevate your gaming experience with this premium mechanical keyboard.
      Features Cherry MX switches, per-key RGB lighting, and programmable macros.
    `,
    price: 159.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800',
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
    ],
    category: 'Gaming',
    brand: 'GamerPro',
    sku: 'GP-KB-200-RGB',
    inStock: true,
    rating: 4.6,
    reviewCount: 892,
    features: [
      'Cherry MX Red switches',
      'Per-key RGB lighting',
      'Programmable macros',
      'Aluminum frame',
      'Detachable USB-C cable',
      'N-key rollover',
    ],
    specifications: {
      'Switch Type': 'Cherry MX Red',
      Layout: 'Full-size (104 keys)',
      Backlighting: 'Per-key RGB',
      'Polling Rate': '1000Hz',
      Cable: 'Detachable USB-C',
      Weight: '1.2kg',
    },
  },
  {
    id: '3',
    slug: 'smart-fitness-watch-pro',
    name: 'Smart Fitness Watch Pro',
    description: 'Track your health and fitness with advanced sensors and GPS',
    longDescription: `
      The ultimate fitness companion with heart rate monitoring, GPS tracking,
      sleep analysis, and over 100 workout modes. Water-resistant up to 50m.
    `,
    price: 249.99,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800',
    images: [
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
    ],
    category: 'Wearables',
    brand: 'FitTech',
    sku: 'FT-SW-300-BLK',
    inStock: true,
    rating: 4.7,
    reviewCount: 2134,
    features: [
      'Built-in GPS',
      'Heart rate monitoring',
      'Sleep tracking',
      '100+ workout modes',
      '7-day battery life',
      'Water-resistant (50m)',
      'Smartphone notifications',
    ],
    specifications: {
      Display: '1.4" AMOLED',
      'Battery Life': 'Up to 7 days',
      'Water Resistance': '5 ATM (50m)',
      Connectivity: 'Bluetooth 5.0',
      Compatibility: 'iOS & Android',
      Weight: '45g',
    },
  },
];

/**
 * Get all products
 */
export async function getProducts(options?: {
  category?: string;
  limit?: number;
}): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  let products = [...mockProducts];

  if (options?.category) {
    products = products.filter((p) => p.category.toLowerCase() === options.category?.toLowerCase());
  }

  if (options?.limit) {
    products = products.slice(0, options.limit);
  }

  return products;
}

/**
 * Get a single product by slug
 */
export async function getProduct(slug: string): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const product = mockProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return product;
}

/**
 * Get all product slugs for static generation
 */
export async function getProductSlugs(): Promise<string[]> {
  return mockProducts.map((p) => p.slug);
}

/**
 * Get related products
 */
export async function getRelatedProducts(currentSlug: string, limit = 3): Promise<Product[]> {
  const currentProduct = mockProducts.find((p) => p.slug === currentSlug);
  if (!currentProduct) return [];

  return mockProducts
    .filter((p) => p.slug !== currentSlug && p.category === currentProduct.category)
    .slice(0, limit);
}
