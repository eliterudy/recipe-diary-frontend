import {Dispatch} from 'redux';
import apis from '../../config/api';
import actionReducers from '../actionReducers/index';
import {RecipeDetails} from '../../config/types';

const {recipesLoading, recipesLoadingFailed, addRecipes} = actionReducers;

const dispatchRecipesLoading = (val: boolean) => recipesLoading(val);
const dispatchRecipesFailed = (error: string) => recipesLoadingFailed(error);
const dispatchAddRecipes = (payload: any) => addRecipes(payload);

export const fetchAllRecipes = (params: any) => async (dispatch: Dispatch) => {
  dispatch(dispatchRecipesLoading(true));
  apis
    .getAllRecipes(params)
    .then(({data}) => {
      dispatch(dispatchAddRecipes({...data}));
    })
    .catch((error: any) => {
      dispatch(dispatchRecipesFailed(error.code + ': ' + error.message));
    });
};
