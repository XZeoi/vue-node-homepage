import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// scss
import './assets/scss/style.scss'

// iconfont
import './assets/iconfont/iconfont.css'

// 1. 导入network
import http from './network/http'
// 2. 挂载到vue原型上
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
