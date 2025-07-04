
import {
  AddNewRecipe,
  FilteredMeal,
  HeroSection,
  RecipeOfADay,
} from "./components";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <RecipeOfADay />
      <FilteredMeal />
      <AddNewRecipe />
    </>
  );
};

export { HomePage };
