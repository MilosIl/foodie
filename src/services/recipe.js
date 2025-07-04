import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllRecipes,
  getOneRecipe,
  searchRecipes,
  getRecipesByMealType,
  addRecipe,
} from "@/api/recipes";

export const recipeKeys = {
  all: ["recipes"],
  lists: () => [...recipeKeys.all, "list"],
  list: (filters) => [...recipeKeys.lists(), { filters }],
  detail: (id) => [...recipeKeys.all, "detail", id],
  search: (query) => [...recipeKeys.all, "search", query],
  mealType: (mealType) => [...recipeKeys.all, "mealType", mealType],
};

export const useRecipes = (options = {}) => {
  const { limit = 10, skip = 0 } = options;

  return useQuery({
    queryKey: recipeKeys.list({ limit, skip }),
    queryFn: () => getAllRecipes(limit, skip),
  });
};

export const useRecipe = (id) => {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => getOneRecipe(id),
  });
};

export const useSearchRecipes = (query) => {
  return useQuery({
    queryKey: recipeKeys.search(query),
    queryFn: () => searchRecipes(query),
  });
};

export const useRecipesByMealType = (mealType) => {
  return useQuery({
    queryKey: recipeKeys.mealType(mealType),
    queryFn: () => getRecipesByMealType(mealType),
  });
};

export const useCreateRecipe = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newRecipe) => {
      addRecipe(newRecipe);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() });

      // Add the new recipe to the cache
      queryClient.setQueryData(recipeKeys.detail(data.id), data);

      // Call custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      console.error("Error creating recipe:", error);
      if (options.onError) {
        options.onError(error);
      }
    },
  });
};

export const useRecipeOfTheDay = () => {

  const today = new Date().toDateString();

  const recipeId = Math.max(Math.floor(Math.random() * 50) + 1);
  return useQuery({
    queryKey: [...recipeKeys.all, "recipeOfTheDay", today],
    queryFn: () => getOneRecipe(recipeId),
    staleTime: 1000 * 60 * 60 * 24, // Cache for 24 hours
  });
};
