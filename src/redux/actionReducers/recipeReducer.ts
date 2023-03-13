import {createSlice} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';

const initialState = {
  recipeFilters: {},
  selectedFilters: {},
};
export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = recipeSlice.actions;
export default recipeSlice.reducer;
