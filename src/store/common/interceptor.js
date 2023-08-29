import axios from "axios";
import userStore from "../module/userStore";

// axios.defaults.baseURL =
//   "https://cors-anywhere.herokuapp.com/https://www.worksapis.com";
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

function setInterceptors(instance) {
  instance.interceptors.request.use(
    function (config) {
      config.headers.Authorization =
        "Bearer " + userStore.state.auth_token.access_token;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
}

function createInstance() {
  const instance = axios.create();
  return instance;
}
export const instance = createInstance();

function createInstanceWithAuth() {
  const instance = axios.create();
  return setInterceptors(instance);
}
export const instanceWithAuth = createInstanceWithAuth();
