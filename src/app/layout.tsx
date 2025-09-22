"use client";
import "@/styles/globals.css";
import "@/lib/i18n.ts";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    const html = document.documentElement;

    if (i18n.language === "ar") {
      setDir("rtl");
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
    } else {
      setDir("ltr");
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
    }

    html.style.transition = "all 0.3s ease-in-out";
    document.body.style.transition = "all 0.3s ease-in-out";

    const timeout = setTimeout(() => {
      html.style.transition = "";
      document.body.style.transition = "";
    }, 300);

    return () => clearTimeout(timeout);
  }, [i18n.language]);

  return (
    <html lang={i18n.language} dir={dir}>
      <body>
        <Provider store={store}>
          {children}
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Provider>
      </body>
    </html>
  );
}
