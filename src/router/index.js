import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import useNProgress from "@/hooks/useNProgress";
const Layout = () =>
  import(/* webpackChunkName: "login" */ "../layout/index.vue");
const NProgress = useNProgress();

const routes = [
  {
    path: "/login",
    name: "login",
    // 路由懒加载
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    // import 动态导入
  },
  {
    path: "/",
    name: "Layout",
    redirect: "/menu",
    component: Layout,
    // children: [],
  },
  // 匹配404路由
  {
    path: "/:pathMatch(.*)*",
    name: "ErrorPage",
    component: () =>
      import(/* webpackChunkName: "NotFontPage" */ "@/views/NotFind.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// 导航前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  const token = store.state.userStore.token;

  if (to.name !== "login") {
    //去的不是login页面
    if (!token) {
      next({ name: "login" });
    } else {
      // 用户已经登陆
      // 判断当前用户是否已经加载权限路由，如果没有加载权限路由，则重新加载
      if (!store.state.userStore.alreadyLoadAsyncRoutes) {
        store.dispatch("loadAsyncRoute").then(() => {
          router.push(to.fullPath);
        });
      } else {
        next();
      }
    }
  } else {
    // 去的是login页面
    if (token) {
      console.log("有token再去login页面");
      // next({ name: "index" });
      next();
    } else {
      next();
    }
  }
});
// 导航后置钩子
router.afterEach(() => {
  // 关闭进度条
  NProgress.done();
});
export default router;
