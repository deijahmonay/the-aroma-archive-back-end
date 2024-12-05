const express = require('express')
const router = express.Router()

router.get('/sign-token', (req, res) => {
  const user = {
    id: 1,
    username: 'test',
    password: 'test',
    email: 'test@emailexample.com'
  }
})

const token = jwt.sign({ user }, process.env.JWT_SECRET)