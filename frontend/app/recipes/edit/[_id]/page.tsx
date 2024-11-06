/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const getRecipeById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch recipe");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface Ingredient {
  name: string;
  quantityAndUnit: string;
}

interface Recipe {
  _id: string;
  title: string;
  ingredients: Ingredient[];
}

export default function EditRecipe({ params }: { params: Promise<{ _id: string }> }) {
  const router = useRouter();

  /*
  states:
   - recipe
   - title
   - loading
   - error
  */
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [title, setTitle] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [unwrappedParams, setUnwrappedParams] = useState<{ _id: string } | null>(null);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (unwrappedParams) {
      const fetchRecipe = async () => {
        try {
          const recipeData = await getRecipeById(unwrappedParams._id);
          setRecipe(recipeData);
          setTitle(recipeData.title);
          setIngredients(recipeData.ingredients);
        } catch (err) {
          setError("Error fetching recipe");
        } finally {
          setLoading(false);
        }
      };

      fetchRecipe();
    }
  }, [unwrappedParams]);

  if (loading) return <p className='text-center mt-8 text-gray-500'>Loading...</p>;
  if (error) return <p className='text-red-500 text-center mt-8'>Error: {error}</p>;
  if (!recipe) return null;

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantityAndUnit: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];

    // to handle fields
    if (field === "name") {
      updatedIngredients[index][field] = value;
    } else if (field === "quantityAndUnit") {
      updatedIngredients[index][field] = value;
    }

    setIngredients(updatedIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //  filter out incomplete ingredients
    const validIngredients = ingredients.filter((ingredient) => ingredient.name && ingredient.quantityAndUnit);

    // if any ingredient has a quantity of 0.
    // if (ingredients.some((ingredient) => ingredient.quantity === 0)) {
    //   alert("You must not put 0 as quantity for any ingredient");
    //   return;
    // }

    if (validIngredients.length === 0) {
      alert("Please provide at least one complete ingredient.");
      return;
    }

    try {
      const updatedRecipe = { title, ingredients: validIngredients };

      // put in the database
      const res = await fetch(`http://localhost:3000/api/recipes/${unwrappedParams?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      // go back
      // router.push(`/recipes/${recipe._id}`);
      router.push(`/recipes/${recipe._id}`);
    } catch (error) {
      setError("Error updating recipe");
    }
  };

  const handleCancel = () => {
    router.back();
  };
  return (
    <div className='min-h-screen bg-pink-200 flex items-start w-full justify-center p-4'>
      <div className='flex items-start justify-center h-fit w-full mt-28 gap-10'>
        <div className='w-full max-w-3xl bg-white h-fit rounded-lg shadow-lg p-8'>
          <h1 className='text-3xl font-bold mb-6 text-[#d70a6a]'>Edit Recipe</h1>

          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='title'>
                Recipe Name:
              </label>
              <input
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-[#d70a6a]'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>Ingredients:</label>

              {/* map the ing */}
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className='flex space-x-2 mb-2 items-center'>
                  <input
                    type='text'
                    placeholder='Quantity and Unit (1/2 cup)'
                    value={ingredient.quantityAndUnit}
                    onChange={(e) => handleInputChange(index, "quantityAndUnit", e.target.value)}
                    className='border border-gray-300 rounded w-1/4 py-2 px-3 text-gray-700 focus:outline-none focus:border-[#d70a6a]'
                    required
                  />

                  <input
                    type='text'
                    placeholder='Name'
                    value={ingredient.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    className='border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:border-[#d70a6a]'
                    required
                  />

                  <button
                    type='button'
                    onClick={() => handleRemoveIngredient(index)}
                    className='text-red-500 font-bold'>
                    <Image
                      src='/icons/remove.svg'
                      alt='Remove'
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              ))}

              <button
                type='button'
                onClick={handleAddIngredient}
                className='text-[#d70a6a] font-bold mt-2'>
                + Add Ingredient
              </button>
            </div>

            <div className='text-right gap-10'>
              <button
                onClick={handleCancel}
                className='py-2 px-4 rounded text-[#c0095e] hover:font-semibold mr-2'>
                Cancel
              </button>
              <button
                type='submit'
                className='bg-[#d70a6a] text-white py-2 px-4 rounded hover:bg-[#c0095e]'>
                Update Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
