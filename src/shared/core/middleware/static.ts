import { NextRequest } from "next/server";
import { MiddlewareFactory } from "./util/types";

const STATIC_PATTERNS = ["/_next", "/fonts", "/images", "/favicon.ico"];

export const withStaticPatterns: MiddlewareFactory = (next) => {
  return async (request: NextRequest) => {
    const path = request.nextUrl.pathname;

    // Skip middleware for static routes
    if (STATIC_PATTERNS.some((pattern) => path.startsWith(pattern))) {
      return next(request);
    }

    return next(request);
  };
};
