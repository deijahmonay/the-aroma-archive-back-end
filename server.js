const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

const testJWTRouter = require('./controllers/test-jwt.js')
const usersRouter = require('./controllers/users.js')
const profilesRouter = require('./controllers/profiles.js')
const perfumeRouter = require('./controllers/perfumes.js')


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors())
app.use(express.json());

// Start routes here

app.use('/test-jwt', testJWTRouter)
app.use('/users', usersRouter)
app.use('/profiles', profilesRouter)
app.use('/perfumes', perfumeRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`the express app is ready and running on port ${PORT}`)
})