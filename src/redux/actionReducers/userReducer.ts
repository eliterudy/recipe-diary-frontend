import {createSlice} from '@reduxjs/toolkit';
import {RecipeDetails} from '../../config/types';
import {Favorites, User} from '../../config/types';

export interface initialStateUser {
  isLoadingUser: boolean;
  errMessUser: null | string;
  user: User | null;
}

const initialState: initialStateUser = {
  isLoadingUser: true,
  errMessUser: null,
  user: null,
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
    addRecipeToRecents: (state, action) => {
      if (
        state.user &&
        state.user.recents &&
        state.user.recents.recipes &&
        state.user.recents.recipes.includes(action.payload)
      ) {
        state.user.recents.recipes.splice(
          state.user.recents.recipes.indexOf(action.payload),
          1,
        );
      }
      state.user &&
        state.user.recents &&
        state.user.recents.recipes.push(action.payload);
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
    loadUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: state => {
      state.user = null;
    },
    verifyUser: (state, action) => {
      state.user && (state.user.isVerified = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  favoritesLoading,
  favoritesLoadingFailed,
  addRecipeToFavorites,
  addRecipeToRecents,
  deleteRecipeFromFavorites,
  loadUser,
  removeUser,
  verifyUser,
} = userSlice.actions;
export default userSlice.reducer;
