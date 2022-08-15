const path = require('path');
 
function resolve(dir) {
  return path.join(__dirname, dir)
}
 
 
 
module.exports = {
  productionSourceMap: false,// 生产环境是否要生成 sourceMap
  publicPath: './',  //   部署应用包时的基本 URL
  outputDir: 'dist',  //   打包时输出的文件目录
  assetsDir: 'assets',  //   放置静态文件夹目录
  devServer: {
    port : 8080, //开发环境运行时的端口
    https: false,//是否启用HTTPS协议
    open: true, //项目运行成功后是否直接打开浏览器
    hot: true,//是否开启热加载
    overlay: true,//当出现编译错误或警告时，在浏览器中显示全屏覆盖。
    proxy: null
    // proxy: {   //服务器代理
    //   '/api': {
    //     target: "api-url",   // 实际跨域请求的API地址
    //     secure: false,   // https请求则使用true
    //     ws: true,
    //     changeOrigin: true,  // 跨域
    //     // 请求地址重写  http://front-end/api/login ⇒ http://api-url/login
    //     pathRewrite: {
    //       '^/api': '/',
    //     }
    //   },
    // }, // dev环境下，webpack-dev-server 相关配置
  },

  lintOnSave: false,//是否在开发环境下每次保存代码时都启用 eslint验证
 
  css:{},// css的处理
 
  // chainWebpack：config=>{} //vue-cli内部的webpack配置
 
  pluginOptions:{},// 可以用来传递任何第三方插件选项
 
  
 
}