/** @format */
"use client";
import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const getRecipeById = async (_id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/recipes/${_id}`, {
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

export default function EditTopic({ params }: { params: Promise<{ _id: string }> }) {
  const router = useRouter(); // Initialize useRouter
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Unwrap params using React.use()
  const { _id } = use(params);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!_id) return; // Check if _id is valid
      try {
        const recipeData = await getRecipeById(_id);
        setRecipe(recipeData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [_id]);

  if (loading) return <p className='text-center mt-8 text-gray-500'>Loading...</p>;
  if (error) return <p className='text-red-500 text-center mt-8'>Error: {error}</p>;

  // Ensure recipe is not null before accessing its properties
  if (!recipe) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/recipes/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe), // Use the current state of the recipe
      });

      if (!res.ok) {
        throw new Error("Failed to update recipe");
      }

      // Optionally redirect or show success message
      router.push(`/recipes/${_id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    router.push(`/recipes/${_id}`); // Redirect to the recipe detail page
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
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='description'>
            Description:
          </label>
          <textarea
            id='description'
            value={recipe.description}
            onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            rows={5}
          />
        </div>
        {/* Include other fields for ingredients, etc., as needed */}
        <div className='flex justify-between mt-6'>
          <button
            type='submit'
            className='bg-[#d70a6a] text-white font-bold py-2 px-4 rounded hover:bg-[#941d55] transition duration-300'>
            Save Changes
          </button>
          <button
            type='button'
            onClick={handleCancel}
            className='bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400 transition duration-300'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
