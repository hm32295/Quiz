"use client";
import "@/styles/globals.css";
import "@/lib/i18n.ts";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const {i18n } = useTranslation();
  // useEffect(() => {
    
  //   document.documentElement.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
  // }, [i18n.language]);

  return (
    // <html lang={i18n.language}>
    <html >
      <body style={{height:'500vh'}}>
      <Provider store={store}>
        <div className="flex gap-2">
            {/* <button className="cursor-pointer" onClick={() => i18n.changeLanguage("ar")}>العربية</button>
            <button className="cursor-pointer" onClick={() => i18n.changeLanguage("en")}>English</button> */}
        </div>
        {children}
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
      </Provider>

      
      </body>
    </html>
  );
}
