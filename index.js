var app = require('express')()
var bodyParser = require('body-parser')
var apiRoutes = require('./app/controllers')
var config = require('./config')
var mongoose = require('mongoose')

connectDB()

app.use(bodyParser.json())
// app.use(multer())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.send('Hello world!')
})

app.use('/api', apiRoutes)
app.listen(process.env.PORT || 3000)

function connectDB () {
  var options = { server: { socketOptions: { keepAlive: 1 } } }
  mongoose.connect(
    config.database,
    options
  )
  mongoose.Promise = global.Promise
  // Lấy kết nối mặc định
  var db = mongoose.connection
  db.on('error', () => console.log('Error'))
    .on('disconnected', () => {
      console.log('disconnected')
    })
    .once('open', () => {
      console.log('connect success')
    })
}
