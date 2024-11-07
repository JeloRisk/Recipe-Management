/** @format */

import Link from "next/link";

const RecipeHeader = () => (
  <div className="w-full flex justify-between items-center mb-6">
    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Your Recipes</h1>
    <Link href="/recipes/createRecipe">
      <button className="bg-[#d70a6a] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-md hover:bg-[#941d55] transition duration-300">
        Add New
      </button>
    </Link>
  </div>
);

export default RecipeHeader;
