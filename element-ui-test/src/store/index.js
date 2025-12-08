import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    user: null,
    isLoading: false
  },
  mutations: {
    INCREMENT(state) {
      state.count++;
    },
    DECREMENT(state) {
      state.count--;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    }
  },
  actions: {
    increment({ commit }) {
      commit('INCREMENT');
    },
    decrement({ commit }) {
      commit('DECREMENT');
    },
    incrementAsync({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('INCREMENT');
          resolve();
        }, 1000);
      });
    },
    setUser({ commit }, user) {
      commit('SET_USER', user);
    }
  },
  getters: {
    doubleCount: state => state.count * 2,
    isAuthenticated: state => !!state.user
  }
});
