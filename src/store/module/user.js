import { login } from "@/api/user";
import router from "@/router/index.js";

export default {
  state: {
    token: localStorage.getItem(process.env.VUE_APP_TOKEN_NAME) || "",
    userInfo:
      JSON.parse(localStorage.getItem(process.env.VUE_APP_USERINFO)) || "",
    // 标识用户是否已经加载过动态路由
    alreadyLoadAsyncRoutes: false,
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
    updateLoadAsyncRoutes(state) {
      state.alreadyLoadAsyncRoutes = true;
    },
    // 处理退出登录
    logout(state) {
      state.isLogin = false;
      localStorage.removeItem("VUE_ADMIN_ISLOGIN");
      state.token = "";
      localStorage.removeItem(process.env.VUE_APP_TOKEN_NAME);
      state.menuList = [];
      localStorage.removeItem(process.env.VUE_APP_MENU_LIST);
      localStorage.removeItem(process.env.VUE_APP_USERINFO);
    },
  },
  actions: {
    //处理登录
    async loginAction({ commit, dispatch }, data) {
      try {
        const res = await login(data);
        if (res.code <= 200 && res.code >= 0) {
          //登录成功，保存相关数据
          commit("updateToken", res.data.token);
          commit("updateUserInfo", {
            menus: res.data.menus,
            menu_urls: res.data.menus_url,
            username: res.data.username,
          });
          dispatch("loadAsyncRoute");
          return true;
        } else {
          return Promise.reject(res.msg);
        }
      } catch (error) {
        // console.log("User Store Error:", error);
        return Promise.reject(error);
      }
    },
    // 加载权限路由
    loadAsyncRoute({ state, commit }) {
      // 1.先去加载 router/modules 文件夹里面所有的routes
      const allRoutes = [];
      // 递归获取router/modules目录下的所有以.js文件结尾的暴露出来的模块
      const routeFiles = require.context("@/router/modules", true, /\.js/);

      routeFiles.keys().forEach((key) => {
        const route = require("@/router/modules" + key.split(".")[1]);
        allRoutes.push(...route.default);
      });

      console.log("自动加载的所有的路由：", allRoutes);
      const backRoutes = state.userInfo.menu_urls;

      console.log("后台返回:", backRoutes);

      // 2.根据后台返回的数据，过滤出权限路由
      const asyncRoutes = allRoutes.filter((item) =>
        backRoutes.includes(item.path)
      );

      console.log("过滤后的权限路由：", asyncRoutes);
      console.log(router);
      // 3.将权限路由添加如系统中
      asyncRoutes.forEach((route) => {
        // 将这些权限路由添加到 Layout 的子路由中
        router.addRoute("Layout", route);
      });

      commit("updateLoadAsyncRoutes");

      // resolve();
    },
  },
};
