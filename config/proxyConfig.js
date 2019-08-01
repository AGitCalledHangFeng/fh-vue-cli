module.exports = {
  proxyList: {
    '/devApi': {
      target: '', // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/devApi': '' //需要rewrite重写的
      }
    }
  }
}
