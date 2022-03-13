/**
 * MyArticle 这里指除了技术文章外的，比如散文、日记等
 */

const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  // 1. 名称
  title: { type: String },
  // 2. 主标签
  mainTag: { type: mongoose.Schema.Types.ObjectId, ref: "MainTag" },
  // 3. 副标签
  subTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubTag" }],
  // 4. 基本信息
  infos: {
    // (1) 发表时间
    timeCreated: { type: String },
    // (2) 发表地点
    locationCreated: { type: String },
    // (3) 天气
    climate: { type: String }
  },
  // 5. 内容
  content: {
    type: String
  }
  
})

const model = mongoose.model("MyArticle", schema, "myArticles")

module.exports = model