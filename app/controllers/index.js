var express = require('express')
var postController = require('./postController')

var apiRoutes = express.Router()

apiRoutes.route('/post').get(postController.getPosts)
apiRoutes.route('/post/:postId').get(postController.getPostById)
apiRoutes.route('/post').post(postController.addPost)

module.exports = apiRoutes
