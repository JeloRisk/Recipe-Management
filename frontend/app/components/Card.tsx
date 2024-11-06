/** @format */

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  id: string;
}

const Card: React.FC<CardProps> = ({ title, id }) => {
  return (
    <div
      className='card bg-base-100 lg:w-72 md:w-72 sm:w-full shadow-md relative transition-transform transform hover:scale-105 rounded-lg' 
    >
      <Link href={"/recipes/" + id}>
        <figure className='bg-[#d70a6a] rounded-t-lg'>
        
          <div className={`h-36 flex items-center justify-center text-white text-xl transition-shadow duration-300`}>{title}</div>
        </figure>
      </Link>

      <div className='card-body p-4'>
        <h2 className='card-title text-md'>{title}</h2>
      </div>
    </div>
  );
};

export default Card;
