"use client";
import "@/styles/globals.css";
import "@/lib/i18n.ts";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {i18n } = useTranslation();
  const [dir , setDir] = useState('en')
  return (
    <html>
      <body className='rtl'>
      <Provider store={store}>
        <div className="flex gap-2">
            <button className="cursor-pointer" onClick={() => {i18n.changeLanguage("ar");setDir('ar')}}>العربية</button>
            <button className="cursor-pointer" onClick={() => {i18n.changeLanguage("en");setDir('en')}}>English</button>
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
