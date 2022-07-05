import {createSlice} from '@reduxjs/toolkit';
import {RecipeCardData} from '../../types';

const recipes : RecipeCardData[] = [];

const initialState = {
  isLoading: true,
  errMess: null,
  recipes: recipes,
};
export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    recipesLoading: (state, action) => {
      state.errMess = null;
      state.isLoading = true;
    },
    recipesLoadingFailed: (state, action) => {
      state.errMess = action.payload;
      state.isLoading = false;
    },
    addRecipes: (state, action) => {
      state.errMess = null;
      state.isLoading = false;
      state.recipes = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {recipesLoading, recipesLoadingFailed, addRecipes} = recipeSlice.actions;
export default recipeSlice.reducer;
