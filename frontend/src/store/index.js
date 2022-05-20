import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    CryptoKey: "000102030405060708090a0b0c0d0e0f",
    user: null,
  },
  // getters: {
  //   getUser: (state) => {
  //     return state.user;
  //   },
  // },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
});
