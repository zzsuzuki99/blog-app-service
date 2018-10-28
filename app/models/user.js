var mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String
  }
})

var Users = mongoose.model('Users', UserSchema)
module.exports = Users
