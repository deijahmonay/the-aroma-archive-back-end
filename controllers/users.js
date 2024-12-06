// controllers/users.js
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

const SALT_LENGTH = 12

router.post('/signup', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (userInDatabase) {
      return res.status(400).json({error: 'Username already taken. Please try another username.'})
    }

    const emailInDatabase = await User.findOne({ email: req.body.email })
    if (emailInDatabase) {
      return res.status(400).json({ error: 'Email already taken. Please try another email.'})
    }
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)
    })
    res.status(201).json({ user })
  }catch(err) {
    res.status(400).json({error: err.message})
  }
})

router.post('/sign', async (req, res) => {
  try{

  }catch(err) {
    
  }
})

module.exports = router