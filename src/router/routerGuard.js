import store from "@/store/index.js";

const only_auth = async (to, from, next) => {
  await store.dispatch("userStore/user_access_token", store.state.auth_token);
  next();
};

export { only_auth };
