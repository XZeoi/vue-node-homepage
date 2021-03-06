/**
 * 后端server的入口文件 index.js
 */

/* 一、引入express模块 */
const express = require("express")

/* 二、 创建express实例 */
const app = express()

// 要解析req.body，则需要下面的中间件，用于处理json数据，否则得到的req.body始终为undefined（这个BUG花费了我很长时间）
app.use(express.json())
// 导入跨域并使用
app.use(require("cors")())

// 静态文件托管
app.use('/', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/uploads', express.static(__dirname + '/uploads'))

// 设置全局变量
// 设置全局密钥
app.set("secret", "sdadwd2ded23")



// 导入书数据库模块
require("./plugins/db")(app)
// 导入后台管理系统路由
require("./routes/admin/index")(app)
// 导入web系统路由
require("./routes/web/index")(app)


/* 三、 监听express实例，并设置端口为3000 */
app.listen(3000, () => {
  console.log("app listening is on port 3000")
})