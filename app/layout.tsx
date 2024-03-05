import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";
import { Inter as FontSans } from "next/font/google"
import { cn } from "../lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Video Share App",
  description: "Video Share App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "bg-background font-sans antialiased h-screen",
        fontSans.variable
      )}>
        <div className="flex flex-col h-full">
          <Navbar />
          <div className="mt-20 h-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
