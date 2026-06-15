import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingRoot: process.cwd(),

  async rewrites() {
    return [
      // City pages (Tier-2 SEO). These must come before the country catch-all
      // so /study-in-dublin hits the city route, not the destination route.
      { source: "/study-in-dublin",     destination: "/cities/dublin" },
      { source: "/study-in-london",     destination: "/cities/london" },
      { source: "/study-in-manchester", destination: "/cities/manchester" },
      { source: "/study-in-toronto",    destination: "/cities/toronto" },
      { source: "/study-in-vancouver",  destination: "/cities/vancouver" },
      { source: "/study-in-melbourne",  destination: "/cities/melbourne" },
      { source: "/study-in-sydney",     destination: "/cities/sydney" },
      { source: "/study-in-berlin",     destination: "/cities/berlin" },

      // Country pages (catch-all). Public, SEO-canonical URLs map to the
      // cleaner internal /destinations route. Next 16's Turbopack mishandles
      // mixed-text dynamic segments like `study-in-[slug]`, so this rewrite
      // keeps /study-in-ireland visible to users + search engines while the
      // route handler lives at /destinations/[slug].
      { source: "/study-in-:slug", destination: "/destinations/:slug" },
    ];
  },
};

export default nextConfig;
