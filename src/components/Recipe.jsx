import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecipe,
  removeRecipe,
  selectFavoriteRecipes,
} from "../store/FavoriteRecipesSlice";
import { selectIsAuthenticated } from "../store/AuthSlice";
import { Link } from "react-router";

const Recipe = ({ id, name, tags = [], image, rating, mealType }) => {
  const [showAllTags, setShowAllTags] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Check if recipe is already in favorites when component mounts
  useEffect(() => {
    if (favoriteRecipes.some((recipe) => recipe.id === id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [favoriteRecipes, id]);

  const toggleTags = (e) => {
    // Prevent the event from bubbling up to parent elements (like Links)
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setShowAllTags(!showAllTags);
  };

  const handleLikeClick = (e) => {
    // Prevent the event from bubbling up to parent elements (like Links)
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthenticated) {
      // Optionally show a message to login first
      alert("Please login to save favorite recipes");
      return;
    }

    if (isLiked) {
      dispatch(removeRecipe(id));
    } else {
      dispatch(
        addRecipe({
          id,
          name,
          image,
          tags,
          rating,
          mealType,
        })
      );
    }
  };

  // Default to empty array if tags is undefined
  const hasMoreTags = tags.length > 3;
  const visibleTags = showAllTags ? tags : tags.slice(0, 3);

  return (
    <div
      id={id}
      className="flex flex-col bg-orange-200 shadow-md p-4 rounded-lg h-full relative"
    >
      <div className="max-w-sm">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <button
            onClick={handleLikeClick}
            className="text-2xl transition-colors focus:outline-none"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Tags section with conditional rendering */}
        <div className="mb-3 flex flex-wrap">
          {visibleTags.map((tag, index) => (
            <span
              className="inline-block bg-orange-500 mr-2 mb-2 px-2 py-1 rounded-md text-white text-sm"
              key={index}
            >
              {tag}
            </span>
          ))}

          {/* Show "..." button if there are more than 3 tags */}
          {hasMoreTags && (
            <button
              onClick={toggleTags}
              className="inline-block hover:bg-orange-400 transition-all mr-1 mb-2 px-2 py-1 rounded-md text-gray-700 text-sm cursor-pointer whitespace-nowrap"
            >
              {showAllTags ? "Show less" : "..."}
            </button>
          )}
        </div>

        <img
          src={image}
          alt={name}
          className="rounded-lg w-full h-48 object-cover"
        />

        <div className="flex justify-between items-center mt-4 w-full">
          <div className="text-yellow-600">
            <span>⭐ {rating || 0}</span>
          </div>
          <Link to={`/recipes/${id}`}>See more</Link>
        </div>
      </div>
    </div>
  );
};

export { Recipe };
