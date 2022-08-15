export default {
  state: {
    // 控制菜单是否展开
    isExpand: true,
    isDark:
      localStorage.getItem("vueuse-color-scheme") == "dark"
        ? true
        : false || false,
  },
  mutations: {
    setIsExpand(state) {
      state.isExpand = !state.isExpand;
    },
    setIsDark(state, theme) {
      state.isDark = theme;
    },
  },
};
