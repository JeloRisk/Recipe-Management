/** @format */

import React, { useState } from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  // description: string;
}

const Card: React.FC<CardProps> = ({ title }) => {
  // hovering the specific Item
  const [hovered, setHovered] = useState(false);

  // const cutDesc = (text: string, limit: number) => {
  //   if (text.length > limit) {
  //     return text.slice(0, limit) + "...";
  //   }
  //   return text;
  // };

  return (
    <div
      className='card bg-base-100 lg:w-72 md:w-72 sm:w-full shadow-md relative transition-transform transform hover:scale-105 '
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <figure className='bg-[#d70a6a]'>
        <div className={`h-36 flex items-center justify-center text-white text-xl transition-shadow duration-300`}>{title}</div>
        {hovered && (
          <div className='absolute top-3 right-3 flex space-x-1'>
            <button
              className='bg-white rounded-full p-1 hover:bg-gray-200 transition'
              aria-label='Edit recipe'>
              <Image
                src='/icons/edit.svg'
                alt='Edit'
                width={20}
                height={20}
              />
            </button>
            <button
              className='bg-white rounded-full p-1 hover:bg-gray-200 transition'
              aria-label='Delete recipe'>
              <Image
                src='/icons/delete.svg'
                alt='Delete'
                width={20}
                height={20}
              />
            </button>
          </div>
        )}
      </figure>
      <div className='card-body p-4'>
        <h2 className='card-title text-md'>{title}</h2>
        {/* <p className='text-gray-700 text-sm'>{cutDesc(description, 50)}</p> */}
      </div>
    </div>
  );
};

export default Card;
