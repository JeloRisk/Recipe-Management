/** @format */

"use client";
import Link from "next/link";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/add", label: "Add Recipe" },
  ];

  return (
    <nav className='navbar bg-white border-b border-b-gray-400 py-4 flex justify-between items-center z-10 px-4 sm:px-6 md:px-20'>
      <div className='flex items-center'>
        <Link href={"/"}>
          <div className='text-2xl font-bold text-gray-700 hover:text-gray-900'>Dear Delicacy</div>
        </Link>{" "}
      </div>

      {/* Desktop Links */}
      <div className='hidden md:flex space-x-4 text-gray-600'>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}>
            <div className='hover:text-gray-900 transition-colors duration-300'>{link.label}</div>
          </Link>
        ))}
      </div>

      {/* Mobile Menu Icon */}
      <button
        className='md:hidden text-gray-700 focus:outline-none'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label='Toggle navigation menu'>
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'></path>
        </svg>
      </button>

      {/*  Dropdown Menu */}
      {isMenuOpen && (
        <div className='md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-lg'>
          <ul className='flex flex-col space-y-4 p-4 text-gray-600'>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <div className='block hover:text-gray-900 transition-colors duration-300'>{link.label}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
