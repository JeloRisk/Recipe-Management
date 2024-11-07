/** @format */
"use client";
import React, { useEffect, useState } from "react";

import RecipeModal from "../components/RecipeModal";
import DeleteConfirmationModal from "../components/modal/DeleteConfirmationModal";
import ErrorMessage from "../components/ErrorMessage";
import LoadingIndicator from "../components/LoadingIndicator";
import RecipeHeader from "../components/RecipeHeader";
import RecipeList from "../components/RecipeList";

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

  // Fetch recipes on initial render
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch recipes.");

        const fetchedRecipes: Recipe[] = await response.json();
        // Sort recipes by creation date, newest first
        fetchedRecipes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setRecipes(fetchedRecipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Open/close modal handlers
  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setRecipeModalOpen(true);
  };

  const closeRecipeModal = () => setRecipeModalOpen(false);

  const openDeleteModal = (recipeId: string) => {
    setRecipeModalOpen(false);
    setRecipeToDelete(recipeId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setRecipeToDelete(null);
  };

  const handleDeleteRecipe = async () => {
    if (!recipeToDelete) return;

    try {
      await fetch(`/api/recipes/delete/${recipeToDelete}`, { method: "DELETE" });
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeToDelete));
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className='flex flex-col w-full p-4 sm:p-6 lg:p-10'>
      <div className='w-full max-w-screen-lg mx-auto'>
        <RecipeHeader />

        {/* Conditional Rendering for Loading, No Recipes, or Recipe List */}
        {loading ? (
          <LoadingIndicator />
        ) : recipes.length === 0 ? (
          <div className='text-center text-gray-600 mt-10'>
            <p>No recipes found. Start adding some recipes!</p>
          </div>
        ) : (
          <RecipeList
            recipes={recipes}
            onSelectRecipe={openRecipeModal}
          />
        )}
      </div>

      {/* Modals */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onClose={closeDeleteModal}
          onConfirm={handleDeleteRecipe}
          information={selectedRecipe?.title || ""}
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
