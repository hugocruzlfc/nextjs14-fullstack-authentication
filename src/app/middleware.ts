import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const pathVariable = request.nextUrl.pathname;
  // const publicPaths = [
  //   "/update-password",
  //   "/login",
  //   "/register",
  //   "/forgot-password",
  // ];

  const auth = request.cookies.get("token");

  if (!auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // console.log(auth);

  // const isLogged = publicPaths.includes(pathVariable) && auth;

  // if (isLogged) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // if (!isLogged) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
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
