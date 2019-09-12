// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入错误监听机制
import './utils/handleError'

import App from './App'
// 路由模块引入
import router from './router'
// vuex状态模块引入
import store from './store'

// axios引入
import axios from 'axios'
Vue.prototype.$axios = axios
import api from './api' // 导入api接口
Vue.prototype.$api = api // 将api挂载到vue的原型上

// ElementUI引入(使用的组件比较少，暂时不考虑全量引入，采用按需引入)
import { MessageBox, Message } from 'element-ui'
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
// import ElementUI from 'element-ui'
// Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'

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
import global_ from './assets/js/global.js'
Vue.prototype.GLOBAL = global_

require('./mock') //引入mock数据，关闭则注释该行

Vue.config.productionTip = false

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
