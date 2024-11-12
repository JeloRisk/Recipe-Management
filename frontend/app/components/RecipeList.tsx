/** @format */

import React, { useState } from "react";
import Card from "../components/Card";
import RecipeListView from "../components/RecipeListView";

interface Recipe {
  _id: string;
  title: string;
  ingredients: { name: string; quantityAndUnit: string; _id: string }[];
}

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelectRecipe }) => {
  const [view, setView] = useState<"card" | "list">("card");

  return (
    <div className='w-full max-w-screen-xl mx-auto p-4'>
      <div className='flex justify-end mb-4'>
        <button
          onClick={() => setView(view === "card" ? "list" : "card")}
          className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
          {view === "card" ? "View List" : "View Cards"}
        </button>
      </div>

      {view === "card" ? (
        <div
          className='grid gap-6 lg:w-fit md:w-fit sm:w-full 
          grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
          {recipes.map((recipe) => (
            <Card
              key={recipe._id}
              title={recipe.title}
              id={recipe._id}
              ingredients={recipe.ingredients}
              onClick={() => onSelectRecipe(recipe)}
            />
          ))}
        </div>
      ) : (
        <div className='divide-y divide-gray-200'>
          {recipes.map((recipe) => (
            <RecipeListView
              key={recipe._id}
              title={recipe.title}
              id={recipe._id}
              ingredients={recipe.ingredients}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
