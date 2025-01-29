import { NextRequest, NextResponse } from "next/server";
import { MiddlewareFactory } from "./core/types";
import { AUTH_COOKIE_NAME } from "@/constants/app";

const PROTECTED_ROUTES = ["/dashboard", "/api/protected"];
const PUBLIC_ROUTES = ["/auth/login", "/auth/register", "/api/public"];

export const withAuth: MiddlewareFactory = (next) => {
  return async (request: NextRequest) => {
    const path = request.nextUrl.pathname;

    // Skip auth check for public routes
    if (PUBLIC_ROUTES.some((route) => path.startsWith(route))) {
      return next(request);
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

    return next(request);
  };
};
