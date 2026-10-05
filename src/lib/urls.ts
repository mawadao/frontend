import type { NextRequest } from "next/server";

/** A same-site path to return to after signing in. Anything else falls back to the home page. */
export function safeNext(value: string | null | undefined) {
  return value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\") ? value : "/";
}

/** The public origin. Behind Cloud Run or another proxy, prefer the forwarded host. */
export function siteOrigin(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host");
  if (host && process.env.NODE_ENV !== "development") {
    return `${request.headers.get("x-forwarded-proto") ?? "https"}://${host}`;
  }
  return request.nextUrl.origin;
}
