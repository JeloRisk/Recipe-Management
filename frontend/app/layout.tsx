/** @format */

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const poppins = localFont({
  src: "./fonts/Poppins.ttf",
  variable: "--font-poppins",
  weight: "400 700", // Adjust weights if necessary
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Recipe Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} ${poppins.variable} antialiased bg-gray-50 h-full flex justify-start`}>{children}</body>
    </html>
  );
}
