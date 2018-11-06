var Files = require('../models/file')
var utils = require('../utils')
const path = require('path')
var multer = require('multer')
var uploads = require('../../public/images/uploads')
const pathImage = 'public/images/uploads'

var storage = multer.diskStorage({
  destination: pathImage,
  filename: (req, file, cb) => {
    const fileName =
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    console.log('fileName>>', fileName)
    cb(null, fileName)
  }
})

var upload = multer({ storage: storage }).single('file')

exports.upload = (req, res) => {
  upload(req, res, err => {
    var baseUrl = `${req.protocol}://${req.headers.host}`
    // var baseUrl = 'https://blog-app-service.herokuapp.com'
    if (err) {
      res.status(500).send('Error>>>>', err)
    } else {
      var file = new Files()
      file.url = req.file.filename
      file.id = utils.generateID()
      console.log('Response FileName>>>>', req.file.filename)
      file.save(err => {
        if (err) res.status(500).send('Error>>>>', err)
        else res.status(200).json({ url: `${baseUrl}/api/file/${file.url}` })
      })
      // res.status(200).send({})
    }
  })
}

exports.sendFile = (req, res) => {
  res.sendFile(`${uploads.getPathImage()}/${req.params.id}`)
}

exports.getAllFile = (req, res) => {
  var baseUrl = `${req.protocol}://${req.headers.host}`
  // var baseUrl = 'https://blog-app-service.herokuapp.com'
  Files.find({}, function (err, files) {
    if (err) res.status(404).send('Error>>>')
    else {
      res.status(200).json({
        data: files.map(file => ({
          url: `${baseUrl}/api/file/${file.url}`
        }))
      })
    }
  })
}
