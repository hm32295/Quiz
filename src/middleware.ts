// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const profileRaw = req.cookies.get("profile")?.value;

  // Try refresh if no accessToken but refreshToken exists
  if (!accessToken && refreshToken) {
    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        accessToken = data.accessToken;

        const response = NextResponse.next();
        response.cookies.set("accessToken", accessToken, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60, // 1 hour
        });
        return response;
      } else {
        return NextResponse.redirect(new URL("/authentication/login", req.url));
      }
    } catch (err) {
      console.error("Refresh error:", err);
      return NextResponse.redirect(new URL("/authentication/login", req.url));
    }
  }

  // No accessToken at all
  if (!accessToken) {
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  // Parse role from profile cookie safely
  let role: string | null = null;
  if (profileRaw) {
    try {
      const profile = JSON.parse(profileRaw);
      role = profile?.role || null;
    } catch {
      console.error("Invalid profile cookie");
      return NextResponse.redirect(new URL("/authentication/login", req.url));
    }
  }

  const { pathname } = req.nextUrl;

  // ✅ Handle root "/"
  if (pathname === "/") {
    if (role === "Instructor") {
      return NextResponse.redirect(new URL("/instructor", req.url));
    } else if (role?.toLowerCase() === "student") {
      return NextResponse.redirect(new URL("/learner", req.url));
    } else {
      return NextResponse.redirect(new URL("/authentication/login", req.url));
    }
  }

  // Instructor routes
  if (pathname.startsWith("/instructor")) {
    if (role === "Instructor") {
      if (pathname === "/instructor") {
        return NextResponse.redirect(new URL("/instructor/dashboard", req.url));
      }
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  // Learner routes
  if (pathname.startsWith("/learner")) {
    if (role?.toLowerCase() === "student") {
      if (pathname === "/learner") {
        return NextResponse.redirect(new URL("/learner/dashboard", req.url));
      }
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/learner/:path*", "/instructor/:path*"], 
};
