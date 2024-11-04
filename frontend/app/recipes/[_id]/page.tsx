/** @format */
import RecipeModal from "@/app/components/RecipeModal";

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

async function getProductById(_id: string): Promise<Recipe | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/recipes/${_id}`, {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

const RecipePage = async ({ params }: { params: { _id: string } }) => {
  const { _id } = await params;
  const recipe = await getProductById(_id);
  console.log(recipe);
  if (!recipe) {
    return <div className='text-center p-6'>Recipe not found.</div>;
  }

  return (
    // <div className='container mx-auto p-6 flex justify-center flex-col w-fit'>
    //   <h1 className='text-4xl font-bold mb-4'>{recipe.title}</h1>
    //   <div>
    //     <h2 className='text-xl font-semibold mb-2'>Ingredients:</h2>
    //   </div>
    // </div>
    <RecipeModal
      title={recipe.title}
      ingridients={recipe.ingredients}
    />
  );
};

export default RecipePage;
