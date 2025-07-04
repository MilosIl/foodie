import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import { favoriteRecipesReducer } from "./FavoriteRecipesSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    favoriteRecipes: favoriteRecipesReducer, // Assuming you have a favoriteRecipesReducer defined
  },
});
