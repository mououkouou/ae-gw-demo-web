import { instanceWithAuth } from "../common/interceptor";
import moment from "moment-timezone";
const BASE_URL = "/v1.0";

const calendarStore = {
  namespaced: true,
  state: {
    calendar_events: null,
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
    set_calendar_events(state, payload) {
      state.calendar_events = payload;
    },
    // set_search_game_schedule(state, search_schedule_list) {
    //   state.search_game_schedule = search_schedule_list;
    // },
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
    async api_calendar_events({ commit }, payload) {
      const { fromDateTime, untilDateTime } = payload;
      try {
        const response = await instanceWithAuth.get(
          `${BASE_URL}/users/me/calendar/events?fromDateTime=${fromDateTime}&untilDateTime=${untilDateTime}`
        );
        console.log();
        commit("set_calendar_events", response.data.events);
      } catch (error) {
        console.dir(error);
      }
    },
  },
};

export default calendarStore;
