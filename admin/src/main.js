import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/iconfont/iconfont.css'

/* 将基本样式引入  */
// import "./assets/style/normalize.css"

/* axios的挂载 */
// 1. 导入axios的实例 
import Http from "@/network/http.js"
// 2. 将axios实例挂载到vue原型上 
Vue.prototype.$http = Http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
