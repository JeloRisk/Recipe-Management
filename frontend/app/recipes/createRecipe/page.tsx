/** @format */

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const AddRecipePage = () => {
  // set the all the possible state: title, ingredients
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantityAndUnit: "" }]);
  const router = useRouter();

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantityAndUnit: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const validIngredients = ingredients.filter((ingredient) => ingredient.name && ingredient.quantity > 0 && ingredient.unit);
    const validIngredients = ingredients;

    if (validIngredients.length === 0) {
      alert("Please provide at least one complete ingredient.");
      return;
    }

    const newRecipe = { title, ingredients: validIngredients };

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });
      if (res.ok) {
        router.push("/recipes");
      } else {
        alert("Failed to add the recipe.");
      }
    } catch {
      alert("Failed to add the recipe.");
    }
  };

  return (
    <div className='min-h-screen bg-pink-200 flex items-start  w-full   justify-center p-4'>
      <div className='flex items-start justify-center h-fit w-full mt-28 gap-10'>
        <div className='w-full max-w-3xl bg-white h-fit rounded-lg shadow-lg p-8'>
          <h1 className='text-3xl font-bold mb-6 text-primary sticky'>Add New Recipe</h1>

          <form onSubmit={handleSubmit}>
            <div className='mb-4 w-full'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='title'>
                Recipe Name:
              </label>
              <input
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-primary'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Ingredients:</label>
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className='flex space-x-2 mb-2 items-center'>
                  {/* <input
                    type='number'
                    placeholder='Quantity'
                    value={ingredient.quantity}
                    onChange={(e) => handleInputChange(index, "quantity", parseInt(e.target.value))}
                    className='border border-gray-300 rounded w-1/4 py-2 px-3 text-gray-700 focus:outline-none focus:border-primary'
                    required
                  /> */}

                  <input
                    type='text'
                    placeholder='Quantity and Unit (1/2 cup)'
                    value={ingredient.quantityAndUnit}
                    onChange={(e) => handleInputChange(index, "quantityAndUnit", e.target.value)}
                    className='border border-gray-300 rounded w-2/4 py-2 px-3 text-gray-700 focus:outline-none focus:border-primary'
                    required
                  />
                  <input
                    type='text'
                    placeholder='Name'
                    value={ingredient.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    className='border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-primary'
                    required
                  />

                  <button
                    type='button'
                    onClick={() => handleRemoveIngredient(index)}
                    className='text-red-500 font-bold'>
                    <Image
                      src='/icons/remove.svg'
                      alt='Remove'
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              ))}
              <button
                type='button'
                onClick={handleAddIngredient}
                className='text-primary font-bold mt-2'>
                + Add Ingredient
              </button>
            </div>

            <div className='text-right gap-10'>
              <Link
                href={"/recipes"}
                className='  py-2 px-4 rounded text-[#c0095e] hover:font-semibold  mr-2'>
                Cancel
              </Link>
              <button
                type='submit'
                className='bg-primary text-white py-2 px-4 rounded hover:bg-[#c0095e]'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipePage;
