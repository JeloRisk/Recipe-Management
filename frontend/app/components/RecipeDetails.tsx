/** @format */

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirmationModal from "./modal/DeleteConfirmationModal";
import { useRouter } from "next/navigation"; // use next/navigation here

interface Ingredient {
  name: string;
  quantityAndUnit: string;
  _id: string;
}

interface Recipe {
  _id: string;
  title: string;
  ingredients: Ingredient[];
}

const RecipeDetails: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (router.query && router.query.updated === "true") {
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000);
    }
  }, [router.query]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/recipes/delete/${recipe._id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/recipes");
      }
    } catch (error) {
      console.error("Failed to delete the recipe.");
    }
    setShowDeleteModal(false);
  };

  return (
    <div className='fixed inset-0 shadow-sm flex pt-24 p-20 justify-center overflow-auto md:items-start sm:items-center md:flex-row lg:flex-row sm:flex-col'>
      <div className='sticky top-5 left-5 flex items-center space-x-2  pr-5 sm:w-full md:w-fit lg:w-fit'>
        <Link href='/recipes'>
          <div className='flex items-center text-blue-600 hover:text-blue-800'>
            <Image
              src='/icons/back.svg'
              alt='Back to Recipes'
              width={24}
              height={24}
              className='mr-2'
            />
          </div>
        </Link>
      </div>

      <div className='bg-white rounded-[32px] shadow-lg w-11/12 md:w-4/5 lg:w-5/5 max-h-full md:max-h-[90vh] md:h-[80vh] overflow-auto md:overflow-hidden flex flex-col md:flex-row lg:flex-row border-primary border-solid border-[1px]'>
        <div className='w-full lg:w-2/6 md:h-full lg:h-full sm:h-60 bg-gradient-to-b bg-primary flex items-center justify-center relative'>
          <div className='absolute inset-0 flex items-center justify-center'></div>
        </div>

        <div className='w-full lg:w-2/3 p-6 overflow-auto md:overflow-y-auto max-h-full md:max-h-[70vh]'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold text-[#d70a6a]'>{recipe.title}</h2>
            <div className='flex space-x-2'>
              <Link href={"/recipes/edit/" + recipe._id}>
                <Image
                  src='/icons/edit.svg'
                  alt='Edit'
                  width={24}
                  height={24}
                />
              </Link>
              <button onClick={() => setShowDeleteModal(true)}>
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
                  {ingredient.quantityAndUnit} {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {showDeleteModal && (
          <DeleteConfirmationModal
          
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            information={recipe.title}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
