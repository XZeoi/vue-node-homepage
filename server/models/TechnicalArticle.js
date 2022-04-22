/**
 * TechnicalArticle 模型
 */

/* 1. 导入mongoose模块 */
const mongoose = require("mongoose")

/* 2. 定义模型字段 */
const schema = new mongoose.Schema({
  // （1）名称
  title: {
    type: String
  },
  // (补充) 精选
  isBest: {
    type: Boolean,
    default: false
  },
  banner: {
    type: String
  },
  description: {
    type: String
  },
  // (2) 主标签
  // 只有一个，用于标识文章大的分类
  mainTag: { type: mongoose.Schema.Types.ObjectId , ref: 'MainTag' },
  // (3) 副标签
  // 可有多个，表示文章的关键词
  subTags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubTag' }],
  // (4) 信息
  infos: {
    timeCreated: {},
    locationCreated: {},
    climate: {}
  },
  // (5) 内容
  content: {
    type: String
  }
})

/* 3. 创建模型 */
const model = mongoose.model("TechnicalArticle", schema, "technicalArticles")

/* 4. 导出模型 */
module.exports = model