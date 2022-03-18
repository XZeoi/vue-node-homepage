/* 1. 导入axios模块 */
import Axios from "axios"
import Vue from "vue"

/* 2. 创建axios实例 */
const http = Axios.create({
  baseURL: "http://localhost:3000/admin/api"
})

/* 3. 响应拦截处理 */
http.interceptors.response.use(res=>{
  return res
}, err=>{
  // 错误捕获处理
  // 对于所有需要错误弹窗处理的页面执行
  if (err.response.data.message) {
    Vue.prototype.$message({
      message: err.response.data.message,
      type: "error"
    })
  }
  return Promise.reject(err)
})

/* 3. 导出axios实例 */
export default http