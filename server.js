const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

const perfumeRouter = require('./controllers/perfumes.js')

app.use(cors())

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

// Start routes here

app.use('/perfumes', perfumeRouter)

app.listen(3000, () => {
  console.log('The express app is ready!');
});
