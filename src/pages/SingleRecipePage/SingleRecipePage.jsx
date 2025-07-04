import { useParams, Link, useNavigate } from "react-router";
import { useRecipe } from "@/services/recipe";
import { IconSpinner } from "@/assets/icons/IconSpinner";
import { Button } from "@/components/ui";
import { List } from "@/components/List";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecipe as addFavoriteRecipe,
  removeRecipe as removeFavoriteRecipe,
  selectFavoriteRecipes,
} from "@/store/FavoriteRecipesSlice";
import { selectIsAuthenticated } from "@/store/AuthSlice";
import { useState, useEffect } from "react";

const SingleRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isLiked, setIsLiked] = useState(false);

  const { data: recipe, isLoading, error } = useRecipe(id);

  // Check if recipe is already in favorites
  useEffect(() => {
    if (favoriteRecipes.some((r) => r.id === Number(id))) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [favoriteRecipes, id]);

  const handleLikeClick = () => {
    if (!isAuthenticated) {
      // Optionally show a message to login first
      alert("Please login to save favorite recipes");
      navigate("/login");
      return;
    }

    if (isLiked) {
      dispatch(removeFavoriteRecipe(Number(id)));
    } else {
      dispatch(
        addFavoriteRecipe({
          id: Number(id),
          name: recipe.name,
          image: recipe.image,
          tags: recipe.tags,
          rating: recipe.rating,
          mealType: recipe.mealType,
        })
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="flex items-center gap-2 text-gray-600">
          <IconSpinner /> Loading recipe...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Error Loading Recipe
        </h2>
        <p className="text-gray-700 mb-6">
          {error.message || "Failed to load recipe details"}
        </p>
        <Button onClick={() => navigate("/recipes")} variant="primary">
          Back to Recipes
        </Button>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recipe Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The recipe you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/recipes")} variant="primary">
          Browse Recipes
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Link
          to="/recipes"
          className="text-orange-500 hover:text-orange-700 flex items-center gap-1"
        >
          ← Back to Recipes
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Recipe Header */}
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
              <button
                onClick={handleLikeClick}
                className="text-3xl transition-colors focus:outline-none"
                aria-label={
                  isLiked ? "Remove from favorites" : "Add to favorites"
                }
              >
                {isLiked ? "❤️" : "🤍"}
              </button>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400">⭐ {recipe.rating || 0}</span>
              <span className="text-sm">
                ({recipe.reviewCount || 0} reviews)
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {recipe.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-orange-500/90 text-white text-sm py-1 px-2 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recipe Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h3 className="font-medium text-orange-800 mb-1">Prep Time</h3>
              <p className="text-gray-700">{recipe.prepTimeMinutes} minutes</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h3 className="font-medium text-orange-800 mb-1">Cook Time</h3>
              <p className="text-gray-700">{recipe.cookTimeMinutes} minutes</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <h3 className="font-medium text-orange-800 mb-1">Servings</h3>
              <p className="text-gray-700">{recipe.servings} servings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <List label="Ingredients" listItems={recipe.ingredients} />
            </div>
            <div>
              <List label="Instructions" listItems={recipe.instructions} />
            </div>
          </div>

          <div className="bg-orange-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-orange-800 mb-4">
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2">
                  <span className="font-medium">Cuisine:</span> {recipe.cuisine}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Meal Type:</span>{" "}
                  {recipe.mealType}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-medium">Calories:</span>{" "}
                  {recipe.caloriesPerServing} per serving
                </p>
                <p className="mb-2">
                  <span className="font-medium">Difficulty:</span>{" "}
                  {getDifficulty(
                    recipe.prepTimeMinutes,
                    recipe.cookTimeMinutes
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine recipe difficulty
function getDifficulty(prepTime, cookTime) {
  const totalTime = prepTime + cookTime;
  if (totalTime < 30) return "Easy";
  if (totalTime < 60) return "Medium";
  return "Hard";
}

export default SingleRecipePage;
