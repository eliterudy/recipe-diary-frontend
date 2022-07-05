import Api from './api';
const {ApiCaller} = Api


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getRecipes: () => {
      return ApiCaller({
        url: `/recipes`,
        method: "get",
      });
    },
   
   
    getComments: (params: any) => {
      return ApiCaller({
        url: `/comments`,
        method: "get",
        params,
      });
    },
    postNewComment: (data: any) => {
      return ApiCaller({
        url: `/comments`,
        method: "post",
        data,
      });
    },
  
    postFeedback: (data: any) => {
      return ApiCaller({
        url: `/feedback`,
        method: "post",
        data,
      });
    },
  };