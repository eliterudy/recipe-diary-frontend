import {createSlice} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';

const initialState = {
  recipeFilters: {},
  selectedFilters: {},
};
export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    updateRecipeFilters: (state, action) => {
      state.recipeFilters = action.payload;
    },
    updateSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateRecipeFilters, updateSelectedFilters} = recipeSlice.actions;
export default recipeSlice.reducer;
