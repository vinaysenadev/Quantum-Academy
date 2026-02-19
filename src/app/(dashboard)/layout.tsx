import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { School } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center lg:justify-start gap-2 mb-2"
        >
          <School size={30} color={"#581c87"} />
          <span className="hidden text-md lg:block font-bold text-purple-900">
            Quantum
            <p className="text-xs">Academy</p>
          </span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-auto flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
