import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quantum Academy | Dashboard",
  description: "Modern School Management System for Quantum Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${inter.className} antialiased text-gray-900 bg-gray-50`}
        >
          {children}
          <ToastContainer
            position="bottom-right"
            theme="colored"
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
