import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
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

    // Verify JWT token
    const payload = verifyToken(token);

    // If token is invalid or expired, clear cookie and redirect
    if (!payload) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname);
      signInUrl.searchParams.set("error", "session_expired");
      
      const response = NextResponse.redirect(signInUrl);
      response.cookies.delete("auth_token");
      return response;
    }

    // Add user info to request headers for use in API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-email", payload.email);
    requestHeaders.set("x-user-role", payload.role);
    if (payload.sessionId) {
      requestHeaders.set("x-session-id", payload.sessionId);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Check if user is already logged in trying to access sign-in/sign-up
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    const token = request.cookies.get("auth_token")?.value;

    // If token exists and is valid, redirect to dashboard
    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      // If token is invalid, allow access to sign-in/sign-up and clear cookie
      const response = NextResponse.next();
      response.cookies.delete("auth_token");
      return response;
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

