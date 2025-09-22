"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { AiOutlineCopy } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  code: string;
};

export default function QuizCreatedModal({
  isOpen,
  onClose,
  code,
}: Props) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // focus first interactive element
    const tOut = setTimeout(() => {
      dialogRef.current?.querySelector<HTMLButtonElement>("button[data-autofocus]")?.focus();
    }, 10);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(tOut);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    // backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      onClick={onClose}
      role="dialog"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* modal card */}
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-2xl p-6 sm:p-8 animate__animated animate__zoomIn"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="quiz-created-title"
      >
        {/* close */}
        <button
          aria-label={t("quizCreatedModal.close")}
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200"
        >
          <IoClose size={20} />
        </button>

        {/* icon */}
        <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-black text-white flex items-center justify-center shadow-md">
          <FaCheck size={22} />
        </div>

        {/* Title */}
        <h2 id="quiz-created-title" className="text-center text-lg sm:text-xl font-semibold text-gray-800">
          {t("quizCreatedModal.title")}
        </h2>

        {/* Code pill */}
        <div className="mt-5 flex items-center justify-center">
          <div className="flex items-center rounded-full overflow-hidden border border-gray-200 shadow-sm">
            <div className="px-3 py-2 bg-amber-50 text-sm font-semibold text-gray-700 tracking-wider">
              {t("quizCreatedModal.subtitle")}
            </div>
            <div className="px-4 py-2 bg-white text-sm sm:text-base font-bold tracking-wider min-w-[120px] text-center">
              {code}
            </div>
            <button
              className="px-3 py-2 bg-white border-l border-gray-200 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
              onClick={handleCopy}
              data-autofocus
            >
              <AiOutlineCopy size={16} />
            </button>
          </div>
        </div>

        {/* copied toast */}
        {copied && (
          <div className="mt-3 flex items-center justify-center">
            <div className="inline-block bg-green-600 text-white text-sm px-3 py-1 rounded-full shadow-sm animate__animated animate__fadeIn">
              {t("quizCreatedModal.copied")}
            </div>
          </div>
        )}

        {/* Close / actions */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 cursor-pointer rounded-full bg-amber-200 text-gray-800 font-medium hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
          >
            {t("quizCreatedModal.close")}
          </button>
        </div>
      </div>
    </div>
  );
}
