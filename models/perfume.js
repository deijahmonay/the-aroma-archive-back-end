//models/perfume.js

const mongoose = require('mongoose')

const keyNoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
    enum: [
      "Vanilla", "Citrus", "Lavender", "Amber", "Sandalwood", "Rose", "Patchouli", 
      "Jasmine", "Musk", "Bergamot", "Orange", "Cedarwood", "Peach", "Coconut", 
      "Chocolate", "Pineapple", "Mint", "Tobacco", "Leather", "Honey", "Fruity", 
      "Apple", "Cherry", "Fig", "Oud"
    ]
  },
  type: {
    type: String,
    required: true,
    enum: ["Top Note", "Middle Note", "Base Note"]
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
}, {timestamps: true});

const perfumeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true,
  },
  keyNotes: [keyNoteSchema],
  cost: {
    type: Number,
    min: 20,
    required: true,
  },
  duration: {
    type: String,
    required: true,
    enum: ["1-3 hours", "4-6 hours", "7-10 hours", "12+ hours"]
  },
  wantOwnStatus: {
    type: String,
    required: true,
    enum: ["Want", "Own"],
  },  
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true })

const Perfume = mongoose.model('Perfume', perfumeSchema)

module.exports = Perfume;