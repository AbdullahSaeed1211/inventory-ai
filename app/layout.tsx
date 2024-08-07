import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory AI",
  description: "Your Ultimate Tool for Smart Inventory Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="/node_modules/preline/dist/preline.js" async />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
