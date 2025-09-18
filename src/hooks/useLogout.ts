"use client";

import { useRouter } from "next/navigation";

/**
 * useLogout - calls server logout endpoint, clears local storages and redirects to login
 */
export default function useLogout() {
  const router = useRouter();

  const logout = async () => {
    try {
      // Call server logout endpoint that clears cookies server-side
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });

      // Clear client-side storages (optional but thorough)
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        // ignore if unavailable (e.g. SSR)
      }

      // Force navigation to login (replace to avoid back button returning)
      router.replace("/authentication/login");
      // Optionally reload to ensure middleware picks up cleared cookies
      // window.location.replace("/authentication/login");
    } catch (err) {
      console.error("Logout failed:", err);
      // still redirect to login to be safe
      router.replace("/authentication/login");
    }
  };

  return logout;
}
