import { NextResponse } from "next/server";

export function middleware(request) {
  const hostname = request.headers.get("host") || "";
  // "arya-ayurveda.bkarogyam.com" → "arya-ayurveda"
  // "localhost:3000"               → "localhost" (falls back to DEFAULT_TENANT)
  const subdomain = hostname.split(".")[0].replace(/:.*$/, ""); // strip port if any

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tenant-slug", subdomain);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  return response;
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
