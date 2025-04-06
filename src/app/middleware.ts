import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config"; // Adjust path if needed

const { auth } = NextAuth(authConfig);

const publicRoutes = ["/auth/login", "/auth/signup", "/auth/otp"];
const protectedRoutes = ["/dashboard", "/investment"];

export default auth(async (req: NextRequest) => {
  const otpEmail = req.cookies.get("otp_email")?.value; // Get cookie value
  const path = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth; // req.auth is populated by NextAuth
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));
  const redirects = {
    public: "/dashboard",
    protected: "/auth/login",
  };

  console.log("Middleware running...", { path, isLoggedIn, otpEmail });

  // Redirect authenticated users away from public routes
  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(redirects.public, req.nextUrl));
  }

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(redirects.protected, req.nextUrl));
  }

  // Redirect unauthenticated users away from /auth/otp unless they have otp_email cookie
  if (path.startsWith("/auth/otp") && !isLoggedIn && !otpEmail) {
    return NextResponse.redirect(new URL(redirects.protected, req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};