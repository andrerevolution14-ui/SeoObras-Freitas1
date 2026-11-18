import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deliver critical styles with the first response for mobile first visits.
  experimental: { inlineCss: true },
  // Optimize images served from external sources
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Compress all responses
  compress: true,
  // Remove powered-by header
  poweredByHeader: false,
  // Redirect non-www to www permanently (308)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "grupofreitasrenovacoes.pt",
          },
        ],
        destination: "https://www.grupofreitasrenovacoes.pt/:path*",
        permanent: true,
      },
    ];
  },
  // Security headers — improve Google trust score
  async headers() {
    return [
      ...["/api/:path*", "/admin/:path*", "/obrigado/:path*", "/obrigada/:path*"].map(source => ({
        source, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      })),
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico|woff|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {source: "/capa-media/:path*", headers: [{key:"Cache-Control",value:"public, max-age=31536000, immutable"}]},
    ];
  },
};

export default nextConfig;
