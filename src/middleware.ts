import { type NextRequest, NextResponse } from "next/server";
import { composeMiddleware } from "./middleware/core/compose";
import { withRateLimit } from "./middleware/rate-limit";
import { withAuth } from "./middleware/auth";
import { withStaticPatterns } from "./middleware/static";

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
