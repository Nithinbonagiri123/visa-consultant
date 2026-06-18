import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Edge-runtime middleware that defends our three POST endpoints from
// drive-by abuse (mass-spam of the leads sheet and email-drip provider):
//
//   1. **Same-origin check** — POSTs must come from a page on this domain.
//      Browser-driven forms always include an Origin header. CSRF and naive
//      external scripts get a 403.
//   2. **In-memory rate limit** — 5 POSTs per 60 s per IP. Fine for a
//      single-instance Vercel deploy; swap for Upstash Redis if you scale
//      to multi-region.
//
// In dev (NODE_ENV !== "production") we tolerate Origin-less POSTs so curl
// smoke tests still pass.

const PROTECTED_PATHS = ["/api/leads", "/api/newsletter", "/api/guides"];

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const buckets = new Map<string, number[]>();

const isDev = process.env.NODE_ENV !== "production";

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = buckets.get(ip) ?? [];
  const fresh = arr.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (fresh.length >= RATE_LIMIT_MAX) {
    buckets.set(ip, fresh);
    return true;
  }
  fresh.push(now);
  buckets.set(ip, fresh);

  // Periodic GC so the map doesn't grow unbounded.
  if (buckets.size > 1000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) buckets.delete(k);
    }
  }
  return false;
}

function isSameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin) return isDev; // tolerate Origin-less POSTs in dev (curl/postman)
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function getClientIP(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function middleware(req: NextRequest) {
  if (req.method !== "POST") return NextResponse.next();
  const path = req.nextUrl.pathname;
  if (!PROTECTED_PATHS.some((p) => path === p || path.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (rateLimited(getClientIP(req))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/leads/:path*", "/api/newsletter/:path*", "/api/guides/:path*"],
};
