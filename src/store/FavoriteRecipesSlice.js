import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./AuthSlice"; // Import logout action

// Helper function to load favorites from localStorage
const loadFavoritesFromStorage = () => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return [];

    const user = JSON.parse(storedUser);
    const userId = user.id;

    const favoritesKey = `favorites-${userId}`;
    const favorites = localStorage.getItem(favoritesKey);

    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error loading favorites from storage:", error);
    return [];
  }
};

// Helper function to save favorites to localStorage
const saveFavoritesToStorage = (recipes) => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    const userId = user.id;

    const favoritesKey = `favorites-${userId}`;
    localStorage.setItem(favoritesKey, JSON.stringify(recipes));
  } catch (error) {
    console.error("Error saving favorites to storage:", error);
  }
};

export const favoriteRecipesSlice = createSlice({
  name: "favoriteRecipes",
  initialState: {
    recipes: loadFavoritesFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    addRecipe: (state, action) => {
      const recipe = action.payload;
      if (!state.recipes.some((r) => r.id === recipe.id)) {
        state.recipes.push(recipe);
        saveFavoritesToStorage(state.recipes);
      }
    },
    removeRecipe: (state, action) => {
      const recipeId = action.payload;
      state.recipes = state.recipes.filter((recipe) => recipe.id !== recipeId);
      saveFavoritesToStorage(state.recipes);
    },
    clearRecipes: (state) => {
      state.recipes = [];
      saveFavoritesToStorage([]);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.recipes = [];
    });
  },
});

export const { addRecipe, removeRecipe, clearRecipes, setLoading, setError } =
  favoriteRecipesSlice.actions;

export const selectFavoriteRecipes = (state) => state.favoriteRecipes.recipes;
export const selectFavoriteRecipesLoading = (state) =>
  state.favoriteRecipes.loading;
export const selectFavoriteRecipesError = (state) =>
  state.favoriteRecipes.error;
export const favoriteRecipesReducer = favoriteRecipesSlice.reducer;
