/** @format */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "./components/Navigation";

const poppins = localFont({
  src: "./fonts/Poppins.ttf",
  variable: "--font-poppins",
  weight: "400 700",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Recipe Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} antialiased bg-gray-50 h-full w-full justify-center flex flex-col`}>
        {/* s navbar */}
        <Navigation></Navigation>
        {/* e navbar */}

        <main className='flex bg-white shadow-md rounded-md  w-full'>{children}</main>
      </body>
    </html>
  );
}
