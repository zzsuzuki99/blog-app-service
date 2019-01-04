var express = require('express')
var postController = require('./postController')
var fileController = require('./fileController')

var apiRoutes = express.Router()

apiRoutes.route('/post').get(postController.getPosts)
apiRoutes.route('/post/:postId').get(postController.getPostById)
apiRoutes.route('/post').post(postController.addPost)
apiRoutes.route('/post').put(postController.updatePost)

apiRoutes.post('/file/upload', fileController.upload)
apiRoutes.route('/file/:id').get(fileController.sendFile)
apiRoutes.route('/files').get(fileController.getAllFile)
module.exports = apiRoutes
