/** @format */

import Image from "next/image";
import heroImage from "../public/images/hero.jpg";
import Link from "next/link";

export default function Home() {
  return (
    // min-h-screen
    <div className='min-h-[90vh] relative flex flex-col items-center w-full bg-gray-50 '>
      <div className='absolute inset-0 w-full h-full overflow-hidden'>
        <Image
          src={heroImage}
          alt='A beautiful spread of fresh ingredients'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          className='opacity-80'
        />
      </div>

      <div className='absolute inset-0 bg-black opacity-30'></div>

      <div className=' flex flex-col items-center justify-center gap-8 p-8 md:p-12 text-center  text-white max-w-2xl z-10 w-full h-full'>
        <h1 className='font-poppins text-5xl font-bold text-white'>Welcome to Recipe Management</h1>
        <p className='text-lg text-white opacity-90'>Discover, manage, and share your favorite recipes effortlessly.</p>
        <Link
          href={"/recipes"}
          className='mt-4 px-8 py-3 bg-primary rounded-md text-white font-semibold hover:bg-primary-dark transition-colors duration-300'>
          Explore Recipes
        </Link>
      </div>
    </div>
  );
}
