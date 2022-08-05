import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
// 全局注册 Icon 组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//滑动验证码插件
import MakeitCaptcha from "makeit-captcha";
import "makeit-captcha/dist/captcha.min.css";
app.use(MakeitCaptcha);

// 动画插件：https://motion.vueuse.org/
import { MotionPlugin } from "@vueuse/motion";
app.use(MotionPlugin);

app.use(store).use(router).mount("#app");
