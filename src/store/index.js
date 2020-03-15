import Vue from 'vue'
import Vuex from 'vuex'
import ads from './ads'
import user from './user'
import shared from './shared'
import orders from "./orders";
import profiles from "./profiles";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ads,
    user,
    shared,
    orders,
    profiles
  }
})
