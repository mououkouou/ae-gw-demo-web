import moment from "moment-timezone";
import { instanceWithAuth } from "../common/interceptor";

const BASE_URL = "/v1.0";

const calendarStorexxx = {
  namespaced: true,
  state: {
    //game_schedule_all: [],
    //search_game_schedule: [],
    search_year: moment().format("YYYY"),
    search_month: moment().format("MM"),
    search_day: moment().format("DD"),
  },
  getters: {
    search_date(state) {
      return state.search_month + "." + state.search_day;
    },
    search_month_year(state) {
      return state.search_year + "-" + state.search_month;
    },
  },
  mutations: {
    set_game_schedule_all(state, schedule_list) {
      state.game_schedule_all = schedule_list;
    },
    set_search_game_schedule(state, search_schedule_list) {
      state.search_game_schedule = search_schedule_list;
    },
    set_search_year(state, year) {
      state.search_year = year;
    },
    set_search_month(state, month) {
      state.search_month = month;
    },
    set_search_day(state, day) {
      state.search_day = day;
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

export default calendarStorexxx;
