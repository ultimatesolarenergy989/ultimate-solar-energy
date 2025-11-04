import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is a dashboard route
  if (pathname.startsWith("/dashboard")) {
    // Get the auth token from cookies
    const token = request.cookies.get("auth_token")?.value;

    // If no token exists, redirect to sign-in
    if (!token) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Check if user is already logged in trying to access sign-in/sign-up
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    const token = request.cookies.get("auth_token")?.value;

    // If token exists, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/sign-up",
  ],
};

