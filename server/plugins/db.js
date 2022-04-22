module.exports = app => {
  /* 1. 导入mongoose模块； */
  const mongoose = require("mongoose")

  /* 2. 连接本地MongoDB数据库  */
  mongoose.connect("mongodb://127.0.0.1:27017/vue-node-homepage", {
    useNewUrlParser: true
  })

  //数据库打开的监听事件
  mongoose.connection.once("open", function () {
    console.log("数据库连接成功！");
  });
  //数据库关闭的监听事件
  mongoose.connection.once("close", function () {
    console.log("数据库已断开！");
  });

  // 使用require-all第三方模块将在models模块目录引用
  // 后续即可在其他地方以mongoose.model("[模块名]")，传入一个参数来
  require("require-all")(__dirname + "/../models")
}