import type { NextConfig } from "next";

// Defence-in-depth HTTP headers applied to every response. CSP is the only
// one that needs editing if you add new third-party scripts (Crisp, analytics,
// embed providers, etc.).
const SECURITY_HEADERS = [
  { key: "X-Frame-Options",            value: "DENY" },
  { key: "X-Content-Type-Options",     value: "nosniff" },
  { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security",  value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // `'unsafe-inline'` is required by Next's inlined hydration scripts and our
      // JSON-LD blocks. `'unsafe-eval'` is dev-only — drop in production if you
      // never need it (Next dev needs it for HMR).
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://client.crisp.chat https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://*.crisp.chat wss://*.crisp.chat https://www.google-analytics.com",
      "frame-src 'self' https://*.crisp.chat",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingRoot: process.cwd(),

  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },

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
