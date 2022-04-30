const express = require('express')
const app = express()
const Product = require('../models/Product')

// CREATE ONE PRODUCT
app.post('/', async (req, res) => {
   const newProduct = new Product(req.body) 
   try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
   }catch (err) {
        res.status(500).json(err)
   }
})

//MODIFY ONE PRODUCT
app.put('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const modifyProduct = await Product.findByIdAndUpdate(
            {_id: id},
            {...req.body},
            {new: true}
        )
            .exec()
        res.json(modifyProduct)
    }catch (err){
        console.log(err)
        res.status(500).json(err)
    }
})

// DELETE ONE PRODUCT
app.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json("product has been deleted !")
    }catch (err) {
        res.status(500).json(err)
    }
})

//GET ONE PRODUCTS
app.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findById(id)
        .exec()
        res.json(product)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

})

// GET ALL PRODUCT 
app.get('/', async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products;
        if(qNew) {
            // SORT LATEST PRODUCT
            products = await Product.find().sort({createdAt: -1}).limit(1)
        } else if (qCategory) {
            // SORT PRODUCT BY CATEGORY
            products = await Product.find({categories: qCategory})
        } else {
            // GET ALL PRODUCT
            products = await Product.find()
        }
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = app