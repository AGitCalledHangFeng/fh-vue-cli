// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 路由模块引入
import router from './router'
// vuex状态模块引入
import store from './store'

// axios引入
import axios from 'axios'
Vue.prototype.$axios = axios
import api from './api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上

// echarts引入
// import echarts from "echarts"
// Vue.prototype.$echarts = echarts

//  lodash引入
// import _ from 'lodash'
// Vue.prototype._ = _

// css
import './assets/css/normallize.css'
import './assets/css/animate.min.css'
import './assets/css/common.scss'
// js
import global_ from "./assets/js/global.js"
Vue.prototype.GLOBAL = global_

require('./mock'); //引入mock数据，关闭则注释该行

Vue.config.productionTip = false

// 系统错误捕获
const errorHandler = (error, vm) => {
  console.error("抛出全局异常");
  console.error(vm);
  console.error(error);
  if (Math.random() < 1) { //采集率，暂定为100%采集
    report(error); // 上报错误信息
  }
};
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = error => errorHandler(error, this);

//为了防止有漏掉的 Promise 异常
window.addEventListener("unhandledrejection", function (error) {
  error.preventDefault();
  console.log("捕获到Promise异常：", error);
  if (Math.random() < 1) { //采集率，暂定为100%采集
    report(error); // 上报错误信息
  }
  return true;
});

function report(error) {
  let reportUrl = ''; //错误收集接口
  new Image().src = `${reportUrl}?logs=${error}`;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
