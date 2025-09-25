"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaTimes, FaCheck } from "react-icons/fa";
import NewQuizIcon from "../../../public/new quiz icon.png";
import Image from "next/image";
import clientCookie from "@/services/cookies/clientCookie";
import { ProfileDataType } from "@/interfaces/interfaces";
import LogoutConfirmModal from "../logoutConfirmModal/logoutConfirmModal";
import { useDispatch } from "react-redux";
import { show } from "@/redux/Features/createQuiz";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../languageSwitcher/languageSwitcher";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(); // rtl or ltr
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileDataType | null>(null);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const pageTitles = useMemo(
    () => ({
      "/instructor/dashboard": t("navbar_dashboard"),
      "/instructor/student": t("navbar_students"),
      "/instructor/group": t("navbar_groups"),
      "/instructor/quizes": t("navbar_quizzes"),
      "/instructor/questions": t("navbar_questions"),
      "/instructor/results": t("navbar_results"),
    }),
    [t]
  );

  const [currentPage, setCurrentPage] = useState(
    pageTitles[pathname as keyof typeof pageTitles] || t("navbar_groups")
  );

  const handelCurrentPage = useCallback(
    (pathname: string) => {
      const matchedPage = Object.keys(pageTitles).find((key) =>
        pathname.startsWith(key)
      );
      if (matchedPage && matchedPage in pageTitles) {
        setCurrentPage(pageTitles[matchedPage as keyof typeof pageTitles]);
      }
    },
    [pageTitles]
  );

  useEffect(() => {
    const cookieData = clientCookie.get("profile");
    if (cookieData) setProfile(cookieData);
  }, []);

  useEffect(() => {
    handelCurrentPage(pathname);
  }, [pathname, handelCurrentPage]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 h-[60px] bg-white shadow-md border-b">
      <div className="flex items-center justify-between px-4 md:px-8 h-full">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <span className="gap-0 flex">
              <span className="w-6 h-6 flex items-center justify-center border-[3px] border-gray-300 rounded-full bg-gray-100">
                <FaTimes size={14} className="text-gray-500" />
              </span>
              <span className="w-6 h-6 flex ml-[-3px] items-center justify-center border-[3px] border-green-400 rounded-full bg-green-50">
                <FaCheck size={14} className="text-green-500" />
              </span>
            </span>
            <span className="ml-2 text-lg capitalize text-gray-700">
              {currentPage}
            </span>
          </div>
        </div>

        {/* Center - New Quiz */}
        {!pathname.includes("learner") && (
          <button
            onClick={() => {
              dispatch(show());
            }}
            className="hidden md:flex cursor-pointer items-center gap-2 border border-gray-300 px-4 py-1 rounded-full hover:bg-gray-100 transition shadow-sm"
          >
            <Image src={NewQuizIcon} alt="icon Quiz" className="w-5 h-5" />{" "}
            <span className="text-sm text-gray-700">{t("navbar_newQuiz")}</span>
          </button>
        )}

        {/* Right section */}
        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="hidden md:flex">
            <LanguageSwitcher />
          </div>

          {/* User Info */}
          <div className="hidden md:flex flex-col items-start">
            <span className="font-semibold text-sm capitalize text-gray-700">
              {profile
                ? `${profile?.first_name} ${profile?.last_name}`
                : t("navbar_unknown")}
            </span>
            <span className="text-xs text-green-600 capitalize">
              {profile?.role || t("navbar_role_not_available")}
            </span>
          </div>

          {/* Logout */}
          <div className="hidden md:flex">
            <LogoutConfirmModal />
          </div>

          {/* Hamburger menu */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {!isOpen && <CiMenuBurger size={26} className="text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile menu with backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`absolute z-50 top-full w-56 py-4 border-t bg-white shadow-xl rounded-lg
                ${dir === "rtl" ? "left-2 origin-left" : "right-2 origin-right"}`}
            >
              {/* Language Switcher in mobile */}
              <div className="px-4 mb-2">
                <LanguageSwitcher />
              </div>

              {/* User Info */}
              <div className="px-4 border-b pb-2 mb-2">
                <span className="block font-semibold text-sm capitalize text-gray-700">
                  {profile
                    ? `${profile?.first_name} ${profile?.last_name}`
                    : t("navbar_unknown")}
                </span>
                <span className="block text-xs text-green-600 capitalize">
                  {profile?.role || t("navbar_role_not_available")}
                </span>
              </div>

              {/* New Quiz button */}
              <button
                onClick={() => {
                  dispatch(show());
                  setIsOpen(false);
                }}
                className="w-full text-left cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center gap-2 rounded-md transition"
              >
                <Image src={NewQuizIcon} alt="icon Quiz" className="w-5 h-5" />{" "}
                <span className="text-sm text-gray-700">
                  {t("navbar_newQuiz")}
                </span>
              </button>

              {/* Logout */}
              <div className="px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition">
                <LogoutConfirmModal />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
