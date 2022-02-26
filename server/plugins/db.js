module.exports = app => {
  /* 1. 导入mongoose模块； */
  const mongoose = require("mongoose")

  /* 2. 连接本地MongoDB数据库  */
  mongoose.connect("mongodb://127.0.0.1:27017/vue-node-homepage", {
    useNewUrlParser: true
  })
}