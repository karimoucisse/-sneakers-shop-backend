require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const expressSession = require('express-session')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connection to MongoDB successful !'))
  .catch(() => console.log('Connection to MongoDB failed !'))

app.use(express.json())
app.use(cors({
    origin: process.env.ALLOWED_DOMAIN,
    credentials: true
}))
app.use(express.static('public'))
app.use(expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.json('hello word !')
})

app.listen(port, () => {
    console.log(`Serveur is running on port ${port}`);
})