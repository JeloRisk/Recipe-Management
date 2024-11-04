/** @format */

import React, { useState } from "react";
import RecipeModal from "./RecipeModal"; // Adjust the path as needed

interface RecipeCardProps {
  recipe: {
    _id: string;
    title: string;
    description: string;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <div
        className='bg-white shadow-md rounded-lg p-6 cursor-pointer'
        onClick={handleOpenModal}>
        <h2 className='text-xl font-semibold'>{recipe.title}</h2>
        <p className='mt-2 text-gray-600'>{recipe.description}</p>
      </div>

      {/* Modal */}
      <RecipeModal
        _id={recipe._id}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RecipeCard;
