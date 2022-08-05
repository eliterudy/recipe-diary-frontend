import * as recipeActionReducer from './recipeReducer';
import * as userActionReducer from './userReducer';
import * as rootActionReducer from './rootReducer';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...recipeActionReducer,
  ...userActionReducer,
  ...rootActionReducer,
};
