// components/Navbar.tsx
"use client";
import { useState } from "react";
import {  CiLogout, CiMenuBurger } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import NewQuizIcon from '../../../public/new quiz icon.png'
import Image from "next/image";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white shadow-sm fixed top-0 left-0 h-[60px]">
      <div className="flex items-center justify-between px-4 py-2 md:px-8 h-full">
        {/* Left section */}
        <div className="flex items-center gap-3">
         

          {/* Logo / Groups */}
          <div className="flex items-center gap-0 font-semibold text-sm">
            <span className="w-6 h-6 flex  items-center justify-center border-[3px] rounded-full">✖</span>
            <span className="w-6 h-6 flex ml-[-3px] items-center justify-center border-[3px] rounded-full">✔</span>
            <span className="ml-2 text-lg">Groups</span>
          </div>
        </div>

        {/* Center - New Quiz */}
        <button className="hidden cursor-pointer md:flex items-center gap-2 border px-4 py-1 rounded-full hover:bg-gray-100 transition">
          <Image src={NewQuizIcon} alt="icon Quiz"/> New quiz
        </button>

        {/* Right section */}
        <div className="flex items-center gap-6">
          {/* Messages */}
          <div className="relative">
            <MdEmail  size={27} />
            <span className="absolute -top-2 -right-2 bg-[#FFEDDF] text-black text-xs px-1.5 py-0.5 rounded-full">
              10
            </span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <FaBell  size={27} />
            <span className="absolute -top-2 -right-2 bg-[#FFEDDF] text-black text-xs px-1.5 py-0.5 rounded-full">
              10
            </span>
          </div>

          {/* User */}
          <div className="hidden md:flex flex-col items-start">
            <span className="font-semibold text-sm">Nwabuikwu Chizuruoke</span>
            <span className="text-xs text-green-600">Tutor</span>
          </div>
           <div className="hidden md:flex items-center gap-2 cursor-pointer">
              <CiLogout size={22} />
              <span>Log out</ span>
            </div>
             {/* Hamburger menu */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoMdClose  size={24} /> : <CiMenuBurger  size={24} />}
          </button>
        </div>
        
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute z-50 right-0 top-full  py-2 border-t bg-gray-50 space-y-3 rounded-bl-2xl">
           <div className=" px-4">
            <span className="block font-semibold text-sm">Nwabuikwu Chizuruoke</span>
            <span className="block text-xs text-green-600">Tutor</span>
          </div>
          <button className="w-full text-left px-4 cursor-pointer hover:bg-[#ececec] flex items-center gap-1 py-2 rounded-md">
            <Image src={NewQuizIcon} alt="icon Quiz"/> New quiz
          </button>
         
         
          <div className="cursor-pointer px-4 py-2 hover:bg-[#ececec]">
            <div className="flex items-center gap-2">
              <CiLogout size={22} />
              <span>Log out</ span>
            </div>
          </div>
         
        </div>
      )}
      <div>
        
      </div>
    </nav>
  );
}
