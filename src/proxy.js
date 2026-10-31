import { NextResponse } from "next/server";

// Next 16 renamed Middleware → Proxy. Optimistic cookie check only — the DB
// is not reachable here and Better Auth forbids getSession() in middleware.
// Real enforcement happens in RequireAuth (client) and the API routes (401).
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/add-studio",
  "/my-listings",
  "/my-bookings",
  "/studios/edit",
];

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  const hasSessionCookie = request.cookies.has("better-auth.session_token");
  if (!hasSessionCookie) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/add-studio/:path*",
    "/my-listings/:path*",
    "/my-bookings/:path*",
    "/studios/edit/:path*",
  ],
};
