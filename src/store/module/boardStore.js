import { instanceWithAuth } from "../common/interceptor";

const BASE_URL = "/v1.0";

const boardStore = {
  namespaced: true,
  state: {
    boards: null,
    board_posts: null,
  },
  getters: {},
  mutations: {
    set_boards(state, payload) {
      state.boards = payload;
    },
    set_board_posts(state, payload) {
      state.board_posts = payload;
    },
  },
  actions: {
    async api_boards({ commit }) {
      try {
        const response = await instanceWithAuth.get(`${BASE_URL}/boards`);
        commit("set_boards", response.data.boards);
      } catch (error) {
        console.dir(error);
      }
    },
    async api_board_posts({ commit }, payload) {
      const { boardId, count } = payload;
      try {
        const response = await instanceWithAuth.get(
          `${BASE_URL}/boards/${boardId}/posts?count=${count}`
        );
        commit("set_board_posts", response.data.posts);
      } catch (error) {
        console.dir(error);
      }
    },
  },
};

export default boardStore;
