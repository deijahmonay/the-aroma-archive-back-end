//controllers/perfumes.js
const express = require('express')
const verifyToken = require('../middleware/verify-token.js')
const Perfume = require('../models/perfume.js')
const router = express.Router()

router.use(verifyToken)

router.get('/user', verifyToken, async (req, res) => {
  try {
    const perfumes = await Perfume.find({ author: req.user._id });
    res.json(perfumes);
  } catch (error) {
    res.status(500).json({err: err.message});
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const newPerfume = new Perfume({
      ...req.body,
      author: req.user._id,
    });
    const savedPerfume = await newPerfume.save()
    res.status(201).json(savedPerfume)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});


router.get('/', verifyToken, async (req, res) => {
  try {
    const perfumes = await Perfume.find({ author: req.user._id }).populate('author', 'username')
    res.status(200).json(perfumes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:perfumeId', verifyToken, async (req, res) => {
  try {
    const perfume = await Perfume.findOne({
      _id: req.params.perfumeId,
      author: req.user._id, // Only acces to only the user who owns perfume 
    })
      .populate('author', 'username')
      .populate('keynotes.author', 'username')

    if (!perfume) {
      return res.status(404).json({ error: 'Perfume not found or unauthorized' })
    }
    res.status(200).json(perfume);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:perfumeId', async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.perfumeId);
    // Check if logged-in user is the author
    if (!perfume.author.equals(req.user._id)) {
      return res.status(403).send("You're not permitted here!!");
    }
    const updatedPerfume = await Perfume.findByIdAndUpdate(
      req.params.perfumeId,
      req.body,
      { new: true }
    )
    updatedPerfume._doc.author = req.user
    res.status(200).json(updatedPerfume)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete('/:perfumeId', async (req, res) => {
  try {
      const perfume = await Perfume.findById(req.params.perfumeId)

      if (!perfume.author.equals(req.user._id)){
          return res.status(403).send("You're unauthorized!")
      }

      const deletedPerfume = await Perfume.findByIdAndDelete(req.params.perfumeId)
      res.status(200).json(deletedPerfume)
  }catch(error){
      res.status(500).json(error)
  }
})

router.post('/:perfumeId/keynotes', async (req, res) => {
  try{
    req.body.author = req.user._id
    const perfume = await Perfume.findById(req.params.perfumeId)
    // chesck if perfume exists and if not return 404 error
    perfume.keynotes.push(req.body)
    await perfume.save()
    const newKeynote = perfume.keyNotes[perfume.keyNotes.length -1]
    newKeynote._doc.author = req.user
    
    res.status(201).json(newKeynote)
  }catch(err) {
    res.status(400).json({ message: err.message})
  }
})



module.exports = router
