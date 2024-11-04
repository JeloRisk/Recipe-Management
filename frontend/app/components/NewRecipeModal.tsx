/** @format */
"use client";
import React, { useState } from "react";

/*

 title: {
      type: String,
      required: [true, "Please enter the recipe title"], 
    },
    description: {
      type: String,
      required: [true, "Please enter the recipe description"], 
    },
    ingredients: [
      {
        name: { type: String, required: [true, "Please enter the ingredient name"] },
        quantity: { type: Number, required: [true, "Please enter the ingredient quantity"] },
        unit: { type: String, required: [true, "Please specify the unit for the quantity"] },
      },
    ],
*/
interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  title: string;
  description: string;
  ingredients: Ingredient[];
}

interface NewRecipeModalProps {
  onClose: () => void;
  onSave: (newRecipe: Recipe) => void;
}

const NewRecipeModal: React.FC<NewRecipeModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", quantity: 0, unit: "" }]);

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
    const updatedIngredients = ingredients.map((ingredient, i) => (i === index ? { ...ingredient, [field]: value } : ingredient));
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe: Recipe = { title, description, ingredients };

    try {
      const res = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecipe),
      });

      if (res.ok) {
        const savedRecipe = await res.json();
        onSave(savedRecipe); // Pass the new recipe to the parent component
      } else {
        alert("Failed to create the recipe.");
      }
    } catch {
      alert("Failed to create the recipe.");
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 max-w-lg w-full'>
        <h2 className='text-2xl font-bold mb-4'>Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block font-semibold mb-1'>Title</label>
            <input
              type='text'
              className='w-full border rounded p-2'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block font-semibold mb-1'>Description</label>
            <textarea
              className='w-full border rounded p-2'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block font-semibold mb-1'>Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className='flex space-x-2 mb-2'>
                <input
                  type='text'
                  placeholder='Name'
                  className='w-1/2 border rounded p-2'
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                  required
                />
                <input
                  type='number'
                  placeholder='Quantity'
                  className='w-1/4 border rounded p-2'
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, "quantity", +e.target.value)}
                  required
                />
                <input
                  type='text'
                  placeholder='Unit'
                  className='w-1/4 border rounded p-2'
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                  required
                />
              </div>
            ))}
            <button
              type='button'
              onClick={addIngredient}
              className='mt-2 text-blue-500'>
              + Add Ingredient
            </button>
          </div>
          <div className='flex justify-end space-x-2 mt-4'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 px-4 py-2 rounded'>
              Cancel
            </button>
            <button
              type='submit'
              className='bg-[#d70a6a] text-white px-4 py-2 rounded'>
              Save Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRecipeModal;
