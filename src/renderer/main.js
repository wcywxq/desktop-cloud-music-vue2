import Vue from "vue";
// import axios from 'axios'

import App from "./App";
import router from "./router";
import store from "./store/index.js";

/** element-ui */
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
// 更改element-ui的主题颜色
// import './assets/element-variables.scss'

/** 样式引用 */
import "./assets/scss/reset.scss";
import "../../static/icon/iconfont.css";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
// Vue.http = Vue.prototype.$http = axios
/** 异步请求 */
import { server } from "./interface/index";

Vue.server = Vue.prototype.$server = server;

Vue.config.productionTip = false;

/** 图片懒加载插件 */
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  loading: `${require("./assets/images/loading.png")}`
});

/** 登陆路由判断 */
router.beforeEach((to, from, next) => {
  // to：要跳转的路由，from：当前要离开的路由，next进行页面跳转必须调用，否则不会跳转到下一个路由
  if (to.matched.some(record => record.meta.auth)) {
    // 判断该路由是否需要登录权限
    if (store.state.loginMessage.status == 1) {
      // 已经登陆则正常跳转
      next();
    } else {
      // 未登录则跳转到登陆界面
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

/** eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
