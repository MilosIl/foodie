import { axiosInstance } from "@/api/axiosInstance";

const getAllRecipes = async (limit = 10, skip = 0) => {
  try {
    const response = await axiosInstance.get(
      `recipes?limit=${limit}&skip=${skip}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all recipes:", error);
    throw error;
  }
};

const getOneRecipe = async (id) => {
  try {
    const response = await axiosInstance.get(`recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe with ID ${id}:`, error);
    throw error;
  }
};

const searchRecipes = async (query) => {
  try {
    const response = await axiosInstance.get(`recipes/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching recipes with query "${query}":`, error);
    throw error;
  }
};

const getRecipesByMealType = async (mealType) => {
  try {
    const response = await axiosInstance.get(`recipes/meal-type/${mealType}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipes for meal type "${mealType}":`, error);
    throw error;
  }
};
const addRecipe = async (recipeData) => {
  try {
    const response = await axiosInstance.post("recipes/add", recipeData);
    return response.data;
  } catch (error) {
    console.error("Error adding new recipe:", error);
    throw error;
  }
}



export {
  addRecipe,
  getAllRecipes,
  getOneRecipe,
  searchRecipes,
  getRecipesByMealType,
};
