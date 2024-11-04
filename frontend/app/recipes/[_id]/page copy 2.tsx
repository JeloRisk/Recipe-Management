/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' instead of 'next/router'

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  _id: string;
  title: string;
  createdAt: string;
  ingredients: Ingredient[];
}

const RecipeDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        try {
          const res = await fetch(`http://localhost:3000/api/recipes/${id}`);
          if (!res.ok) throw new Error("Network response was not ok");
          const data: Recipe = await res.json();
          setRecipe(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className='text-center mt-8 text-gray-500'>Loading...</p>;
  if (error) return <p className='text-center mt-8 text-red-500'>Error: {error}</p>;
  if (!recipe) return <p className='text-center mt-8 text-gray-500'>Recipe not found</p>;

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-4xl font-bold mb-4'>{recipe.title}</h1>
      <h2 className='text-2xl mb-2'>Ingredients:</h2>
      <ul className='list-disc pl-5'>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>
      <button
        onClick={() => router.push("/recipes")}
        className='mt-4 bg-[#d70a6a] text-white px-4 py-2 rounded hover:bg-[#941d55] transition duration-300'>
        Back to Recipes
      </button>
    </div>
  );
};

export default RecipeDetailPage;
