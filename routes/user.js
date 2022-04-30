const express = require('express')
const app = express()
const Users = require('../models/User')
const bcrypt = require('bcrypt')

//GET ALL USER
app.get('/', async (req,res) => {
    try {
        const users = await Users.find()
        .exec()
        res.json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error })
    }
})

// GET ONE USER BY HIS ID
app.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const user = await Users.findById(id)
        .exec()
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error })
    }

})

// MODIFY ONE USER INFORMATION 
app.put('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = await Users.findByIdAndUpdate(
            {_id: id},
            {...req.body, password: hash},
            {new: true}
        )
            .exec()
            res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error })
    }
})
module.exports = app