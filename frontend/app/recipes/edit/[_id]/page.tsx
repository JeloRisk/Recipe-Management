/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const getRecipeById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch recipe");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw to handle it in the component
  }
};

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  _id: string;
  title: string;
  ingredients: Ingredient[];
}

export default function EditRecipe({ params }: { params: { _id: string } }) {
  const router = useRouter(); // Initialize useRouter
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [title, setTitle] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await getRecipeById(params._id);
        setRecipe(recipeData);
        setTitle(recipeData.title);
        setIngredients(recipeData.ingredients);
      } catch (err) {
        setError("Error fetching recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params._id]);

  if (loading) return <p className='text-center mt-8 text-gray-500'>Loading...</p>;
  if (error) return <p className='text-red-500 text-center mt-8'>Error: {error}</p>;
  if (!recipe) return null; // Ensure recipe is loaded before rendering

  const handleInputChange = (index: number, field: keyof Ingredient, value: string | number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedRecipe = { title, ingredients };
      const res = await fetch(`http://localhost:3000/api/recipes/${params._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!res.ok) {
        throw new Error("Failed to update recipe");
      }

      router.push(`/recipes`);
    } catch (error) {
      setError("Error updating recipe");
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Edit Recipe: {recipe.title}</h1>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded-lg p-6'>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='title'>
            Title:
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className='flex space-x-2 mb-2'>
              <input
                type='text'
                value={ingredient.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                placeholder='Name'
                className='border border-gray-300 rounded px-2 py-1'
                required
              />
              <input
                type='number'
                value={ingredient.quantity}
                onChange={(e) => handleInputChange(index, "quantity", Number(e.target.value))}
                placeholder='Quantity'
                className='border border-gray-300 rounded px-2 py-1'
                required
              />
              <input
                type='text'
                value={ingredient.unit}
                onChange={(e) => handleInputChange(index, "unit", e.target.value)}
                placeholder='Unit'
                className='border border-gray-300 rounded px-2 py-1'
                required
              />
            </div>
          ))}
        </div>

        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          Update Recipe
        </button>
      </form>
    </div>
  );
}
