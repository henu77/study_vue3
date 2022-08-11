import axios from "axios";
import store from "@/store";
import useMessage from "@/hooks/useMessage";
const { ElMessage } = useMessage();

const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  // 请求超时时间
  timeout: 1000 * 60 * 5,
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // console.log("请求拦截器", config);
    const token = store.state.userStore.token;
    // 在发送请求之前给 header 设置 token
    if (token && !config.url.includes("/userlogin")) {
      // config.headers[process.env.VUE_APP_AJAX_HEADER_AUTH_NAME] =
      //   localStorage.getItem(process.env.VUE_APP_TOKEN_NAME);
      config.headers[process.env.VUE_APP_AJAX_HEADER_AUTH_NAME] = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // console.log("响应拦截器", response);
    if (response.data.code <= 200 && response.data.code >= 0) {
      return response.data;
    } else {
      ElMessage({
        showClose: true,
        message: response.data.msg,
        type: "error",
      });
      return Promise.reject(response.data.msg);
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
