/** @format */
import React from "react";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  _id: string;
}

interface Recipe {
  _id: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
}

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
      <div className='bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg p-8 overflow-y-auto max-h-[90vh]'>
        <button
          onClick={onClose}
          className='text-gray-500 hover:text-gray-700 float-right mb-2'>
          Close
        </button>
        <h2 className='text-2xl font-bold mb-4 text-[#d70a6a]'>{recipe.title}</h2>
        <p className='text-gray-700 mb-4'>{recipe.description}</p>
        <h3 className='text-lg font-semibold mb-2'>Ingredients</h3>
        <ul className='list-disc ml-6 text-gray-600'>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient._id}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeModal;
