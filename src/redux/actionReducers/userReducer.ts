import {createSlice} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';
import {Favorites, User} from '../../config/types';

export interface initialStateUser {
  isLoadingUser: boolean;
  errMessUser: null | string;
  user: any | null;
}

const initialState: initialStateUser = {
  isLoadingUser: true,
  errMessUser: null,
  // user: null,
  user: {
    _id: 1,
    username: "",
    password: "",
    favorites: {
      recipes: []
    } as Favorites,
  },
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    favoritesLoading: (state, action) => {
      state.errMessUser = null;
      state.isLoadingUser = true;
    },
    favoritesLoadingFailed: (state, action) => {
      state.errMessUser = action.payload;
      state.isLoadingUser = false;
    },
    addRecipeToFavorites: (state, action) => {
      state.errMessUser = null;
      state.isLoadingUser = false;
      state.user &&
        state.user.favorites &&
        state.user.favorites.recipes.push(action.payload);
    },
    deleteRecipeFromFavorites: (state, action) => {
      state.errMessUser = null;
      state.isLoadingUser = false;
      state.user &&
        state.user.favorites &&
        state.user.favorites.recipes.splice(
          state.user.favorites.recipes.indexOf(action.payload),
          1,
        );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  favoritesLoading,
  favoritesLoadingFailed,
  addRecipeToFavorites,
  deleteRecipeFromFavorites,
} = userSlice.actions;
export default userSlice.reducer;
