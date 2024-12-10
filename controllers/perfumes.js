//controllers/perfumes.js
const express = require('express')
const verifyToken = require('../middleware/verify-token.js')
const Perfume = require('../models/perfume.js')
const router = express.Router()

router.use(verifyToken)

router.post('/', async (req, res) => {
  try {
    req.body.author = req.user._id;
    const perfume = await Perfume.create(req.body)
    perfume._doc.author = req.user
    res.status(201).json(perfume)
  } catch (error) {
    res.status(500).json(error)
  }
});


router.get('/', async (req, res) => {
  try {
    const perfumes = await Perfume.find().populate('author', 'name email').sort({ createdAt: 'desc' });
    res.status(200).json(perfumes);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:perfumeId', async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.perfumeId).populate('author', 'name email');
    if (!perfume) {
      return res.status(404).send('Perfume not found')
    }
    res.status(200).json(perfume)
  } catch (error) {
    res.status(500).json(error)
  }
});


router.delete('/:perfumeId', async (req, res) => {
  try{
    const perfume = await Perfume.findById(req.params.perfumeId)
    if(!perfume.author.equals(req.user._id)) {
      return res.status(403).send('You are not allowed!')
    }
    const deletedPerfume = await Perfume.findByIdAndDelete(req.params.perfumeId)
    res.status(200).json(deletedPerfume)
  }catch(err) {
      res.status(500).json({error: err.message})
    }
  }
)

router.put('/:perfumeId', async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.perfumeId)

    if(!perfume.author.equals(req.user._id)){
      return res.status(403).send("You don't go here, unauthorized!")
    }
    const updatedPerfume = await Perfume.findByIdAndUpdate(req.params.perfumeId, req.body, 
      { new: true }
    )
    updatedPerfume._doc.author = req.user
    res.status(200).json(updatedPerfume)
  } catch (error) {
      res.status(500).json({ error: error.message });
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
