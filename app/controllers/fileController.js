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
    cb(null, fileName)
  }
})

var upload = multer({ storage: storage }).single('file')

exports.upload = (req, res) => {
  upload(req, res, err => {
    const domainName = req.headers.host
    if (err) {
      res.status(500).send('Error>>>>', err)
    } else {
      var file = new Files()
      file.url = req.file.filename
      file.id = utils.generateID()
      file.save(err => {
        if (err) res.status(500).send('Error>>>>', err)
        else res.status(200).json({ url: `${domainName}/api/file/${file.url}` })
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
  console.log('BaseUrl>>>', baseUrl)
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
