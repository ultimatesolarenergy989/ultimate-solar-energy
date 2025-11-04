import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is a dashboard route
  if (pathname.startsWith("/dashboard")) {
    console.log('🟣 Middleware: Checking dashboard access for:', pathname);
    
    // Get the auth token from cookies
    const token = request.cookies.get("auth_token")?.value;
    console.log('🟣 Middleware: Token exists:', !!token);
    
    if (token) {
      console.log('🟣 Middleware: Token length:', token.length);
      console.log('🟣 Middleware: Token preview:', token.substring(0, 50) + '...');
    }

    // If no token exists, redirect to sign-in
    if (!token) {
      console.log('🔴 Middleware: No token, redirecting to sign-in');
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Verify JWT token
    console.log('🟣 Middleware: Verifying token...');
    const payload = await verifyToken(token);
    console.log('🟣 Middleware: Payload:', payload ? 'Valid' : 'Invalid');
    
    if (payload) {
      console.log('🟣 Middleware: User ID:', payload.userId);
      console.log('🟣 Middleware: Session ID:', payload.sessionId);
    }

    // If token is invalid or expired, clear cookie and redirect
    if (!payload) {
      console.log('🔴 Middleware: Token verification failed, redirecting to sign-in');
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname);
      signInUrl.searchParams.set("error", "session_expired");
      
      const response = NextResponse.redirect(signInUrl);
      response.cookies.delete("auth_token");
      return response;
    }
    
    console.log('✅ Middleware: Access granted to dashboard');

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
      const payload = await verifyToken(token);
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    
    // Always clear any invalid cookies on sign-in/sign-up pages
    const response = NextResponse.next();
    if (token) {
      response.cookies.delete("auth_token");
    }
    return response;
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

