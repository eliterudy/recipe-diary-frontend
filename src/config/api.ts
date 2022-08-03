import axios from 'axios';
export const baseURL = 'https://localhost:3443';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  // Origin: baseURL,
};

const ApiCaller = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: headers,
});
ApiCaller.interceptors.request.use(async function (config: any) {
  let token = await localStorage.getItem('token');
  config.headers.Authorization = token ? `bearer ${token}` : '';
  return config;
});

const recipeApiList = {
  getAllRecipes: (params: any) => {
    return ApiCaller({
      url: `/recipes`,
      method: 'get',
      params,
    });
  },
  getRecipe: (recipeId: string) => {
    return ApiCaller({
      url: `/recipes/id/${recipeId}`,
      method: 'get',
    });
  },

  // postRecipe: (payload: any) => {
  //   return ApiCaller({
  //     url: `/users/verifyUser`,
  //     method: 'post',
  //     // data: payload,
  //   });
  // },

  getRecipeFilters: () => {
    return ApiCaller({
      url: `/recipes/filters`,
      method: 'get',
    });
  },

  postRecipeImage: (data: any, params: any) => {
    return ApiCaller({
      url: `/uploads/recipe`,
      method: 'post',
      data,
      params,
    });
  },

  postRecipe: (data: any) => {
    return ApiCaller({
      url: `/recipes`,
      method: 'post',
      data,
    });
  },
};

const userApiList = {
  login: (payload: any) => {
    return ApiCaller({
      url: `/users/login`,
      method: 'post',
      data: payload,
    });
  },

  signup: (payload: any) => {
    return ApiCaller({
      url: `/users/signup`,
      method: 'post',
      data: payload,
    });
  },

  usernameCheck: (payload: any) => {
    return ApiCaller({
      url: `/users/usernameCheck`,
      method: 'post',
      data: payload,
    });
  },

  getUserDetails: () => {
    return ApiCaller({
      url: `/users/userDetails`,
      method: 'get',
    });
  },
  getRecipesByCategory: (params: any) => {
    return ApiCaller({
      url: `/users/category`,
      method: 'get',
      params,
    });
  },
  postToCategory: (payload: any) => {
    return ApiCaller({
      url: `/users/category`,
      method: 'post',
      data: payload,
    });
  },

  deleteFromCategory: (payload: any) => {
    return ApiCaller({
      url: `/users/category`,
      method: 'delete',
      data: payload,
    });
  },

  postVerifyUser: (payload: any) => {
    return ApiCaller({
      url: `/users/verifyUser`,
      method: 'post',
      // data: payload,
    });
  },
};

const apiDefault = {
  checkServerConnection: () => {
    return ApiCaller({
      url: `/checkConnection`,
      method: 'get',
    });
  },
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ApiCaller,
  ...recipeApiList,
  ...userApiList,
  ...apiDefault,
};
