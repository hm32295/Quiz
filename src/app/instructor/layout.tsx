import Navbar from "@/components/navbar/navbar";
import SidBar from "@/components/sidBar/sidBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
        <Navbar/>
        <div className="flex mt-16">
            <SidBar />
            <div className="flex-1 bg-amber-100">
                {children}
            </div>
        </div>
      

      
    </div>
  );
}
