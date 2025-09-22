"use client";
import React, { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

interface MenuItemsType {
  name: string;
  icon: ReactNode;
  link: string;
}

const Sidebar = ({ menuItems }: { menuItems: MenuItemsType[] }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { i18n } = useTranslation();

  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    setDir(i18n.dir() as "ltr" | "rtl");
  }, [i18n.language]);

  const isRTL = dir === "rtl";

  const handleLinkClick = () => {
    // لو الشاشة أصغر من md نخفي السايدبار
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed top-[60px] ${
          isRTL ? "right-0" : "left-0"
        } cursor-pointer text-2xl md:hidden bg-white shadow px-4 py-2 z-30`}
      >
        <IoIosArrowForward
          className={`${open ? "rotate-180" : ""} transition`}
          style={{
            transform: isRTL
              ? open
                ? "rotate(0deg)"
                : "rotate(180deg)"
              : open
              ? "rotate(180deg)"
              : "rotate(0deg)",
          }}
        />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-[60px] ${
          isRTL ? "right-0" : "left-0"
        } h-[calc(100vh-60px)] w-48 bg-white shadow-md p-4 z-20 
        transform ${
          open
            ? "translate-x-0"
            : isRTL
            ? "translate-x-full"
            : "-translate-x-full"
        } 
        md:translate-x-0 transition-transform`}
      >
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = pathname.includes(item.link);
            return (
              <li key={index}>
                <Link
                  href={item.link}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 p-2 rounded-xl transition
                    ${
                      isActive
                        ? "bg-orange-200 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                >
                  <span className="text-xl bg-orange-100 p-2 rounded-lg">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black opacity-40 z-10 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
