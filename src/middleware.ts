import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { getFromCache } from "./lib/cache";
// import { getFromCache } from "./lib/cache";

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

  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(redirects.public, req.nextUrl));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(redirects.protected, req.nextUrl));
  }

  if (path.startsWith("/auth/otp")) {
    const sessionId = req.headers.get("x-session-id");
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

    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\..*|sitemap.xml|robots.txt).*)",
  ],
};
