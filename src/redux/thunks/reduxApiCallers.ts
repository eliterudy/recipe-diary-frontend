import * as recipeThunk from './recipeThunk';
import * as userThunk from './userThunk';

// eslint-disable-next-line import/no-anonymous-default-export
const reduxApiCallers = {
  ...recipeThunk,
  ...userThunk,
};

export default reduxApiCallers;
