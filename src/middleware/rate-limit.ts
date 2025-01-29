import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";
import { MiddlewareFactory } from "./core/types";

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
};

export const withRateLimit: MiddlewareFactory = (next) => {
  return async (request: NextRequest) => {
    const path = request.nextUrl.pathname;
    const limiter = path.startsWith("/auth")
      ? rateLimiters.auth
      : rateLimiters.api;

    const ip = request.ip ?? "127.0.0.1";
    const { success } = await limiter.limit(ip);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    return next(request);
  };
};
