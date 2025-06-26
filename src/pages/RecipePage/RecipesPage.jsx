import { IconSpinner } from "@/assets/icons/IconSpinner";
import { Input, Recipe, Button } from "@/components";
import { useRecipes, useSearchRecipes } from "@/services/recipe";
import { useState } from "react";

const RECIPES_PER_PAGE = 12;

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: recipesData,
    isLoading: isLoadingRecipes,
    error: recipesError,
  } = useRecipes({
    limit: RECIPES_PER_PAGE,
    skip: currentPage * RECIPES_PER_PAGE,
  });

  const {
    data: searchData,
    isLoading: isSearching,
    error: searchError,
  } = useSearchRecipes(searchQuery, {
    enabled: searchQuery.length > 2,
  });

  const isSearchMode = searchQuery.length > 2;
  const displayData = isSearchMode ? searchData : recipesData;
  const isLoading = isSearchMode ? isSearching : isLoadingRecipes;
  const error = isSearchMode ? searchError : recipesError;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  if (error) {
    return (
      <div className="mx-auto px-4 py-8 container">
        <div className="text-center">
          <h2 className="mb-4 font-bold text-red-600 text-2xl">
            Error Loading Recipes
          </h2>
          <p className="text-gray-600">
            {error.message || "Something went wrong while fetching recipes."}
          </p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8 container">
      <h1 className="mb-8 font-bold text-3xl text-center">
        Choose a recipe for your perfect meal
      </h1>

      <div className="mb-8 w-full">
        <Input
          placeholder="Pizza, pasta, hamburger..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full"
        />
        {isSearchMode && (
          <p className="mt-2 text-gray-600 text-sm">
            Searching for "{searchQuery}"...
          </p>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <span>
          <IconSpinner /> Loading...
        </span>
      )}

      {!isLoading && displayData?.recipes && (
        <>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
            {displayData.recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <Recipe {...recipe} />
              </div>
            ))}
          </div>

          <div className="mb-6 text-center">
            <p className="text-gray-600">
              {isSearchMode
                ? `Found ${displayData.total || displayData.recipes.length} recipes matching "${searchQuery}"`
                : `Showing ${displayData.recipes.length} of ${displayData.total || "many"} recipes`}
            </p>
          </div>

          {!isSearchMode && (
            <div className="flex justify-center items-center gap-4">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                Previous
              </Button>

              <span className="text-gray-600">Page {currentPage + 1}</span>

              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={displayData.recipes.length < RECIPES_PER_PAGE}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { RecipesPage };
