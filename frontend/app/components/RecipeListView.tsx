/** @format */

import React from "react";
import Link from "next/link";

interface ListViewProps {
  title: string;
  id: string;
  ingredients: { name: string; quantityAndUnit: string; _id: string }[];
}

const RecipeListView: React.FC<ListViewProps> = ({ title, id, ingredients }) => {
  return (
    <div className='flex flex-col p-4 border-b border-gray-200'>
      <Link
        href={"/recipes/" + id}
        className='flex flex-row gap-6'>
        <figure className='bg-[#d70a6a] rounded-lg'>
          <div className={`h-10 w-10 flex items-center justify-center text-white text-xl transition-shadow duration-300`}></div>
        </figure>{" "}
        <div className='text-lg font-semibold text-blue-600 hover:underline'>{title}</div>
      </Link>
      {/* <ul className='text-sm text-gray-600'>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            {ingredient.name} - {ingredient.quantityAndUnit}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default RecipeListView;
