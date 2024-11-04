/** @format */
"use client";
import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  params: {
    _id: string;
  };
};

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

export default function RecipeDetailPage({ params }: { params: Promise<{ _id: string }> }) {
  const { _id } = use(params);
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the recipe details
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/recipes/${_id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Recipe not found");

        const data: Recipe = await res.json();
        setRecipe(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [_id]);

  // Handle delete function
  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${recipe?.title}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/api/recipes/${_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/recipes"); // Redirect to the recipe list after deletion
      } else {
        alert("Failed to delete the recipe.");
      }
    } catch {
      alert("Failed to delete the recipe.");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/recipes"
          className="text-blue-500 hover:underline text-lg font-medium"
        >
          &larr; Back to Recipes
        </Link>
        <div className="flex space-x-4">
          <Link
            href={`/recipes/edit/${_id}`}
            className="btn btn-warning text-white"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-error text-white"
          >
            Delete
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-[#d70a6a] mb-4">{recipe?.title}</h1>
      <p className="text-gray-700 text-lg mb-6">{recipe?.description}</p>

      <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
      <ul className="list-none space-y-4">
        {recipe?.ingredients.map((ingredient) => (
          <li
            key={ingredient._id}
            className="p-4 bg-gray-100 rounded-md shadow-md flex items-center justify-between"
          >
            <span className="text-gray-800 font-medium">
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
