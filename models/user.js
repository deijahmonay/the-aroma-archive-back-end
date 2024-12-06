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

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword
  }
})
module.exports = mongoose.model('User', userSchema)
