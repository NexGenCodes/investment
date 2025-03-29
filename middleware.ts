import NextAuth from "next-auth";
import authConfig from "./auth.config";
const { auth } = NextAuth(authConfig);

const publicRoutes = ["/auth/login", "/auth/signup", "/auth/otp"];
const protectedRoutes = ["/dashboard", "/investment"];

export default auth((req) => {
  const otpEmail = req.cookies.get("otp_email");
  const path = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const redirects = {
    public: "/dashboard",
    protected: "/auth/login",
  };

  console.log("Middleware running...");

  // redirect authenticated user away from public routes
  if (isPublicRoute && isLoggedIn) {
    return Response.redirect(new URL(redirects.public, req.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL(redirects.protected, req.url));
  }

  // Redirect unauthenticated users away from /auth/otp unless they have otp_email
  if (path.includes("/auth/otp") && !isLoggedIn && !otpEmail) {
    return Response.redirect(new URL(redirects.protected, req.url));
  }

});

// ✅ Apply middleware to ALL ROUTES except API, static files, and images
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
