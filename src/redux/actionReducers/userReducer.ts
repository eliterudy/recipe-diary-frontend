import {createSlice} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';
import {Favorites} from '../../config/types'



const initialState = {
  isLoadingUserFavorites: true,
  errMessUserFavorites: null,
  favorites: {
    recipes: []
  } as Favorites,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    favoritesLoading: (state, action) => {
      state.errMessUserFavorites = null;
      state.isLoadingUserFavorites = true;
    },
    favoritesLoadingFailed: (state, action) => {
      state.errMessUserFavorites = action.payload;
      state.isLoadingUserFavorites = false;
    },
    addRecipeToFavorites: (state, action) => {
      state.errMessUserFavorites = null;
      state.isLoadingUserFavorites = false;
      state.favorites.recipes.push( action.payload)
    },
    deleteRecipeFromFavorites: (state, action) => {
      state.errMessUserFavorites = null;
      state.isLoadingUserFavorites = false;
      state.favorites.recipes.splice(state.favorites.recipes.indexOf(action.payload),1)
    },
  },
});

// Action creators are generated for each case reducer function
export const {favoritesLoading, favoritesLoadingFailed, addRecipeToFavorites, deleteRecipeFromFavorites} = userSlice.actions;
export default userSlice.reducer;
