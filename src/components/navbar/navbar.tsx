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
    <nav className="w-full border-b bg-white shadow-sm z-50 fixed top-0 left-0 h-[60px]">
      <div className="flex items-center justify-between px-4 py-2 md:px-8 h-full">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <span className="gap-0 flex">
              <span className="w-6 h-6 flex items-center justify-center border-[3px] rounded-full">
                <FaTimes size={14} />
              </span>
              <span className="w-6 h-6 flex ml-[-3px] items-center justify-center border-[3px] rounded-full">
                <FaCheck size={14} />
              </span>
            </span>
            <span className="ml-2 text-lg capitalize">{currentPage}</span>
          </div>
        </div>

        {/* Center - New Quiz */}
        {!pathname.includes("learner") && (
          <button
            onClick={() => {
              dispatch(show());
            }}
            className="hidden md:flex cursor-pointer items-center gap-2 border px-4 py-1 rounded-full hover:bg-gray-100 transition"
          >
            <Image src={NewQuizIcon} alt="icon Quiz" /> {t("navbar_newQuiz")}
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
            <span className="font-semibold text-sm capitalize">
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
            {!isOpen && <CiMenuBurger size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu with backdrop */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div
            className={`absolute z-50 top-full w-48 py-2 border-t bg-gray-50 space-y-3 rounded-bl-2xl shadow-lg transform transition-transform duration-300
            ${dir === "rtl" ? "left-0" : "right-0"}
            ${isOpen ? "translate-x-0" : dir === "rtl" ? "-translate-x-full" : "translate-x-full"}`}
          >
            {/* Language Switcher in mobile */}
            <div className="px-4">
              <LanguageSwitcher />
            </div>

            {/* User Info */}
            <div className="px-4">
              <span className="block font-semibold text-sm capitalize">
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
              className="w-full text-left px-4 hover:bg-[#ececec] flex items-center gap-1 cursor-pointer py-2 rounded-md"
            >
              <Image src={NewQuizIcon} alt="icon Quiz" /> {t("navbar_newQuiz")}
            </button>

            {/* Logout */}
            <div className="cursor-pointer px-4 py-1 hover:bg-[#ececec]">
              <LogoutConfirmModal />
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
