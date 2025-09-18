// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1) optional: read refreshToken from cookies and notify backend to invalidate it
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (refreshToken && process.env.NEXT_PUBLIC_API_URL) {
      // call backend endpoint to invalidate the refresh token (optional but recommended)
      // don't block logout if backend fails, just try/catch
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (e) {
        console.warn("Could not notify backend to invalidate refresh token", e);
      }
    }

    // 2) Create redirect response to login and clear cookies
    const response = NextResponse.redirect(new URL("/authentication/login", req.url));

    // Delete cookies by setting them with maxAge 0 (or expires in the past)
    const cookieOptions = {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
    };

    // set cookies to empty with maxAge 0
    response.cookies.set("accessToken", "", { ...cookieOptions, maxAge: 0 });
    response.cookies.set("refreshToken", "", { ...cookieOptions, maxAge: 0 });
    response.cookies.set("profile", "", { ...cookieOptions, maxAge: 0 });

    return response;
  } catch (err) {
    console.error("Logout route error:", err);
    // fallback: still redirect to login and clear cookies
    const res = NextResponse.redirect(new URL("/authentication/login", req.url));
    res.cookies.set("accessToken", "", { path: "/", httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 0 });
    res.cookies.set("refreshToken", "", { path: "/", httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 0 });
    res.cookies.set("profile", "", { path: "/", httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 0 });
    return res;
  }
}

// optional: allow GET too if you want simple link logout
export const GET = POST;
