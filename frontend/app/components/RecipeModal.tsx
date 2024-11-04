/** @format */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

interface RecipeModalProps {
  _id: string;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ _id, isOpen, onClose }) => {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the recipe details
  useEffect(() => {
    if (!isOpen) return; // Only fetch data if modal is open

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
  }, [_id, isOpen]);

  // Handle delete function
  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${recipe?.title}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/api/recipes/${_id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onClose(); // Close modal after deletion
        router.push("/recipes"); // Redirect to the recipe list
      } else {
        alert("Failed to delete the recipe.");
      }
    } catch {
      alert("Failed to delete the recipe.");
    }
  };

  if (!isOpen) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className='modal-box'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-4xl font-bold text-[#d70a6a] mb-4'>{recipe?.title}</h1>
          <button
            onClick={onClose}
            className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </button>
        </div>
        <p className='text-gray-700 mb-6'>{recipe?.description}</p>

        <h2 className='text-2xl font-semibold mb-2'>Ingredients</h2>
        <ul className='list-disc ml-6 text-gray-600'>
          {recipe?.ingredients.map((ingredient) => (
            <li key={ingredient._id}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>

        <div className='modal-action mt-4'>
          <button
            onClick={() => router.push(`/recipes/edit/${_id}`)}
            className='px-4 py-2 bg-yellow-500 text-white rounded-md'>
            Edit
          </button>
          <button
            onClick={handleDelete}
            className='px-4 py-2 bg-red-500 text-white rounded-md ml-2'>
            Delete
          </button>
          <button
            onClick={onClose}
            className='btn'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
