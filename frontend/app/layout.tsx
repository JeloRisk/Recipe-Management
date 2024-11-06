/** @format */
import Link from "next/link";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
        <div className='navbar bg-white shadow-md px-8 py-4 flex justify-between items-center z-10'>
          <div className='flex items-center'>
            <a className='text-2xl font-bold text-gray-700 hover:text-gray-900'>Recipe Repository</a>
          </div>
          <div>
            <ul className='flex space-x-4 text-gray-600'>
              <li className='hover:text-gray-900 transition-colors duration-300'>
                <Link href='/recipes'>Recipes</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* e navbar */}

        <main className='flex bg-white shadow-md rounded-md  w-full'>{children}</main>
      </body>
    </html>
  );
}
