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

  // 3. 技术文章标题列表分页展示接口
  // 动态参数 page：当前第几页；size：每页条数
  router.get("/technical_articles_title_lists/:page/:size", async (req, res) => {
    // 
    // let lastNum = req.params.page * req.params.size -1;
    let firstNum = req.params.page * req.params.size - req.params.size;
    const model = await TechnicalArticle.find().populate("mainTag").sort({_id:-1}).skip(firstNum).limit(req.params.size)
    const count = await TechnicalArticle.find().count()
    let pages = Math.ceil(count/req.params.size)
    res.send({
      data: model,
      count,
      pages
    })
  })

  // 4. 随笔标题列表分页展示接口
  router.get("/my_articles_title_lists/:page/:size", async (req, res) => {
    let firstNum = req.params.page * req.params.size - req.params.size;
    const model = await MyArticle.find().populate("mainTag").sort({_id:-1}).skip(firstNum).limit(req.params.size)
    const count = await MyArticle.find().count()
    let pages = Math.ceil(count/req.params.size)
    res.send({
      data: model,
      count,
      pages
    })
  })

  // 5. 摄影标题列表分页展示接口
  router.get("/photographs_title_lists/:page/:size", async (req, res) => {
    let firstNum = req.params.page * req.params.size - req.params.size;
    const model = await Photograph.find().populate("mainTag").sort({_id:-1}).skip(firstNum).limit(req.params.size)
    const count = await Photograph.find().count()
    let pages = Math.ceil(count/req.params.size)
    res.send({
      data: model,
      count,
      pages
    })
  })

  // 6. 技术文章详情页接口
  // findById
  router.get("/technical_article/:id", async (req, res) => {
    const model = await TechnicalArticle.findById(req.params.id).populate("mainTag").populate("subTags")
    const lists = await TechnicalArticle.find({}, "title").sort({id:-1}).limit(10)
    // 上一篇
    const pre = await TechnicalArticle.findOne({'_id': { '$lt': req.params.id }}, "_id title").sort({ _id: -1 })
    const next = await TechnicalArticle.findOne({'_id': { '$gt': req.params.id }}, "_id title").sort({ _id: 1 })
    res.send({
      article: model,
      otherLists: lists,
      pre,
      next
    })
  })

  app.use("/web/api/", router)
 }