const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = mongoose.Schema({
    role: { type: String },
    firstName: {type: String, required : true},
    name: {type: String, required : true},
    birthDate: {type: Date, required : true},
    email: {type: String, required : true, unique: true},
    password : { type : String, required : true, minlength: 6 },
    phoneNumber : { type : String },
    adress : { type : String, required : true},
    orders: [{ type : Schema.Types.ObjectId, ref : "Order" }],
    cart : { type : Schema.Types.ObjectId, ref : "Cart"},
    paymentMethods : [{ type : Schema.Types.ObjectId, ref : "PaymentMethod"}],
}, {
    timestamps : true
})
UserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', UserSchema)