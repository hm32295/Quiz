import Navbar from "@/components/navbar/navbar";
import SidBar from "@/components/sidBar/sidBar";
import { FaChartBar, FaHome} from "react-icons/fa";
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, link: "/learner/dashboard" },
    { name: "Results", icon: <FaChartBar />, link: "/learner/results" },
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
            <div className="flex-1 bg-[#ffedd4]">
                {children}
            </div>
        </div>
      

      
    </div>
  );
}
