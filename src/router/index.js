import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    // 路由懒加载
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    // import 动态导入
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
