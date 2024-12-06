// models/user.js

const mongoose = require('mongoose')

const userSchema =  mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User;