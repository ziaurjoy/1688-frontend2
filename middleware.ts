// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protected routes that require authentication
  const protectedRoutes = ["/admin-dashboard", "/dashboard", "/profile"];

  // Auth routes that should redirect if already logged in
  const authRoutes = ["/sign-in", "/sign-up"];

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Check if current route is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // User is trying to access a protected route
  if (isProtectedRoute) {
    if (!token) {
      // No token found, redirect to sign-in
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Token exists, allow access
    return NextResponse.next();
  }

  // User is trying to access auth routes
  if (isAuthRoute) {
    if (token) {
      // User is already authenticated, redirect to dashboard
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }

    // User is not authenticated, allow access to auth pages
    return NextResponse.next();
  }

  // For all other routes, allow access
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public).*)",
  ],
};
