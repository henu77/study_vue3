import { createStore } from "vuex";
// 用户相关的store
import userStore from "./module/user";
// 布局相关的store
import layoutStore from "./module/layout";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { userStore, layoutStore },
});
