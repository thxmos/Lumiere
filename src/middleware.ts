import { type NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { AUTH_COOKIE_NAME } from "./constants/app";

const rateLimiters = {
  auth: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
    analytics: true,
    prefix: "ratelimit:auth:",
  }),
  api: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(20, "10 s"), // 20 requests per 10 seconds
    analytics: true,
    prefix: "ratelimit:api:",
  }),
  // clicks: new Ratelimit({...}), // Link click tracking (more generous)
  // qr: new Ratelimit({...}), // QR code generation (medium limit)
};

const PROTECTED_ROUTES = ["/dashboard", "/api/protected"];
const PUBLIC_ROUTES = ["/auth/login", "/auth/register", "/api/public"];
const STATIC_PATTERNS = ["/_next", "/fonts", "/images", "/favicon.ico"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for static routes
  if (STATIC_PATTERNS.some((pattern) => path.startsWith(pattern))) {
    return NextResponse.next();
  }

  // Apply rate limiting
  const limiter = path.startsWith("/auth")
    ? rateLimiters.auth
    : rateLimiters.api;
  const { success } = await limiter.limit(request.ip ?? "127.0.0.1");

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Skip auth check for public routes
  if (PUBLIC_ROUTES.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (PROTECTED_ROUTES.some((route) => path.startsWith(route))) {
    const sessionId = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!sessionId) {
      if (path.startsWith("/api")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
