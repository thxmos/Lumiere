import { NextRequest, NextResponse } from "next/server";

// Factory pattern to create middleware
export type MiddlewareFactory = (
  middleware: MiddlewareHandler,
) => MiddlewareHandler;

// Middleware handler
export type MiddlewareHandler = (
  request: NextRequest,
) => Promise<NextResponse | void> | NextResponse | void;
