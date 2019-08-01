// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // 使用postcss的插件实现vw适配
    // 由于cssnext和cssnano都具有autoprefixer,事实上只需要一个，所以把默认的autoprefixer删除掉，然后把cssnano中的autoprefixer设置为false
    'postcss-aspect-ratio-mini': {}, // 用来处理元素容器宽高比
    'postcss-write-svg': { // 用来处理移动端1px的解决方案
      uft8: false
    },
    // 'postcss-cssnext': {}, // 让项目使用CSS未来特性 并对其做兼容性处理
    'postcss-px-to-viewport': {
      viewportWidth: 1920, // 视窗的宽度，对应我们设计稿的宽度
      viewportHeight: 1080, // 视窗的高度
      unitPrecision: 3, // 指定'px'转换为视窗单位值得小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位,建议使用vw
      selectorBlackList: ['.ignore', '.hairliness'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值。
      mediaQuery: false // 允许在媒体查询中转换`px`
    },
    // 'postcss-viewport-units': {}, // 给CSS的属性添加content的属性 配合viewport-units-buggyfill解决个别手机不支持vw
    'cssnano': { // 压缩和清理CSS代码
      preset: 'advanced',
      autoprefixer: true,
      'postcss-zindex': false
    }
  }
}
