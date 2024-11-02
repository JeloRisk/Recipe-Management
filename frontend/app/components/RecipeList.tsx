/** @format */

import React from "react";

function RecipeList({}) {
  return (
    <div className='grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3'>
      {recipes.map((recipe) => (
        <Link
          key={recipe._id}
          href={`/recipe/${recipe._id}`}
          passHref>
          <div className='cursor-pointer border border-gray-200 p-4 rounded-lg shadow-md hover:border-primary transition-colors'>
            <h2 className='text-lg font-semibold text-primary'>{recipe.title}</h2>
            <p className='text-sm text-gray-600'>{recipe.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RecipeList;
