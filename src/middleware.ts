import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathVariable = request.nextUrl.pathname;
  const publicPaths = [
    "/update-password",
    "/login",
    "/register",
    "/forget-password",
  ];

  const auth = request.cookies.get("token")?.value;

  if (auth && publicPaths.includes(pathVariable)) {
    return Response.redirect(new URL("/", request.url));
  }

  if (!auth && !publicPaths.includes(pathVariable)) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
