const express = require('express')
const app = express()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('../config/passport')

// ALLOW USER TO SIGNUP
app.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                ...req.body,
                password: hash
            })
            user.save()
                .then(() => {
                    res.status(201).json({ message: 'user is created ' })
                    console.log(user);
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
})

// ALLOW USER TO LOGIN
app.post("/login",  passport.authenticate("local"), (req, res) => {
    if (req.user) {
        req.logIn(req.user, async err => {
            if(err) {
                console.log(err)
            } else {
                const user = await User.findOne({_id: req.user._id})
                    .lean()
                    .exec()
                res.json(user)
            }
        })
    }
    
})

// ALLOW USER TO LOGOUT
app.delete("/logout", async (req, res) => {
    req.session.destroy()
    req.logout()
    res.status(200).json({ message: "Success, user is logout" })
})


module.exports = app