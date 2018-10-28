var mongoose = require('mongoose')

const FileSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

var Files = mongoose.model('File', FileSchema)
module.exports = Files
