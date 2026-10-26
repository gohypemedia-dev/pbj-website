import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    // Clear the Navigation Inspector's saved pause mode in local previews.
    if (process.env.NODE_ENV !== "development") return [];
    return [{
      source: "/:path*",
      headers: [{
        key: "Set-Cookie",
        value: "next-instant-navigation-testing=; Path=/; Max-Age=0",
      }],
    }];
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    qualities: [75, 95],
  },
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
