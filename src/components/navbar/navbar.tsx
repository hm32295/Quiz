"use client";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import NewQuizIcon from "../../../public/new quiz icon.png";
import Image from "next/image";
import clientCookie from "@/services/cookies/clientCookie";
import { ProfileDataType } from "@/interfaces/interfaces";
import LogoutConfirmModal from "../logoutConfirmModal/logoutConfirmModal";
import { useDispatch } from "react-redux";
import { show } from "@/redux/Features/createQuiz";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileDataType | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const cookieData = clientCookie.get("profile");
    if (cookieData) setProfile(cookieData);
  }, []);

  return (
    <nav className="w-full border-b bg-white shadow-sm z-50 fixed top-0 left-0 h-[60px]">
      <div className="flex items-center justify-between px-4 py-2 md:px-8 h-full">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0 font-semibold text-sm">
            <span className="w-6 h-6 flex items-center justify-center border-[3px] rounded-full">✖</span>
            <span className="w-6 h-6 flex ml-[-3px] items-center justify-center border-[3px] rounded-full">✔</span>
            <span className="ml-2 text-lg">Groups</span>
          </div>
        </div>

        {/* Center - New Quiz */}
        <button
          onClick={() => dispatch(show())}
          className="hidden md:flex items-center gap-2 border px-4 py-1 rounded-full hover:bg-gray-100 transition"
        >
          <Image src={NewQuizIcon} alt="icon Quiz" /> New quiz
        </button>

        {/* Right section */}
        <div className="flex items-center gap-6">
          {/* User */}
          <div className="hidden md:flex flex-col items-start">
            <span className="font-semibold text-sm">
              {profile ? `${profile?.first_name} ${profile?.last_name}` : "Unknown"}
            </span>
            <span className="text-xs text-green-600">{profile?.role || "N/A"}</span>
          </div>
          <div className="hidden md:flex">
            <LogoutConfirmModal />
          </div>

          {/* Hamburger menu */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoMdClose size={24} /> : <CiMenuBurger size={24} />}
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
          <div className="absolute z-50 right-0 top-full w-60 py-2 border-t bg-gray-50 space-y-3 rounded-bl-2xl shadow-lg animate__animated animate__slideInRight">
            <div className="px-4">
              <span className="block font-semibold text-sm">
                {profile ? `${profile?.first_name} ${profile?.last_name}` : "Unknown"}
              </span>
              <span className="block text-xs text-green-600">{profile?.role || "N/A"}</span>
            </div>

            <button
              onClick={() => {
                dispatch(show());
                setIsOpen(false);
              }}
              className="w-full text-left px-4 hover:bg-[#ececec] flex items-center gap-1 py-2 rounded-md"
            >
              <Image src={NewQuizIcon} alt="icon Quiz" /> New quiz
            </button>

            <div className="cursor-pointer px-4 py-2 hover:bg-[#ececec]">
              <LogoutConfirmModal />
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
