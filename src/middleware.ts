import { type NextRequest, NextResponse } from "next/server";
import { lucia } from "@/utils/lucia";
import { getSessionIdFromCookie } from "@/utils/cookies";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

//TODO: how to implement default rate limiter
//TODO: rethink PROTECTED_ROUTES and PUBLIC_ROUTES with default route
//TODO: more research on what rate limits are optimal

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
  default: new Ratelimit({
    redis: kv,
    limiter: Ratelimit.slidingWindow(100, "1 m"), // 100 requests per minute
    analytics: true,
    prefix: "ratelimit:default:",
  }),
};

// Define protected route patterns
const PROTECTED_ROUTES = ["/dashboard", "/api/protected"] as const;

// Define public routes that bypass auth
const PUBLIC_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/api/public",
  "/verify-email",
  "/reset-password",
] as const;

const STATIC_PATTERNS = ["/_next", "/fonts", "/images", "/favicon.ico"];

const securityHeaders = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

// TODO: don't get session Id From Cookie
async function validateAuth() {
  const sessionId = getSessionIdFromCookie();

  if (!sessionId) {
    return {
      success: false,
      error: "No session found",
    };
  }

  try {
    const { user, session } = await lucia.validateSession(sessionId);

    if (!session) {
      return {
        success: false,
        error: "Invalid session",
      };
    }

    return { success: true, session, user };
  } catch (error) {
    console.error("Session validation error:", error);
    return {
      success: false,
      error: "Session validation failed",
    };
  }
}

// Utility functions
function isProtectedRoute(path: string): boolean {
  return PROTECTED_ROUTES.some((route) => path.startsWith(route));
}

function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some((route) => path.startsWith(route));
}

function isStaticRoute(path: string): boolean {
  return STATIC_PATTERNS.some((pattern) => path.startsWith(pattern));
}

function getIP(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return "127.0.0.1";
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const ip = getIP(request);

  // Create base response with security headers
  const response = NextResponse.next();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Skip middleware for static routes
  if (isStaticRoute(path)) {
    return response;
  }

  try {
    // Apply rate limiting based on route type
    const limiter = path.startsWith("/auth")
      ? rateLimiters.auth
      : rateLimiters.api;
    const { success: rateLimit, reset } = await limiter.limit(ip);

    if (!rateLimit) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests",
          retryAfter: reset - Date.now(),
        }),
        {
          status: 429,
          headers: {
            "Retry-After": `${Math.ceil((reset - Date.now()) / 1000)}`,
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Skip auth check for public routes
    if (isPublicRoute(path)) {
      return response;
    }

    // Validate auth for protected routes
    if (isProtectedRoute(path)) {
      const authResult = await validateAuth();

      if (!authResult.success) {
        //return 401 for API routes
        if (path.startsWith("/api")) {
          return new NextResponse(JSON.stringify({ error: authResult.error }), {
            status: 401,
          });
        }

        //redirect to login for non-API routes
        const redirectUrl = new URL("/auth", request.url);
        redirectUrl.searchParams.set("redirect", path);
        return NextResponse.redirect(redirectUrl);
      }

      // Add user context to headers if needed
      if (authResult.user) {
        response.headers.set("X-User-Id", authResult.user.id);
      }
      if (authResult.user?.roles) {
        //TODO: should i implement roles here?
        response.headers.set("X-User-Role", authResult.user.roles);
      }
    }

    return response;
  } catch (error) {
    console.error("Middleware Error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 },
    );
  }
}
