import { instanceWithAuth } from "../common/interceptor";

const BASE_URL = "/v1.0";

const driveStore = {
  namespaced: true,
  state: {
    drive_files: null,
  },
  getters: {},
  mutations: {
    set_drive_files(state, payload) {
      state.drive_files = payload;
    },
  },
  actions: {
    async api_drive_files({ commit }, payload) {
      try {
        const { orderBy, count } = payload;
        const response = await instanceWithAuth.get(
          `${BASE_URL}/users/me/drive/files?orderBy=${orderBy}&count=${count}`
        );
        commit("set_drive_files", response.data.files);

        return response.data.files;
      } catch (error) {
        console.dir(error);
      }
    },
  },
};

export default driveStore;
