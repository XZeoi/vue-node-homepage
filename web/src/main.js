import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// scss
import './assets/scss/style.scss'

// iconfont
import './assets/iconfont/iconfont.css'


import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// mavon- editor 高亮
import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/googlecode.css'  
//use v-highlight
//自定义一个代码高亮指令
Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
      hljs.highlightBlock(block)
  })
})

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
