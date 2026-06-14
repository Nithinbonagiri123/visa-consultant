import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingRoot: process.cwd(),

  async rewrites() {
    return [
      // Public, SEO-canonical URLs map to the cleaner internal /destinations route.
      // Next 16's Turbopack mishandles mixed-text dynamic segments like `study-in-[slug]`,
      // so this rewrite keeps /study-in-ireland visible to users + search engines
      // while the route handler lives at /destinations/[slug].
      { source: "/study-in-:slug", destination: "/destinations/:slug" },
    ];
  },
};

export default nextConfig;
