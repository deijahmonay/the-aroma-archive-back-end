// controllers/users.js
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

// router.post('/signup', (req, res))
router.post('/signup', (req, res) => {
  res.json({ message: 'Signup route' })
})

module.exports = router