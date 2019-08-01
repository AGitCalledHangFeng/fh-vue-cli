import Vue from 'vue'
import Router from 'vue-router'

//路由懒加载
const index = () => import('@/pages/index/index.vue')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
      state: ''
    },
    component: index
  }]
})

router.beforeEach((to, from, next) => { //beforeEach是router的钩子函数，在进入路由前执行
  // if (to.meta.title) { //判断是否有标题
  //   document.title = to.meta.title
  // }
  next() //执行进入路由，如果不写就不会进入目标页
})

export default router
