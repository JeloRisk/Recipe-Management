/** @format */

import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  _id: string;
}

interface Recipe {
  title: string;
  ingredients: Ingredient[];
}

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose, onEdit, onDelete }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto'>
      <div
        ref={modalRef}
        className='bg-white rounded-lg shadow-lg w-11/12 md:w-4/5 
        lg:w-3/5 max-h-[90vh] h-[70vh] overflow-hidden flex flex-col sm:flex-col lg:flex-row'>
        {/* Photo Placeholder */}
        <div className='w-full lg:w-1/3 h-full bg-gradient-to-b from-[#f8c3d1] to-[#d70a6a] flex items-center justify-center relative'>
          <div className='absolute inset-0 h-full flex items-center justify-center'>
            {/* <Image
              src='/icons/image-placeholder.svg'
              alt='Recipe Image'
              width={80}
              height={80}
            /> */}
          </div>
        </div>
        <div className='w-full lg:w-2/3 p-6 overflow-y-auto max-h-[70vh]'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold text-[#d70a6a]'>{recipe.title}</h2>
            <div className='flex space-x-2'>
              <button
                onClick={onEdit}
                className='text-gray-600 hover:text-blue-500 transition duration-300 flex items-center'>
                <Image
                  src='/icons/edit.svg'
                  alt='Edit'
                  width={24}
                  height={24}
                />
              </button>
              <button
                onClick={onDelete}
                className='text-gray-600 hover:text-red-600 transition duration-300 flex items-center'>
                <Image
                  src='/icons/delete.svg'
                  alt='Delete'
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <h3 className='text-xl mb-2 text-gray-800'>Ingredients:</h3>
          <ul className='list-disc pl-5 mb-4'>
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient._id}
                className='text-gray-700'>
                <span className='font-medium'>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
