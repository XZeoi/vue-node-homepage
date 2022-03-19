/**
 * 路由模块
 * @param {*} app express的实例
 */

module.exports = app => {
  /* 1. 导入express模块 */
  const express = require("express")

  /* 导入相关中间件 */
  const AuthMiddleware = require("../../middlewares/auth")

  /* 2. 创建一个路由容器 */
  const router = express.Router()

  // /* 3. 导入相关模型 */
  // const TechnicalArticle = require("../../models/TechnicalArticle")
  // /* 4. 编写该模型接口的CRUD */
  //   /* (1) 增 */
  // router.post("/technical_article", async (req, res) => {
  //   const model = await TechnicalArticle.create(req.body)
  //   res.send(model) 
  // })
  //   /* (2) 删 */
  // router.delete("/technical_article/:id", async (req, res) => {
  //   await TechnicalArticle.findByIdAndDelete(req.params.id)
  //   res.send({success: true})
  // })
  //   /* (3) 改 */
  // router.put("/technical_article/:id", async (req, res) => {
  //   const model = await TechnicalArticle.findByIdAndUpdate(req.params.id, req.body)
  //   res.send({success: true})
  // })
  //   /* (4) 查 */
  // router.get("/technical_article", async (req, res) => {
  //   const model = await TechnicalArticle.find().limit(10)
  //   res.send(model)
  // })
  //   /* (5) 查具体 */
  // router.get("/technical_article/:id", async (req, res) => {
  //   const model = await TechnicalArticle.findById(req.params.id)
  //   res.send(model)
  // })
  /* 5. 统一路由规则 */
  // app.use("/admin/api", router)

  /* 3. 编写通用资源路由模型接口的CRUD */
    /* (1) 增 */
  router.post("/", async (req, res) => {
    console.log(req.body)
    const model = await req.Model.create(req.body)
    console.log(model)
    res.send(model) 
  })
    /* (2) 删 */
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({success: true})
  })
    /* (3) 改 */
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send({success: true})
  })
    /* (4) 查 */
  router.get("/", async (req, res) => {
    /* 处理某个具体模型的关联查询 */
    // const queryOptions = {}
    // if (req.Model.modelName === 'TechnicalArticle') {
    //   queryOptions.populate = 'mainTag'
    // } 
    // const model = await req.Model.find().setOptions(queryOptions)

    /* 我们可以用Set the `strictPopulate` option to false to override.
    这样就可以实现所有模型的关联查询，即使在某些模型schema中不存在 */
    const model = await req.Model.find().populate([{ path: "mainTag",strictPopulate: false }])
    res.send(model)
  })
    /* (5) 查具体 */
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })



   /* 4. （资源路由）统一通用路由规则 */
  app.use("/admin/api/rest/:resource", AuthMiddleware(), (req, res, next) => {
    // const Inflection = require("inflection")
    // const res = req.params.resource
    // if (res.indexOf('_') != -1) {
    //   const resArray = res.split('_').map((el) => {
    //     let eled = Inflection.classify(el)
    //     return eled
    //   })
    // }
    console.log(req.params.resource);
    const modelName = require('inflection').classify(req.params.resource)
    console.log('name',modelName);
    req.Model = require(`../../models/${modelName}`)
    next()
  } ,router)



  /* 5. （上传路由）上传文件的接口 */ 
  // (1) 导入multer处理数据的第三方模块
  const multer = require('multer')

  // (2) 创建multer中间件
  const upload = multer({dest: __dirname + '/../../uploads'})

  // (3) 创建上传文件接口
  app.post("/admin/api/upload", upload.single("file"), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })



  /* 6. （登录路由）登录接口 */
  app.post("/admin/api/login", async (req, res) => {
    // (1) 解构前端发来的用户名及密码
    const { username, password } = req.body
    // (2) 导入AdminUser模型
    const AdminUser = require("../../models/AdminUser")
    // (3) 验证用户是否存在
    // [注意] 勿遗漏await
    const user = await AdminUser.findOne({username}).select("+password")
    if (!user) {
      return res.status(442).send({
        message: "用户名不存在！"
      })
    }
    // (4) 校验密码
    const isValid = require("bcrypt").compareSync(password, user.password)
    if (!isValid) {
      return res.status(442).send({
        message: "密码错误！"
      })
    }
    // (5) 生成token
    const token = require("jsonwebtoken").sign({
      id: user._id
    }, app.get("secret"))
    // (6) 返回token
    res.send({token})
  })
}