"use client";

import React from "react";
import { FaFolderOpen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type Props = {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onActionClick?: () => void;
  className?: string;
};

export default function NoData({
  title,
  subtitle,
  actionLabel,
  onActionClick,
  className = "",
}: Props) {
  const { t } = useTranslation();

  return (
    <div
      className={`animate__animated animate__fadeIn flex w-full justify-center items-center px-4 py-10 sm:px-6 sm:py-14 lg:py-20 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-md sm:max-w-lg rounded-3xl bg-white/70 dark:bg-black/60 backdrop-blur-xl shadow-2xl p-6 sm:p-10 lg:p-14 flex flex-col items-center text-center border border-white/20 relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FFEDDF]/40 via-transparent to-[#C5D86D]/30 opacity-60 pointer-events-none"></div>

        {/* Decorative Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 bg-[#FFEDDF] rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-28 h-28 sm:w-40 sm:h-40 lg:w-44 lg:h-44 bg-[#C5D86D] rounded-full opacity-30 blur-3xl"></div>

        {/* Icon */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#FFEDDF] to-[#C5D86D] shadow-[6px_6px_15px_rgba(0,0,0,0.15),-6px_-6px_15px_rgba(255,255,255,0.3)] mb-6 animate__animated animate__zoomIn">
          <FaFolderOpen className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-black dark:text-white animate__animated animate__pulse animate__infinite" />
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-black dark:text-white mb-3 tracking-tight animate__animated animate__fadeInUp">
          {title || t("noData_title")}
        </h3>

        {/* Subtitle */}
        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-lg max-w-sm sm:max-w-md leading-relaxed mb-6 animate__animated animate__fadeInUp animate__delay-1s">
          {subtitle || t("noData_subtitle")}
        </p>

        {/* Action Button */}
        {onActionClick && (
          <button
            onClick={onActionClick}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#C5D86D] to-[#FFEDDF] font-semibold text-black shadow-md hover:shadow-lg transition-all duration-300 animate__animated animate__fadeInUp animate__delay-2s"
          >
            {actionLabel || t("noData_actionLabel")}
          </button>
        )}
      </div>
    </div>
  );
}
