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
  post.excerpts = req.body.excerpts
  post.save(err => {
    if (err) res.status(500).send('Not save success' + err)
    else res.status(200).json({ id: post.id })
  })
}

exports.updatePost = (req, res) => {
  console.log('Request>>>', req.body)
  Posts.findOne({ id: req.body.id }, function (err, post) {
    if (err) {
      res.status(500).send('Error: ' + err)
    } else {
      if (!post) {
        res.status(500).send('Not find post')
      } else {
        post.title = req.body.title
        if (req.body.content) {
          post.content = req.body.content
        }
        if (req.body.thumbnails) {
          post.thumbnails = req.body.thumbnails
        }
        if (req.body.excerpts) {
          post.excerpts = req.body.excerpts
        }
        post.save(err => {
          if (err) res.status(500).send('Not save success ' + err)
          else res.status(200).json({ success: true })
        })
      }
    }
  })
}
