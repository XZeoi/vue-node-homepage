const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  logo: {type: String},
  dailyWords: {type: String}
})

const model = mongoose.model("Setting", schema, "settings")

module.exports = model