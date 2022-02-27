/**
 * 后端server的入口文件 index.js
 */

/* 一、引入express模块 */
const express = require("express")

/* 二、 创建express实例 */
const app = express()

// 导入跨域并使用
app.use(require("cors")())


// 导入书数据库模块
require("./plugins/db")

// 导入后台管理系统路由
require("./routes/admin/index")(app)


/* 三、 监听express实例，并设置端口为3000 */
app.listen(3000, () => {
  console.log("app listening is on port 3000")
})