/**
 * 管理员账号模型
 */

// 1. 引入mongoose
const mongoose = require("mongoose")

// 2. 新建Schema约束
const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    // 1. 设置类型
    type: String,
    // 2. 添加参数select为false，表示后台显示的时候为空
    select: false,
    // 3. 将加密方法放入set()方法中以返回加密后的散列
    set(val) {
      return require("bcrypt").hashSync(val,10)
    }
  }
})

// 3. 创建模型
const model = mongoose.model("AdminUser", schema, "adminUsers")

// 4. 导出模型
module.exports = model