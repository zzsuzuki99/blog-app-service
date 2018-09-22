var Posts = require('../models/post')

exports.getPostById = (req, res) => {
  var id = req.params.postId
  console.log(id)
  Posts.findById(id, function (err, post) {
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

const generateID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

exports.addPost = (req, res) => {
  console.log('req>>>', req.body, generateID())
  //   var id = req.params.postId
  //   console.log(id)
  var post = new Posts()
  post.id = generateID()
  post.title = req.body.title
  post.content = req.body.content
  post.save(err => {
    if (err) res.status(500).send('Not save success' + err)
    else res.json({ success: true, message: 'ADD_SUCCESS!' })
  })
}
