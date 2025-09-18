'use client'
import { useState } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = ({menuItems}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar for small screens */}
      <button className=" cursor-pointer text-2xl w-14 md:hidden flex items-center justify-between bg-white shadow px-4 py-2"></button>
      <button onClick={() => setOpen(!open)} className="fixed top-[60px] cursor-pointer text-2xl md:hidden flex items-center justify-between bg-white shadow px-4 py-2">
       
          <IoIosArrowForward  />
        </button>
      

      {/* Sidebar */}
      <div className={`hidden md:flex h-[calc(100vh-60px)] md:static z-0 w-64 bg-white shadow-md p-4 
        transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform`}
    ></div>
      <div
        className={`fixed h-[calc(100vh-60px)] md:fixed top-[60px] left-0 w-64 bg-white shadow-md p-4 z-20 
        transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform`}
      >
        
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition"
              >
                <span className="text-xl bg-orange-100 p-2 rounded-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black opacity-40 z-10 md:hidden"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
