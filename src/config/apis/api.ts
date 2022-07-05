import axios from "axios";
import recipeApiList from './recipes'
export const baseURL = "https://localhost:3443/";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Origin: baseURL,
};

const ApiCaller = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  headers: headers,
});
ApiCaller.interceptors.request.use(async function (config: any) {
  let token = await localStorage.getItem("token");
  config.headers.Authorization = token ? `${token}` : "";
  return config;
});
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ApiCaller,
  ...recipeApiList,
};
