import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayan | WebGL Engineer & Creative Developer",
  description: "High-conversion, interactive portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-full font-sans relative antialiased text-white selection:bg-cyber-cyan selection:text-black">
        <Preloader />
        <div className="bg-scanlines fixed inset-0 pointer-events-none z-50 opacity-20" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
