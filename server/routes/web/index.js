 /**
  * 前端web页面的后端接口路由
  * @param {*} app 
  */

 module.exports = app => {
  const express = require("express")
  const router = express.Router()

  const mongoose = require("mongoose")

  const Setting = mongoose.model("Setting")
  const TechnicalArticle = mongoose.model("TechnicalArticle")
  const MyArticle = mongoose.model("MyArticle")
  const Photograph = mongoose.model("Photograph")
  const Design = mongoose.model("Design")
  const Drawing = mongoose.model("Drawing")

  // 1. 包括logo等网页中其他数据请求接口
  router.get("/settings", async (req, res) => {
    const model = await Setting.find()
    res.send(model)
  })

  // 2. 轮播图的数据接口
  router.get("/carousels", async (req, res) => {
    // 取出最后一条数据（即最新的那一条数据）
    // sort({_id:-1})先倒序，再limit(1)取出1条
    const technical_article = await TechnicalArticle.find({isBest: true}).sort({_id:-1}).limit(1)
    const myArticle = await MyArticle.find({isBest: true}).sort({_id:-1}).limit(1)
    const photograph = await Photograph.find({isBest: true}).sort({_id:-1}).limit(1)
    const design = await Design.find({isBest: true}).sort({_id:-1}).limit(1)
    const drawing = await Drawing.find({isBest: true}).sort({_id:-1}).limit(1)
    // 最好是从各模型中拿到前端需要的那几个属性的数据（待处理） 
    let model = []
    // 将所有模型的精选添加进model
    model.push(technical_article[0], myArticle[0], photograph[0], design[0], drawing[0])
    // 过滤掉undefined，即没有精选的数据
    model = model.filter(item => item!=undefined)
    console.log("best", model);
    res.send(model)
  })

  app.use("/web/api/", router)
 }