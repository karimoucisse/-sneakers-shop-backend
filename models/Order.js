const mongoose = require('mongoose')
const { stringify } = require('querystring')

const OrderSchema = mongoose.Schema({
    user: {type: String, required: true},
    products: [
        { 
            productId: {type: String}
        },
        {
            quantity: {type: Number, default: 1}
        }
    ],
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: {type: stringify, default: "pending"},
    // orderItems: [
    //     {
    //         name: {type: String, required: true},
    //         qty: {type: Number, required: true},
    //         image: {type: String, required: true},
    //         price: {type: Number, required: true},
    //         product: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             required: true,
    //             ref: "Product"
    //         }
    //     }
    // ],
    // shoppingAddress: {
    //     address: {type: String, required: true},
    //     city: {type: String, required: true},
    //     postalCode: {type: String, required: true},
    //     country: {type: String, required: true}
    // },
    // paymentMethod: {type: String, required: true, default: "Paypal"},
    // paymentResult: {
    //     id: {type: String},
    //     status: {type: String},
    //     upfate_time: {type: String},
    //     email_address: {type: String}
    // },
    // totalPrice: {
    //     type: Number, 
    //     required: true, 
    //     default: 0.0
    // },
    // isPaid: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // },
    // paidAt: {type: Date},
    // isDelivered: {type: Date}
},{
    timestamps: true
})

module.exports = mongoose.model("Order", OrderSchema)