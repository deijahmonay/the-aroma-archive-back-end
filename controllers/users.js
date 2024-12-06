// controllers/users.js
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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
    const token = jwt.sign(
      {username: user.username, _id: user.id}, 
      process.env.JWT_SECRET
    )
    res.status(201).json({ user, token })
  }catch(err) {
    res.status(400).json({error: err.message})
  }
})

router.post('/signin', async (req, res) => {
  try{
    const user = await User.findOne({ 
      $or: [
        { username: req.body.username },
        { email: req.body.email }
      ]
     })
    if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
      const token = jwt.sign({username: user.username, _id: user._id}, process.env.JWT_SECRET)
      res.status(200).json({ token })
    } else {
      res.status(401).json({ message: 'Invalid username, email or password!' })
    }
  }catch(err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router