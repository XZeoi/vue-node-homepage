/**
 * MainTag 主标签，用于文章的大分类
 */

const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  name: { type: String }
})


const model = mongoose.model("MainTag", schema, "mainTags")

module.exports = model