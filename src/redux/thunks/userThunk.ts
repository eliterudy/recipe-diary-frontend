import {Dispatch} from 'redux';
import apis from '../../config/api';
import actionReducers from '../actionReducers/index';
const {recipesLoading, recipesLoadingFailed, addRecipes} = actionReducers;

const dispatchRecipesLoading = (val: boolean) => recipesLoading(val);
const dispatchRecipesFailed = (error: string) => recipesLoadingFailed(error);
const dispatchAddRecipes = (dishes: any) => addRecipes(dishes);

export const fetchUser = () => async (dispatch: Dispatch) => {
  dispatch(dispatchRecipesLoading(true));
};
