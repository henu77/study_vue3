import { login } from "@/api/user";

export default {
  state: {
    token: localStorage.getItem(process.env.VUE_APP_TOKEN_NAME) || "",
    userInfo:
      JSON.parse(localStorage.getItem(process.env.VUE_APP_USERINFO)) || "",
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
      // 把Token保存到 localStorage
      localStorage.setItem(process.env.VUE_APP_TOKEN_NAME, token);
    },
    updateUserInfo(state, userInfoObj) {
      // 把Token保存到 localStorage
      state.userInfo = userInfoObj;
      localStorage.setItem(
        process.env.VUE_APP_USERINFO,
        JSON.stringify(userInfoObj)
      );
    },
  },
  actions: {
    //处理登录
    async loginAction({ commit }, data) {
      try {
        const res = await login(data);
        //登录成功，保存相关数据
        commit("updateToken", res.data.token);
        commit("updateUserInfo", {
          menus: res.data.menus,
          menus_url: res.data.menus_url,
          username: res.data.username,
        });
        return true;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
