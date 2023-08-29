import Vue from "vue";
import Vuex from "vuex";
import userStore from "./module/userStore.js";
import mailStore from "./module/mailStore.js";
import calendarStore from "./module/calendarStore.js";
import driveStore from "./module/driveStore.js";
import boardStore from "./module/boardStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { userStore, mailStore, calendarStore, driveStore, boardStore },
});
