/**
 * SubTag 我们除了定义大的分类外，也制定一些关键词，相当于副标签
 */

const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  name: { type: String }
})

const model = mongoose.model("SubTag", schema, subTags)

module.exports = model