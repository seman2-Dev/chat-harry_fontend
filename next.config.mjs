/** @type {import('next').NextConfig} */
// Keep production usable when Vercel's API_URL variable is missing. Local
// development still defaults to the local Express server.
const configuredApiUrl = process.env.API_URL?.trim().replace(/\/+$/, "");
const publicApiUrl = "https://cat-harry-backend-sable.vercel.app";
const isLocalApiUrl = !configuredApiUrl || /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?$/i.test(configuredApiUrl);
const API_URL =
  process.env.NODE_ENV === "production"
    ? (isLocalApiUrl ? publicApiUrl : configuredApiUrl)
    : (configuredApiUrl || "http://localhost:5000");

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
    // Studio photos and avatars come from user-supplied hosts (imgbb, postimage, etc.).
    // https only — never allow localhost/private IPs (SSRF); src/lib/images.js
    // strips those URLs before they reach next/image.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  experimental: {
    agentFeedback: true,
    useTypeScriptCli: false,
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
