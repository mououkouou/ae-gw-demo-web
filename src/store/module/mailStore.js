import { instanceWithAuth } from "../common/interceptor";

const BASE_URL = "/v1.0";

const mailStore = {
  namespaced: true,
  state: {
    unread_mail_count: 0,
    unread_mails: null,
    mail_detail: null,
  },
  getters: {},
  mutations: {
    set_unread_mail_count(state, payload) {
      state.unread_mail_count = payload;
    },
    set_unread_mails(state, payload) {
      state.unread_mails = payload;
    },
    set_mail_detail(state, payload) {
      state.mail_detail = payload;
    },
  },
  actions: {
    async api_unread_mail_count({ commit }) {
      try {
        const response = await instanceWithAuth.get(
          `${BASE_URL}/users/me/mail/unread-count`
        );
        commit("set_unread_mail_count", response.data.count);
      } catch (error) {
        console.dir(error);
      }
    },
    async api_unread_mails({ commit }) {
      try {
        const response = await instanceWithAuth.get(
          `${BASE_URL}/users/me/mail/mailfolders/0/children?count=10&isUnread=true`
        );
        commit("set_unread_mails", response.data.mails);
        commit("set_unread_mail_count", response.data.unreadCount);
      } catch (error) {
        console.dir(error);
      }
    },
    async api_mail_detail({ commit }, mailId) {
      try {
        const response = await instanceWithAuth.get(
          `${BASE_URL}/users/me/mail/${mailId}`
        );
        commit("set_mail_detail", response.data.mail);
      } catch (error) {
        console.dir(error);
      }
    },
  },
};

export default mailStore;
