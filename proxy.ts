// middleware.ts
import { NextRequest, NextResponse } from "next/server";
// Import your NextAuth middleware-compatible handler (proxy.ts should export the handler)
// import nextAuthHandler from "./app/api/auth/proxy"; // adjust path if different

const LATEST = process.env.API_VERSION ?? "v1";
const API_PREFIX = "/api/";

// Helper: return true for paths that should skip auth/versioning (static, images, next internals, auth endpoints)
function isStaticOrInternal(pathname: string) {
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.startsWith("/api/auth") || // don't rewrite or auth NextAuth's own API routes
    /\.(?:png|jpe?g|gif|svg|webp|ico|css|js|json|woff2?|ttf|map)$/.test(
      pathname,
    ) ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt"
  );
}

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Skip static/internal files early
  if (isStaticOrInternal(pathname)) {
    return NextResponse.next();
  }

  // 1) Rewrite unversioned API paths to /api/v{N}/... and add deprecation headers
  if (pathname.startsWith(API_PREFIX) && !/^\/api\/v\d+\//.test(pathname)) {
    const rest = pathname.slice(API_PREFIX.length); // e.g. 'resume-data'
    const newPath = `/api/${LATEST}/${rest}${search}`;
    const url = new URL(newPath, req.url);

    const res = NextResponse.rewrite(url);
    res.headers.set("X-API-Version", LATEST);
    res.headers.set("Deprecation", "true");
    // Optional: res.headers.set("Sunset", "Wed, 11 Dec 2025 00:00:00 GMT");
    return res;
  }

  // 2) For non-API pages (or API endpoints you want protected), delegate to NextAuth's middleware handler
  // If you only want auth on page routes, restrict matcher below accordingly.
  // try {
  //   // nextAuthHandler is the default export from proxy.ts (NextAuth(authConfig).auth)
  //   // It can be invoked like middleware and should return a Response or NextResponse
  //   const authResponse = await nextAuthHandler(req as any);
  //   // If nextAuthHandler returned NextResponse.next() or a Response, return it.
  //   return authResponse ?? NextResponse.next();
  // } catch (err) {
  //   console.error("NextAuth middleware error:", err);
  //   return NextResponse.next();
  // }
}

export const config = {
  // Run on both API and page routes; tune patterns to match where you want middleware to run
  matcher: [
    // Run on all pages (except Next internals) and on /api/* so the rewrite above applies
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/api/:path*",
  ],
};
