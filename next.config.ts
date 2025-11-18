import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    optimizePackageImports: ['lucide-react'],
  },
  turbopack: {
    root: '/home/nabin/GlobalSquareIT/next-starter',
  },
};

export default nextConfig;
