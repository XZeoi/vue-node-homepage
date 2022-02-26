/**
 * Design 设计作品模型
 */

const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  // 1. 名称
  title: { type: String },
  // 2. 信息
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
  // 3. 地址
  url: { type: String },
  // 4. 缩略图
  avatar: { type: String }
})

const model = mongoose.model("Design", schema, "designs")
module.exports = model