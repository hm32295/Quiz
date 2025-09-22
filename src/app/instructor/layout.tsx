"use client";

import AddAndEditQuiz from "@/components/addAndEditQuiz/addAndEditQuiz";
import Navbar from "@/components/navbar/navbar";
import SidBar from "@/components/sidBar/sidBar";
import {
  FaChartBar,
  FaClipboardList,
  FaHome,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(); // rtl or ltr

  const menuItems = [
    { name: "dashboard", icon: <FaHome />, link: "/instructor/dashboard" },
    { name: "students", icon: <FaUserGraduate />, link: "/instructor/student" },
    { name: "groups", icon: <FaUsers />, link: "/instructor/group" },
    { name: "quizzes", icon: <FaClipboardList />, link: "/instructor/quizes" },
    { name: "questions", icon: <FaChartBar />, link: "/instructor/questions" },
    { name: "results", icon: <FaChartBar />, link: "/instructor/results" },
  ];

  const translatedMenuItems = menuItems.map((item) => ({
    ...item,
    name: t(`rootLayout_unique.menuItems.${item.name}`),
  }));

  return (
    <div dir={dir}>
      <Navbar />
      <div className="flex mt-16">
        {dir === "ltr" && <SidBar menuItems={translatedMenuItems} />}

        <main
          className={`pt-[60px] w-full overflow-hidden p-1 bg-[#f6f3f4] min-h-screen ${
            dir === "ltr" ? "md:ml-48" : "md:mr-48"
          }`}
        >
          {children}
        </main>

        {dir === "rtl" && <SidBar menuItems={translatedMenuItems} />}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <AddAndEditQuiz />
    </div>
  );
}
