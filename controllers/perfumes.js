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

router.get('/', async (req, res) => {
  try{
    const foundPerfumes = await Perfume.find()
    res.status(200).json(foundPerfumes)
  }catch(err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:perfumeId', async (req, res) => {
  console.log('Route hit with ID:', req.params.perfumeId);
  res.json({ message: `Show route with the param ${req.params.perfumeId}`})
})




















module.exports = router;