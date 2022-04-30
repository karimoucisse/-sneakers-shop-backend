const express = require('express')
const app = express()
const Order = require('../models/Order')
// CREATE ORDER
app.post('/', async (req, res) => {
    const newOrder = new Order (req.body) 
    try {
         const savedOrder = await newOrder.save()
         res.status(200).json(savedOrder)
    }catch (err) {
         res.status(500).json(err)
    }
 })
 
 //MODIFY ORDER
 app.put('/:id', async (req, res) => {
     const {id} = req.params
     try {
         const modifyOrder = await Order.findByIdAndUpdate(
             {_id: id},
             {...req.body},
             {new: true}
         )
             .exec()
         res.json(modifyOrder)
     }catch (err){
         console.log(err)
         res.status(500).json(err)
     }
 })
 
 // DELETE ORDER
 app.delete('/:id', async (req, res) => {
     const {id} = req.params
     try {
         await Order.findByIdAndDelete(id)
         res.status(200).json("Order has been deleted !")
     }catch (err) {
         res.status(500).json(err)
     }
 })
 
 //GET USER ORDERS
 app.get('/:userId', async (req, res) => {
     const {userId} = req.params
     try {
         const orders = await Order.find({userId: userId})
         .exec()
         res.json(orders)
     } catch (err) {
         console.log(err)
         res.status(500).json(err)
     }
 
 })
 
 // GET ALL CART
 app.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    }catch (err) {
        res.status(500).json(err)
    }
 }) 



module.exports = app