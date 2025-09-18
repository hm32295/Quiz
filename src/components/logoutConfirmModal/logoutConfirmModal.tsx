"use client";

import { useState } from "react";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import "animate.css";
import useLogout from "@/hooks/useLogout";

export default function LogoutConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer justify-between items-center gap-1.5 py-2 rounded-lg bg-transparent text-black hover:scale-3d transition"
      >
        <FaSignOutAlt className="w-5 h-5" />
        <span> Logout </span>
      </button>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
          onClick={(e)=> e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl text-center animate__animated animate__zoomIn"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 text-red-600 animate__animated animate__pulse animate__infinite">
              <FaSignOutAlt className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Confirm Logout
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to log out? You’ll need to log in again to access your account.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 cursor-pointer py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout(); 
                }}
                className="px-4 cursor-pointer py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
