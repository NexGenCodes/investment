import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

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
    signup: "/auth/register",
  };

  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(redirects.public, req.nextUrl));
  }

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(redirects.protected, req.nextUrl));
  }

  if (path.startsWith("/auth/otp")) {
    const iv = req.nextUrl.searchParams.get("iv");
    const encrypted = req.nextUrl.searchParams.get("encrypted");

    // Redirect to signup if query parameters are missing
    if (!iv || !encrypted) {
      console.log("Missing Query Params. Redirecting to Signup...");
      return NextResponse.redirect(new URL(redirects.signup, req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\..*|sitemap.xml|robots.txt).*)",
  ],
};
