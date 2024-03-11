import { NextRequest, NextResponse } from "next/server";

const middleware = (request: NextRequest) => {
  const pathVariable = request.nextUrl.pathname;
  const publicPaths = [
    "/update-password",
    "/login",
    "/register",
    "/forgot-password",
  ];

  const auth = request.cookies.get("token") || "";

  const isLogged = publicPaths.includes(pathVariable) && auth;

  if (isLogged) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: ["/", "/update-profile", "/login", "/register", "/forgot-password"],
};

export default middleware;
