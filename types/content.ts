// Blog Post Types
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  imageUrl?: string;
  tags: string[];
  readingTime: number; // in minutes
  category: string;
}

// Product Types
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  currency: string;
  imageUrl: string;
  images: string[];
  category: string;
  brand?: string;
  sku: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  features: string[];
  specifications: Record<string, string>;
}

// User Profile Types
export interface UserProfile {
  id: string;
  username: string;
  name: string;
  bio?: string;
  avatar?: string;
  coverImage?: string;
  email?: string;
  website?: string;
  location?: string;
  joinedAt: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  stats: {
    followers: number;
    following: number;
    posts: number;
  };
}
