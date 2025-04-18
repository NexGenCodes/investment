import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { getFromCache } from "./lib/cache";
import { decrypt } from "./lib/encrypt";

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/auth/login", "/auth/register", "/auth/otp"];
const protectedRoutes = ["/dashboard", "/investment", "/referral"];

export default auth(async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));
  const redirects = {
    public: "/dashboard",
    protected: "/auth/login",
  };

  // Redirect authenticated users away from public routes (except /auth/otp)
  if (isPublicRoute && isLoggedIn && !path.startsWith("/auth/otp")) {
    return NextResponse.redirect(new URL(redirects.public, req.nextUrl));
  }

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(redirects.protected, req.nextUrl));
  }

  // Restrict /auth/otp to users with a valid signup session
  if (path.startsWith("/auth/otp")) {
    // Allow authenticated users to access /auth/otp (optional, based on your flow)
    if (isLoggedIn) {
      return NextResponse.next();
    }
    const sessionId = req.nextUrl.searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.redirect(new URL("/auth/register", req.nextUrl));
    }

    // Validate sessionId against node-cache
    const sessionData = getFromCache<{ iv: string; encrypted: string }>(
      `signup:${sessionId}`
    );
    if (!sessionData) {
      return NextResponse.redirect(new URL("/auth/register", req.nextUrl));
    }

    try {
      decrypt(sessionData.encrypted, sessionData.iv); // Ensure valid encryption
      return NextResponse.next(); // Allow access to /auth/otp
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/auth/register", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\..*|sitemap.xml|robots.txt).*)",
  ],
};
