/**
 * Design 设计作品模型
 */

const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  // 1. 名称
  title: { type: String },
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
  // （补充）公开/私密
  isSecret: false,
  // 2. 类型
  mainTag: { type: mongoose.Schema.Types.ObjectId , ref: 'MainTag' },
  // 3. 信息
  infos: {
    // (1) 发表时间
    timeCreated: { type: String },
    // (2) 发表地点
    locationCreated: { type: String },
    // (3) 天气
    climate: { type: String },
    // (4) 制图工具
    tools: [{ type: String }]
  },
  // 4. 地址
  url: { type: String },
  // 5. 缩略图
  avatar: { type: String }
})

const model = mongoose.model("Design", schema, "designs")
module.exports = model