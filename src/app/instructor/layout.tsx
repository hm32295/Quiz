import Navbar from "@/components/navbar/navbar";
import SidBar from "@/components/sidBar/sidBar";
import { FaChartBar, FaClipboardList, FaHome, FaUserGraduate, FaUsers } from "react-icons/fa";
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, link: "/instructor/dashboard" },
    { name: "Students", icon: <FaUserGraduate />, link: "/instructor/student" },
    { name: "Groups", icon: <FaUsers />, link: "/instructor/group" },
    { name: "Quizzes", icon: <FaClipboardList />, link: "/instructor/quizes" },
    { name: "Questions", icon: <FaChartBar />, link: "/instructor/questions" },
    { name: "Results", icon: <FaChartBar />, link: "/instructor/results" },
  ];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
        <Navbar/>
        <div className="flex mt-16">
            <SidBar menuItems={menuItems}/>
            <div className="flex-1 bg-[#ffedd4] p-4">
                {children}
            </div>
        </div>
      

      
    </div>
  );
}
