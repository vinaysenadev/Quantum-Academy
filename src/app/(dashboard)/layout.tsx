import React from "react";
import { School } from "lucide-react";
import Link from "next/link";

import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex overflow-hidden">
      <aside
        className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-white border-r border-gray-100 flex flex-col"
        aria-label="Sidebar Menu"
      >
        <Link
          href="/"
          className="flex justify-center items-center lg:justify-start gap-2 p-2 md:p-4 hover:opacity-80 transition-opacity"
          aria-label="Quantum Academy Home"
        >
          <School className="size-8 text-[#581c87]" />
          <div className="hidden lg:flex flex-col">
            <span className="text-lg font-black text-gray-800 leading-none">
              Quantum
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
              Academy
            </span>
          </div>
        </Link>

        <div className="flex-1 overflow-y-auto px-2">
          <Menu />
        </div>
      </aside>

      <main
        className="flex-1 bg-[#F7F8FA] overflow-y-auto flex flex-col"
        role="main"
      >
        <Navbar />
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
