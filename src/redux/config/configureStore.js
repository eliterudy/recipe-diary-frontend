import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {logger} from 'redux-logger';

import thunk from 'redux-thunk';
import recipeActionReducer from '../actionReducers/recipeReducer';

const middleware = [thunk];
const enhancers = [...middleware];
export const store = configureStore({
  reducer: combineReducers({
    recipeActionReducer,
  }),
  middleware: enhancers,
});
