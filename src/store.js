import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    box: {
      type: 200,
      needed: 0,
      actual: 0,
      flute: 0,
      corrugated: 0
    },
    info: {}
  },
  mutations: {},
  actions: {}
});
