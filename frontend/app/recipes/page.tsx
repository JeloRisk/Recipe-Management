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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recipesPerPage = 12;

  const fetchRecipes = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/recipes?page=${page}&limit=${recipesPerPage}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to fetch recipes.");

      const data = await response.json();
      setRecipes(data.recipes);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

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

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className='flex flex-col w-full px-4 sm:px-6 md:px-20 pt-10'>
      <div className='w-full max-w-screen-lg mx-auto'>
        <RecipeHeader />

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

        {/* Pagination Controls */}
        <div className='flex justify-center mt-8'>
          <div className='btn-group'>
            <button
              className='btn btn-outline'
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}>
              <div className='w-4 h-4 mr-2' /> Previous
            </button>
            <span className='btn btn-outline'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className='btn btn-outline'
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}>
              Next <div className='w-4 h-4 ml-2' />
            </button>
          </div>
        </div>
      </div>

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
