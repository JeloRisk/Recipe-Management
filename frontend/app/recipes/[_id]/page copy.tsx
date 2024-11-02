/** @format */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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

const RecipeDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await React.use(params); // Use `React.use()` to unwrap `params`

  const router = useRouter();

  // Fetch the recipe details by id
  const res = await fetch(`http://localhost:3000/api/recipes/${id}`, { cache: "no-store" });
  if (!res.ok) {
    return <p className='text-center mt-8 text-red-500'>Recipe not found.</p>;
  }

  const recipe: Recipe = await res.json();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${recipe.title}?`)) {
      const deleteRes = await fetch(`http://localhost:3000/api/recipes/${id}`, {
        method: "DELETE",
      });
      if (deleteRes.ok) {
        window.location.href = "/recipes"; // Redirect after deletion
      } else {
        alert("Failed to delete the recipe.");
      }
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='flex justify-between items-center mb-6'>
        <Link
          href='/recipes'
          className='text-blue-500 hover:underline'>
          &larr; Back to Recipes
        </Link>
        <div className='flex space-x-4'>
          <Link
            href={`/recipes/edit/${id}`}
            className='btn btn-warning'>
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className='btn btn-danger'>
            Delete
          </button>
        </div>
      </div>

      <h1 className='text-4xl font-bold mb-4 text-[#d70a6a]'>{recipe.title}</h1>
      <p className='text-gray-700 mb-6'>{recipe.description}</p>

      <h2 className='text-2xl font-semibold mb-2'>Ingredients</h2>
      <ul className='list-disc ml-6 text-gray-600'>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetailPage;
