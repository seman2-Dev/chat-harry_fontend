/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL || "http://localhost:5000";

const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/auth/:path*", destination: `${API_URL}/api/auth/:path*` },
      { source: "/api/studios/:path*", destination: `${API_URL}/api/studios/:path*` },
      { source: "/api/bookings/:path*", destination: `${API_URL}/api/bookings/:path*` },
      { source: "/api/uploads/:path*", destination: `${API_URL}/api/uploads/:path*` },
      { source: "/api/wishlist/:path*", destination: `${API_URL}/api/wishlist/:path*` },
    ];
  },
  images: {
    // Studio photos and avatars come from user-supplied hosts (imgbb, postimage, etc.)
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
