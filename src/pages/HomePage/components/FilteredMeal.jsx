import { useState } from "react";
import { Select } from "@/components/ui";
import { Recipe } from "@/components";
import { MEAL_TYPES } from "@/constants";
import { useRecipesByMealType } from "@/services/recipe";

const FilteredMeal = () => {
  const [selectedMealType, setSelectedMealType] = useState("");
  const { data, isLoading, error } = useRecipesByMealType(selectedMealType, {
    enabled: !!selectedMealType // Only fetch when a meal type is selected
  });

  const handleMealTypeChange = (e) => {
    setSelectedMealType(e.target.value);
  };

  return (
    <section className="my-12 container mx-auto px-4">
      <h2 className="my-8 font-bold text-2xl text-center">
        Pick a recipe for your meal type
      </h2>
      
      <div className="max-w-md mx-auto mb-8">
        <Select 
          options={MEAL_TYPES.map(type => ({ value: type, label: type }))}
          value={selectedMealType}
          onChange={handleMealTypeChange}
          placeholder="Select a meal type"
        />
      </div>

      {/* Results Section */}
      <div className="mt-8">
        {selectedMealType ? (
          <>
            <h3 className="text-xl font-semibold mb-6">
              {selectedMealType} Recipes
            </h3>
            
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            )}
            
            {error && (
              <div className="text-red-500 text-center">
                Failed to load recipes. Please try again.
              </div>
            )}
            
            {!isLoading && !error && data?.recipes?.length === 0 && (
              <div className="text-center text-gray-500">
                No recipes found for {selectedMealType}.
              </div>
            )}
            
            {!isLoading && !error && data?.recipes?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.recipes.map(recipe => (
                  <Recipe key={recipe.id} {...recipe} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 my-12">
            Select a meal type to see matching recipes
          </div>
        )}
      </div>
    </section>
  );
};

export { FilteredMeal };