import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/iconfont/iconfont.css'
import '@/assets/style/elements.css'

/* 将基本样式引入  */
// import "./assets/style/normalize.css"

/* 定义一个事件总线 */
Vue.prototype.$eventBus = new Vue()

/* Vue全局混入 */
Vue.mixin({
  methods: {
    getAuthHeadersMixin() {
      return {
        Authorization: `Bearer ${sessionStorage.token || ''}`
      }
    }
  }
})

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
