var mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  thumbnails: {
    type: String
  }
})

var Posts = mongoose.model('Posts', PostSchema)
module.exports = Posts
