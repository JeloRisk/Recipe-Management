/** @format */

import Card from "../components/Card";

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelectRecipe }) => (
  <div className='flex w-full justify-center'>
    <div
      className='grid gap-6 w-full max-w-screen-xl p-4'
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
      {recipes.map((recipe) => (
        <Card
          key={recipe._id}
          title={recipe.title}
          id={recipe._id}
          ingredients={recipe.ingredients}
          onClick={() => onSelectRecipe(recipe)}
        />
      ))}
    </div>
  </div>
);

export default RecipeList;
