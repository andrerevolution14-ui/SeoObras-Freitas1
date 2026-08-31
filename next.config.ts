import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images served from external sources
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Compress all responses
  compress: true,
  // Remove powered-by header
  poweredByHeader: false,
};

export default nextConfig;
