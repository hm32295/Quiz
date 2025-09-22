"use client";

import { useState } from "react";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import useLogout from "@/hooks/useLogout";
import { useTranslation } from "react-i18next";

export default function LogoutConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();
  const { t, i18n } = useTranslation();

  // نجيب اتجاه اللغة الحالي
  const direction = i18n.dir();

  return (
    <>
      {/* زر الفتح */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer justify-between items-center gap-1.5 py-2 rounded-lg bg-transparent text-black hover:opacity-70 transition"
      >
        {/* أيقونة حسب الاتجاه */}
        <FaSignOutAlt
          className={`w-5 h-5 ${direction === "rtl" ? "rotate-180" : ""}`}
        />
        <span>{t("logoutModal.openButton")}</span>
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-center animate__animated animate__zoomIn"
          >
            {/* زرار إغلاق */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-red-500 transition"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* أيقونة */}
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFEDDF] text-gray-800 animate__animated animate__pulse animate__infinite">
              <FaSignOutAlt className="w-8 h-8" />
            </div>

            {/* العنوان */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {t("logoutModal.title")}
            </h2>

            {/* الرسالة */}
            <p className="text-gray-600 mb-6">
              {t("logoutModal.message")}
            </p>

            {/* الأزرار */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 cursor-pointer rounded-xl bg-[#FFEDDF] hover:bg-[#ffd6b8] text-gray-800 font-medium transition"
              >
                {t("logoutModal.cancel")}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="px-4 py-2 cursor-pointer rounded-xl bg-[#FFEDDF] hover:bg-[#ffd6b8] text-gray-900 font-semibold transition"
              >
                {t("logoutModal.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
