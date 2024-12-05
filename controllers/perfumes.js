//controllers/pperfumes.js

const Perfume = require('../models/perfume.js')
const express = require('express')
const router = express.Router()


//Controller + router functions here 
router.post('/', async (req, res) => {
  try{
    const createdPerfume = await Perfume.create(req.body)
    res.status(201).json(createdPerfume)
  }catch(err){
    res.status(500).json({ error: err.message })
  }
})






















module.exports = router;