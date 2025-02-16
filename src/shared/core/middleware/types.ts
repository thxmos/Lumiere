import { type NextRequest, NextResponse } from "next/server";

export type MiddlewareFactory = (
  next: (request: NextRequest) => Promise<NextResponse>,
) => (request: NextRequest) => Promise<NextResponse>;
