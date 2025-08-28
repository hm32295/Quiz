// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const profileRaw = req.cookies.get("profile")?.value;

  
  if (!accessToken && refreshToken) {
    try {
      const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        accessToken = data.accessToken;

        const response = NextResponse.next();
        response.cookies.set("accessToken", accessToken, {path: "/", httpOnly: true,secure: true,maxAge: 60 * 60, });
        return response;
      } else {
        
        return NextResponse.redirect(new URL("/authentication/login", req.url));
      }
    } catch (err) {
      console.error("Refresh error:", err);
      return NextResponse.redirect(new URL("/authentication/login", req.url));
    }
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  let role: string | null = null;
  try {
    if (profileRaw) {
      const profile = JSON.parse(profileRaw);
      role = profile?.role || null;
    }
  } catch (e) {
    console.error("Invalid profile cookie", e);
    return NextResponse.redirect(new URL("/authentication/login", req.url));
  }

  const { pathname } = req.nextUrl;

  // Instructor
  if (pathname.startsWith("/instructor")) {
    if (role === "Instructor") {
      if (pathname === "/instructor") {
        return NextResponse.redirect(new URL("/instructor/dashboard", req.url));
      }
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Learner
  if (pathname.startsWith("/learner")) {
    if (role === "Learner") {
      if (pathname === "/learner") {
        return NextResponse.redirect(new URL("/learner/dashboard", req.url));
      }
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/learner/:path*", "/instructor/:path*"],
};
