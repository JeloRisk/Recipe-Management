/** @format */

// app/recipes/[id]/page.tsx
import React from "react";
import RecipeDetails from "../../components/RecipeDetails";

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

async function getRecipeById(_id: string): Promise<Recipe | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/recipes/${_id}`, { cache: "no-store" });
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const RecipePage = async ({ params }: { params: { _id: string } }) => {
  const { _id } = await params;
  const recipe = await getRecipeById(_id);

  if (!recipe) {
    return <div className='text-center p-6'>Recipe not found.</div>;
  }

  return <RecipeDetails recipe={recipe} />;
};

export default RecipePage;
