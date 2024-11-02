/** @format */

import Link from "next/link";

const Navigation = () => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/add", label: "Add Recipe" },
  ];

  return (
    <nav className='bg-primary p-4'>
      <div className='container mx-auto flex justify-center space-x-8'>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className='text-white font-semibold hover:underline '>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
