import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { selectIsAuthenticated } from "@/store/AuthSlice";
import { selectFavoriteRecipes } from "@/store/FavoriteRecipesSlice";
import { Recipe } from "@/components/Recipe";
import { Button } from "@/components/ui";
import { useEffect } from "react";

const FavoritesPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const favorites = useSelector(selectFavoriteRecipes);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Will redirect, no need to render anything
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl mb-4">
            You don't have any favorite recipes yet.
          </h2>
          <p className="mb-6">
            Start exploring recipes and save your favorites!
          </p>
          <Button
            onClick={() => navigate("/recipes")}
            variant="primary"
            label="Browse Recipes"
          >
            Browse Recipes
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipes/${recipe.id}`}
              className="block h-full"
            >
              <Recipe {...recipe} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
