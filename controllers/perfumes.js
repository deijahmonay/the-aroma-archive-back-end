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
  try{
    const foundPerfume = await Perfume.findById(req.params.perfumeId)
    if(!foundPerfume) {
    return res.status(404).json({ error: 'Perfume not found'})
    }
    res.status(200).json(foundPerfume)
  }catch(err) {
    if (res.statusCode === 404) {
      res.json({ error: error.nessage})
    } else {
      res.status(500).json({ error: err.message })
    }
  }
})

router.delete('/:perfumeId', async (req, res) => {
  try{
    const deletedPerfume = await Perfume.findByIdAndDelete(req.params.perfumeId)
    if(!deletedPerfume) {
      res.status(404)
      throw new Error('Perfume not found')
    }
    res.status(200).json(deletedPerfume)
  }catch(err) {
    if (res.statusCode === 404) {
      res.json({ error: err.message })
    }else {
      res.status(500).json({error: err.message})
    }
  }
}
)

router.put('/:perfumeId', async (req, res) => {
  try{
    const updatedOerfume = await Perfume.findByidAndUpdate(req.params.perfumeId, req.body, {new: true})
    if(!updatedPerfume) {
      throw new Error('Perfume not found')
    } res.status(200).json(updatedPerfume)
  }catch(err) {
    if (res.statusCode === 400) {
      res.json({ error: err.message })
    }else {
      res.status(500).json({error: err.message})
    }
  }
})

module.exports = router;

















module.exports = router;