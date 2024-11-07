/** @format */

/*
  Description     To render 
  component used:
  recipe modal
  delete confirmation
*/
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import RecipeModal from "../components/RecipeModal";
import DeleteConfirmationModal from "../components/modal/DeleteConfirmationModal";

interface Ingredient {
  name: string;
  quantityAndUnit: string;
  _id: string;
}

interface Recipe {
  _id: string;
  title: string;
  createdAt: string;
  ingredients: Ingredient[];
}

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isRecipeModalOpen, setRecipeModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/recipes", { cache: "no-store" });
        if (!res.ok) throw new Error("Network response was not ok");
        const data: Recipe[] = await res.json();

        // Sort
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setRecipeModalOpen(true);
  };

  const closeRecipeModal = () => {
    setRecipeModalOpen(false);
    // setSelectedRecipe(null);
  };

  const openDeleteModal = (recipeId: string) => {
    setRecipeModalOpen(false);
    setRecipeToDelete(recipeId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setRecipeToDelete(null);
    openRecipeModal(selectedRecipe);
    setSelectedRecipe(selectedRecipe);
  };

  const handleDeleteRecipe = async () => {
    if (!recipeToDelete) return;

    try {
      const res = await fetch(`/api/recipes/delete/${recipeToDelete}`, {
        method: "DELETE",
      });

      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeToDelete));

      closeDeleteModal();
      setRecipeToDelete(null);
      setRecipeModalOpen(false);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // if the data is still being fetched, display a loading indicator. Do it with the error
  // if (loading) {
  //   return <p className='text-center mt-8 text-gray-500'>Loading...</p>;
  // }

  if (error) {
    return <p className='text-center mt-8 text-red-500'>Error: {error}</p>;
  }

  return (
    <div className={`container mx-auto p-6 flex   flex-col ${recipes.length === 0 ? "w-full" : "w-full"}`}>
      <div className={`container mx-auto p-6 flex flex-col ${recipes.length === 0 ? "w-full" : "w-fit"}`}>
        <div className='w-full flex justify-between items-center mb-10'>
          <h1 className='text-4xl font-bold text-gray-800'>Your Recipes</h1>
          <Link href='/recipes/createRecipe'>
            <button className='bg-[#d70a6a] text-white px-6 py-3 rounded-md hover:bg-[#941d55] transition duration-300'>Add New</button>
          </Link>
        </div>

        {/* check if there is no recipe  */}
        {loading ? (
          <div className='flex justify-center mt-10'>
            <span className='loading loading-dots loading-lg'></span>
          </div>
        ) : (
          <>
            {recipes.length === 0 ? (
              <div className='text-center text-gray-600 mt-10'>
                <p>No recipes found. Start adding some recipes!</p>
              </div>
            ) : (
              <div className='flex w-full justify-center'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                  {recipes.map((recipe) => (
                    <Card
                      key={recipe._id}
                      title={recipe.title}
                      id={recipe._id}
                      ingredients={recipe.ingredients}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onClose={closeDeleteModal}
          onConfirm={handleDeleteRecipe}
          information={selectedRecipe.title}
        />
      )}

      {isRecipeModalOpen && selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={closeRecipeModal}
          onDelete={() => openDeleteModal(selectedRecipe._id)}
        />
      )}
    </div>
  );
};

export default RecipesPage;
