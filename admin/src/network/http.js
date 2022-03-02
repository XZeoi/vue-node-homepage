/* 1. 导入axios模块 */
import Axios from "axios"

/* 2. 创建axios实例 */
const http = Axios.create({
  baseURL: "http://localhost:3000/admin/api"
})

/* 3. 导出axios实例 */
export default http