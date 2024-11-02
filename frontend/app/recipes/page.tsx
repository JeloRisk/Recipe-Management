/** @format */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../components/Card";

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

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/recipes", { cache: "no-store" });
        if (!res.ok) throw new Error("Network response was not ok");
        const data: Recipe[] = await res.json();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className='text-center mt-8 text-gray-500'>Loading...</p>;
  if (error) return <p className='text-center mt-8 text-red-500'>Error: {error}</p>;

  return (
    <div className='container mx-auto p-6 flex justify-center flex-col w-fit'>
      <div className='flex justify-between items-center mb-10'>
        <h1 className='text-4xl font-bold text-gray-800'>Your Recipes</h1>
        <button className='bg-[#d70a6a] text-white px-6 py-3 rounded-md hover:bg-[#941d55] transition duration-300'>Add New</button>
      </div>
      <div className='flex w-fit justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {recipes.map((recipe) => (
            <Link
              className='flex lg:w-72 md:w-72 sm:w-full justify-center'
              key={recipe._id}
              href={`/recipes/${recipe._id}`} // Use template string for dynamic path
            >
              <Card
                title={recipe.title}
                description={recipe.description}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
