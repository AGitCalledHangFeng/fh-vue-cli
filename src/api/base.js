/**
 * 接口域名的管理
 */
let base = {};
if (process.env.NODE_ENV == 'development') {
  base = {
    mockApi: '/mockApi',
    api: 'devApi'
  }
} else if (process.env.NODE_ENV == 'production') {
  base = {
    api: ''
  }
}

export default base;
