"use client";
import Navbar from "@/components/navbar/navbar";
import SidBar from "@/components/sidBar/sidBar";
import { FaChartBar, FaHome } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t, i18n } = useTranslation();

  const menuItems = [
    { name: t("learnerLayout.menu.dashboard"), icon: <FaHome />, link: "/learner/dashboard" },
    { name: t("learnerLayout.menu.results"), icon: <FaChartBar />, link: "/learner/results" },
  ];
 
  const direction = i18n.dir(); // "ltr" or "rtl"

  return (
    <div dir={direction}>
      <Navbar />
      <div className="flex mt-16">
        <SidBar menuItems={menuItems} />
        <main
          className={`pt-[60px] p-1 sm-p-4 w-full bg-[#f6f3f4] min-h-screen transition-all duration-300
          ${direction === "ltr" ? "md:ml-48" : "md:mr-48"}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
