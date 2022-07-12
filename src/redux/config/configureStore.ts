import {configureStore, combineReducers} from '@reduxjs/toolkit';
// import {logger} from 'redux-logger';

import thunk from 'redux-thunk';
import recipeActionReducer from '../actionReducers/recipeReducer';
import userActionReducer from '../actionReducers/userReducer';

const middleware = [thunk, ];
const enhancers = [...middleware];
export const store = configureStore({
  reducer: combineReducers({
    recipeActionReducer,
    userActionReducer
  }),
  middleware: enhancers,
});
