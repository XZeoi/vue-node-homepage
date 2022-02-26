/**
 * 路由模块
 * @param {*} app express的实例
 */

const { findByIdAndUpdate } = require("../../models/TechnicalArticle")

module.exports = app => {
  /* 1. 导入express模块 */
  const express = require("express")

  /* 2. 创建一个路由容器 */
  const router = express.Router()

  /* 3. 导入相关模型 */
  const TechnicalArticle = require("../../models/TechnicalArticle")

  /* 4. 编写该模型接口的CRUD */
    /* (1) 增 */
  router.post("/technical-article", async (req, res) => {
    const model = await TechnicalArticle.create(req.body)
    res.send(model) 
  })

    /* (2) 删 */
  router.delete("/technical-article/:id", async (req, res) => {
    await TechnicalArticle.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

    /* (3) 改 */
  router.put("/technical-article/:id", async (req, res) => {
    const model = await TechnicalArticle.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      success: true
    })
  })

    /* (4) 查 */
  router.get("/technical-article", async (req, res) => {
    const model = await TechnicalArticle.find().limit(10)
    res.send(model)
  })

    /* (5) 查具体 */
  router.get("/technical-article/:id", async (req, res) => {
    const model = await TechnicalArticle.findById(req.params.id)
    res.send(model)
  })

  /* 5. 统一路由规则 */
  app.use("/admin/api", router)
}