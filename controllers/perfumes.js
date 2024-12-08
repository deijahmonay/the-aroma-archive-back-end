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

router.post('/:perfumeId/keynote', async (req, res) => {
  try{
    // find perfume by id
    const createdPerfume = await Perfume.findById(req.params.perfumeId)
    // chesck if perfume exists and if not return 404 error
    if(!createdPerfume) 
      return res.status(404).json({ message: 'Perfume not found'})
    //add to perfume keynote
    createdPerfume.keyNotes.push(req.body)
    //save updated perfume object to daatbase
    await createdPerfume.save()
    // send 201 response (it works!)
    res.status(201).json(createdPerfume)
  }catch(err) {
    // send 400 error if it doesnt work
    res.status(400).json({ message: err.message})
  }
})

router.get('/:perfumeId/keynotes', async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.perfumeId)
    if(!perfume) {
      return res.status(404).json({ message: 'Perfume not found'})
    }
    res.status(200).json(perfume.keyNotes)
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:perfumeId/keynotes/:keynoteId', async (req, res) => {
  try{
    const perfume = await Perfume.findById(req.params.perfumeId)
    if(!perfume) {
      return res.status(404).json({ message: 'Perfume not founnd'})
    }
    const keynote = perfume.keyNotes.id(req.params.keynoteId)
    if(!keynote) {
      return res.status(404).json({ message: 'Keynote not found'})
    }
    res.status(200).json(keynote)
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.put('/:perfumeId/keynotes/:keynoteId', async (req, res) => {
  try{
    const perfume = await Perfume.findById(req.params.perfumeId)
    if(!perfume) {
      return res.status(404).json({ message: 'Perfume not founnd'})
    }
    const keynote = perfume.keyNotes.id(req.params.keynoteId)
    if(!keynote) {
      return res.status(404).json({ message: 'Keynote not found'})
    }
    keynote.set(req.body)
    await perfume.save()
    res.status(200).json({ message: 'Keynote update successful', perfume})
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/:perfumeId/keynotes/:keynoteId', async (req, res) => {
  try{
    const perfume = await Perfume.findById(req.params.perfumeId)
    if(!perfume) {
      return res.status(404).json({ message: 'Perfume not founnd'})
    }
    const keynote = perfume.keyNotes.id(req.params.keynoteId)
    if(!keynote) {
      return res.status(404).json({ message: 'Keynote not found'})
    }
    keynote.remove()
    await perfume.save()
    res.status(200).json({ message: 'Keynote was deleted!'})
  }catch(err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
