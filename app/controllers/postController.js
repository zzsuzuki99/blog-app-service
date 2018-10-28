var utils = require('../utils')
var Posts = require('../models/post')

exports.getPostById = (req, res) => {
  var id = req.params.postId
  console.log(id)
  Posts.findOne({ id: id }, function (err, post) {
    if (err) res.status(404).send('Not find post by Id')
    else res.json({ success: true, message: 'Success!', data: post })
  })
}

exports.getPosts = (req, res) => {
  Posts.find({}, function (err, posts) {
    if (err) res.status(404).send('Not find post by Id')
    else res.json({ success: true, message: 'Success!', data: posts })
  })
}

exports.addPost = (req, res) => {
  var post = new Posts()
  post.id = utils.generateID()
  post.title = req.body.title
  post.content = req.body.content
  post.thumbnails = req.body.thumbnails
  post.save(err => {
    if (err) res.status(500).send('Not save success' + err)
    else res.status(200).json({ id: post.id })
  })
}
