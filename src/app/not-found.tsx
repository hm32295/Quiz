'use client';
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const {t} = useTranslation()
  return (
    <main className="min-h-dvh grid place-items-center bg-white text-[#333] dark:bg-black dark:text-white px-6">
      <div className="relative text-center max-w-2xl">
        {/* Accent halo */}
        <div className="pointer-events-none absolute -inset-8 -z-10 blur-2xl opacity-20" style={{background: "radial-gradient(60% 50% at 50% 50%, #C5D86D 0%, transparent 60%)"}} />

        {/* Chip */}
        <div className="inline-flex items-center justify-center rounded-2xl border border-[#333] dark:border-[#333] px-4 py-2 mb-6">
          <span className="h-2 w-2 rounded-full bg-[#C5D86D] mr-2" />
          <span className="text-xs sm:text-sm tracking-widest uppercase">{t('chipNotFound')}</span>
        </div>



        {/* 404 headline */}
        <h1 className="select-none font-extrabold leading-none tracking-tight">
          <span className="block text-7xl sm:text-8xl md:text-9xl">4
            <span className="text-[#C5D86D] drop-shadow-sm">0</span>
            4
          </span>
        </h1>

        {/* Message */}
        <p className="mt-5 text-sm sm:text-base md:text-lg">{t("messageNotFound")}</p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium border border-[#333] dark:border-[#333] hover:shadow-md transition"
          >{t("actionsNotFound")}</Link>

       
        </div>

        {/* Decorative SVG */}
        <div className="mt-10 flex justify-center opacity-90">
          <svg
            width="260"
            height="20"
            viewBox="0 0 260 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className="max-w-full"
          >
            <path d="M2 10 C 22 2, 42 18, 62 10 S 102 2, 122 10 162 18, 182 10 222 2, 242 10" fill="none" stroke="#C5D86D" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Subtle border card for extra info (optional) */}
        <div className="mt-8 mx-auto w-full max-w-xl rounded-2xl border border-[#333] dark:border-[#333] p-4 text-left">
          <p className="text-xs sm:text-sm leading-relaxed">{t("messageParaNotFound")}</p>
        </div>
      </div>
    </main>
  );
}
