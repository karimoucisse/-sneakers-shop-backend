const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    color: [{type: String, required: true}],
    brand: {type: String, required: true},
    size: [{type: String, required: true}],
    price: {type: Number, required: true},
    description: {type: String},
    available: {type: Boolean, default: true},
    categories : [{ type: Schema.Types.ObjectId, ref: "Category"}]
},{
    timestamps: true
}) 

module.exports = mongoose.model("Product", ProductSchema)