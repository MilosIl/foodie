import { Recipe } from "@/components";
import { useRecipeOfTheDay } from "@/services/recipe";

const RecipeOfADay = () => {
  const { data: recipeOfTheDay, isLoading } = useRecipeOfTheDay();
  console.log(recipeOfTheDay);
  return (
    <section className="mx-auto">
      <h2 className="my-8 font-bold text-2xl text-center">
        Recipe of a day for {new Date().toLocaleDateString("en-GB")}
      </h2>
      {/* Recipe of the day */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <IconSpinner /> Loading recipe...
        </div>
      ) : recipeOfTheDay ? (
        <div className="flex justify-center items-center">
          <Recipe {...recipeOfTheDay} />
        </div>
      ) : (
        <div className="mx-auto p-6 max-w-md text-center">
          <p className="text-gray-600">No recipe available today</p>
        </div>
      )}
    </section>
  );
};

export { RecipeOfADay };
