/** @format */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card"; // Ensure this path is correct

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
      <h1 className='text-4xl font-bold text-gray-800 mb-10'>Your Recipes</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {recipes.map((recipe) => (
          <Link
            key={recipe._id}
            href={`/recipes/${recipe._id}`}>
            <Card title={recipe.title} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;
