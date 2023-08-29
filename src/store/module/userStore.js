import axios from "axios";
import { instanceWithAuth } from "../common/interceptor";

// axios.defaults.baseURL = "https://auth.worksmobile.com";
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const AUTH = "/oauth2/v2.0";
const API = "/v1.0";

const userStore = {
  namespaced: true,
  state: {
    auth_code: null,
    auth_token: null,
    user_info: null,
    user_profile_image: null,
  },
  getters: {},
  mutations: {
    set_auth_code(state, payload) {
      state.auth_code = payload;
    },
    set_auth_token(state, payload) {
      state.auth_token = payload;
    },
    set_user_info(state, payload) {
      state.user_info = payload;
    },
    set_user_profile_image(state, payload) {
      state.user_profile_image = payload;
    },
  },
  actions: {
    async api_auth_token({ commit }, payload) {
      const { code, client_id, client_secret, domain } = payload;
      try {
        const response = await axios.post(
          `${AUTH}/token?code=${code}&grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&domain=${domain}`
        );
        commit("set_auth_token", response.data);
      } catch (error) {
        console.dir(error);
      }
    },

    async api_user_info({ commit }) {
      try {
        const response = await instanceWithAuth.get(`${API}/users/me`);
        commit("set_user_info", response.data);
      } catch (error) {
        console.dir(error);
      }
    },

    async api_user_profile_image({ commit }) {
      try {
        const response = await instanceWithAuth.get(`${API}/users/me/photo`);
        commit("set_user_profile_image", response.data);
      } catch (error) {
        console.dir(error);
      }
    },

    async user_access_token({ commit }, payload) {
      commit("set_auth_token", payload);
    },
  },
};

export default userStore;
