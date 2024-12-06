//controllers/perfumes.js
const express = require('express')
const verifyToken = require('../middleware/verify-token.js')
const Perfume = require('../models/perfume.js')
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
    if (!foundPerfume) {
     res.status(404)
     throw new Error('Perfume not found')
    }
    res.status(200).json(foundPerfume)
  }catch(err) {
    if (res.statusCode === 404) {
      res.json({ error: err.nessage})
    } else {
      res.status(500).json({ error: err.message })
    }
  }
})

router.delete('/:perfumeId', async (req, res) => {
  try{
    const deletedPerfume = await Perfume.findByIdAndDelete(req.params.perfumeId)
    if(!deletedPerfume) {
      res.status(404);
      throw new Error('Perfume not found.')
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
  try {
    const updatedPerfume = await Perfume.findByIdAndUpdate(req.params.perfumeId, req.body, 
      { new: true }
    );
    if (!updatedPerfume){
      res.status(404);
      throw new Error('Perfume not found.')
    }
    res.status(200).json(updatedPerfume)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router
