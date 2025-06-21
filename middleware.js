import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  // Allow access to login and register for unauthenticated users
  if (!token) {
    if (url.pathname !== "/sign-in" && url.pathname !== "/register") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next();
  }

  const userRole = token.role;

  // User restrictions: Can only access /dashboard
  if (userRole === "user") {
    if (!url.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Admin restrictions: Can only access /admin
  if (userRole === "admin") {
    if (!url.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // Writer restrictions: Can only access /writer
  if (userRole === "writer") {
    if (!url.pathname.startsWith("/writer")) {
      return NextResponse.redirect(new URL("/writer", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to relevant routes
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/writer/:path*", "/sign-in", "/register"],
};