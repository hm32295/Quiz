"use client";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { FaGlobe, FaFlagUsa, FaFlag, FaChevronDown } from "react-icons/fa";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
     
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg border bg-white shadow-sm hover:bg-gray-100 transition text-sm font-medium"
      >
        <FaGlobe className="text-blue-600" />
        {t("navbar.language")}
        <FaChevronDown
          className={`text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg animate__animated animate__fadeIn">
          <button
            onClick={() => toggleLanguage("en")}
            className="flex items-center cursor-pointer gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            <FaFlagUsa className="text-blue-500" /> {t("navbar.english")}
          </button>
          <button
            onClick={() => toggleLanguage("ar")}
            className="flex items-center cursor-pointer gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            <FaFlag className="text-red-500" /> {t("navbar.arabic")}
          </button>
        </div>
      )}
    </div>
  );
}
