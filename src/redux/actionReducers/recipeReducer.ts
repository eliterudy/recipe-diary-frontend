import {createSlice} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';

const initialState = {
  isLoading: true,
  errMess: null,
  recipes: [] as RecipeDetails[],
  featuredRecipes: [] as RecipeDetails[],
  isAddingRecipe: false,
  limit: 2,
  offset: 0,
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
    addingRecipeLoading: (state, action) => {
      state.errMess = null;
      state.isAddingRecipe = action.payload;
    },
    addRecipes: (state, action) => {
      state.errMess = null;
      state.isAddingRecipe = false;
      if (action.payload.offset) {
        state.offset = action.payload.offset;
      }
      if (action.payload.limit) {
        state.limit = action.payload.limit;
      }
      var arr = [];
      if (action.payload.category === 'featured') {
        arr = [...state.featuredRecipes, ...action.payload.results];
      } else {
        arr = [...state.recipes, ...action.payload.results];
      }

      let unique: any[] = [];

      for (let recipe of arr) {
        let check = unique.find(
          e => JSON.stringify(e) === JSON.stringify(recipe),
        );
        if (!check) {
          unique.push(recipe);
        }
      }
      state.recipes = [...unique] as RecipeDetails[];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  recipesLoading,
  recipesLoadingFailed,
  addRecipes,
  addingRecipeLoading,
} = recipeSlice.actions;
export default recipeSlice.reducer;
