/**
 * 路由模块
 * @param {*} app express的实例
 */

module.exports = app => {
  /* 1. 导入express模块 */
  const express = require("express")

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

  /* 3. 编写通用模型接口的CRUD */
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
    const model = await req.Model.find()
    console.log('查',model);
    res.send(model)
  })
    /* (5) 查具体 */
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

   /* 4. 统一通用路由规则 */
  app.use("/admin/api/:resource", (req, res, next) => {
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
}