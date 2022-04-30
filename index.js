require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const passport = require('./config/passport')
const cors = require('cors')
// const passport = require('./config/passport')
const expressSession = require('express-session')

// require("./models/Cart")
// require("./models/Order")
// require("./models/Product")
// require("./models/User")


const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productsRoute = require('./routes/products')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')

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

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/products', productsRoute)
app.use('/cart', cartRoute)
app.use('/order', orderRoute)

app.listen(port, () => {
    console.log(`Serveur is running on port ${port}`);
})