/** @format */
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteConfirmationModal from "../../components/modal/DeleteConfirmationModal";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  _id: string;
}

interface Recipe {
  _id: string;
  title: string;
  ingredients: Ingredient[];
}

async function getProductById(_id: string): Promise<Recipe | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/recipes/${_id}`, {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const RecipePage = async ({ params }: { params: { _id: string } }) => {
  const { _id } = await params;
  const recipe = await getProductById(_id);
  console.log(recipe);
  if (!recipe) {
    return <div className='text-center p-6'>Recipe not found.</div>;
  }

  return (
    <div className='fixed inset-0 shadow-sm  flex pt-20 justify-center z-10 overflow-auto items-start'>
      <div className='flex items-center space-x-2 pt-5 pr-5'>
        <Link href='/recipes'>
          <div className='flex items-center text-blue-600 hover:text-blue-800'>
            <Image
              src='/icons/back.svg'
              alt='Back to Recipes'
              width={24}
              height={24}
              className='mr-2'
            />
            Recipes
          </div>
        </Link>
      </div>
      {/* the modal part */}
      <div
        className='bg-white rounded-[32px] shadow-lg w-11/12 md:w-4/5 lg:w-5/5 max-h-[90vh] h-[80vh] overflow-hidden flex flex-col sm:flex-col lg:flex-row
      border-primary border-solid border-[1px]
      '>
        <div className='w-full lg:w-2/6 h-full bg-gradient-to-b bg-primary flex items-center justify-center relative'>
          <div className='absolute inset-0 h-full flex items-center justify-center'></div>
        </div>
        <div className='w-full lg:w-2/3 p-6 overflow-y-auto max-h-[70vh]'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold text-[#d70a6a]'>{recipe.title}</h2>

            {/* delete and edit button */}
            <div className='flex space-x-2'>
              {/* <button
              onClick={handleEdit}
              className='text-gray-600 hover:text-blue-500 transition duration-300 flex items-center'>
              <Image
                src='/icons/edit.svg'
                alt='Edit'
                width={24}
                height={24}
              />
            </button> */}
              <Link href={"/recipes/edit/" + recipe._id}>
                {" "}
                <Image
                  src='/icons/edit.svg'
                  alt='Edit'
                  width={24}
                  height={24}
                />
              </Link>
              <button
                // onClick={onDelete}
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
    // <RecipeModal
    //   title={recipe.title}
    //   ingridients={recipe.ingredients}
    // />
  );
};

export default RecipePage;
