import {configureStore, combineReducers} from '@reduxjs/toolkit';
// import {logger} from 'redux-logger';

import thunk from 'redux-thunk';
import recipeActionReducer from '../actionReducers/recipeReducer';
import userActionReducer from '../actionReducers/userReducer';
import rootActionReducer from '../actionReducers/rootReducer';

const middleware = [thunk];
const enhancers = [...middleware];
export const store = configureStore({
  reducer: combineReducers({
    rootActionReducer,
    recipeActionReducer,
    userActionReducer,
  }),
  middleware: enhancers,
});
