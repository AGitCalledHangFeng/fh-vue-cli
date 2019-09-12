import Vue from 'vue'

//  Sentry 3.27.2版本方式
import Sentry from 'raven-js'
import SentryVue from 'raven-js/plugins/vue'

//需要填入sentry项目地址
Sentry.config('', {
  release: 'v1.0'
})
  .addPlugin(SentryVue, Vue)
  .install()

// Sentry 5.6.1版本方式
// import * as Sentry from '@sentry/browser'
// import * as Integrations from '@sentry/integrations'

// Sentry.init({
//   dsn: 'https://a6aa511b9f5441e885dc68c3e419295a@sentry.io/1526029',
//   integrations: [new Integrations.Vue({ Vue, attachProps: true })]
// })

// vue文件错误捕获
const errorHandler = (error, vm, info) => {
  console.log('=======抛出全局异常========')
  console.log(vm)
  console.log('==========================')
  console.log(`err：${error.stack}`)
  console.log('==========================')
  console.log(`info：${info}`)
  console.log('==========================')

  if (Math.random() < 1) {
    //采集率，暂定为100%采集
    Sentry.captureException(error) // 上报错误信息
  }
}
Vue.config.errorHandler = errorHandler
Vue.prototype.$throw = error => errorHandler(error, this)

// js文件错误捕获
window.onerror = (msg, url, lineNum, colNum, err) => {
  console.log(`错误发生的异常信息（字符串）:${msg}`)
  console.log(`错误发生的脚本URL（字符串）:${url}`)
  console.log(`错误发生的行号（数字）:${lineNum}`)
  console.log(`错误发生的列号（数字）:${colNum}`)
  console.log(`错误发生的Error对象（错误对象）:${err}`)

  Sentry.captureException(msg) // 上报错误信息
  return true
}

// 静态资源异常捕获
// window.addEventListener(
//   'error',
//   error => {
//     console.log('捕获到静态资源异常：', error)
//     // Sentry.captureException(error) // 上报错误信息
//   },
//   true
// )

// 为了防止有漏掉的 Promise 异常
window.addEventListener('unhandledrejection', function(error) {
  error.preventDefault()
  console.log('捕获到Promise异常：', error)

  // Sentry 已自动捕获
  // if (Math.random() < 1) {
  //   //采集率，暂定为100%采集
  //   Sentry.captureException(error) // 上报错误信息
  // }
  return true
})

// function report(error) {
//   let reportUrl = '' //错误收集接口
//   new Image().src = `${reportUrl}?logs=${error}`
// }
