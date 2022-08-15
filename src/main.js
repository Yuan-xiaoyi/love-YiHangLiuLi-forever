// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './css/default.css'
import './css/scroll.css'
import './css/button.css'
import popup from './components/pubComponents/popup'
import Message from './js/message'
const JSON5 = require('json5')

Vue.config.productionTip = false
Vue.prototype.baseConfig = {}
Vue.component('popup', popup)
Vue.use(Message)

axios.get('./static/project.config.json5').then((result) => {
  Vue.prototype.baseConfig = JSON5.parse(result.data)

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}).catch((error) => {
  console.log('get baseConfig error...' + error)
})
