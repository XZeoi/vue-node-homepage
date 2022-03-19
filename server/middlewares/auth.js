/**
 * 路由权限限制
 * @param {*} options 
 * @returns 
 */

module.exports = options => {

  // 1. jsonwebtoken第三方token模块
  const jwt = require("jsonwebtoken")

  // 2. 管理员账号模型
  const AdminUser = require("../models/AdminUser") 

  return async (req, res, next) => {
    // 1. 获取token
    const token = String(req.headers.authorization || '').split(' ').pop()

    // 2. 没有token
    if (!token) {
      return res.status(401).send({
        message: "请先登录！"
      })
    }

    // 3. 获取token中的id
    const { id } = jwt.verify(token, req.app.get("secret"))

    // 4. 没有id
    if(!id) {
      return res.status(401).send({
        message: "请先登录！"
      })
    }

    // 5. 依据id查询管理员用户名
    req.user = await AdminUser.findById(id)

    // 6. 不存在该用户
    if (!req.user) {
      return res.status(401).send({
        message: "请先登录！"
      })
    }

    next()
  }
}