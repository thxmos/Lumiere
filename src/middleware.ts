import { type NextRequest, NextResponse } from "next/server";
import { composeMiddleware } from "./shared/core/middleware/util/compose";
import { withStaticPatterns } from "./shared/core/middleware/static";
import { withRateLimit } from "./shared/core/middleware/rate-limit";
import { withAuth } from "./shared/core/middleware/auth";

const handler = composeMiddleware([
  withStaticPatterns, // let static files pass
  withRateLimit,
  withAuth,
])((req) => {
  return NextResponse.next();
});

export async function middleware(request: NextRequest) {
  return handler(request);
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
