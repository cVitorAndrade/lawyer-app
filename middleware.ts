import { NextRequest, NextResponse } from "next/server";

export default function Middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");

  const isAppRoute = request.nextUrl.pathname.startsWith("/app");
  const isAuthRoute =
    request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/sign-up";

  if (isAppRoute && !token) {
    const signInUrl = new URL("/", request.url);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthRoute && token) {
    const appUrl = new URL("/app", request.url);
    return NextResponse.redirect(appUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/", "/sign-up"],
};
