const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = mongoose.Schema({
    isAdmin: { type: Boolean, default: false },
    firstName: {type: String, required : true},
    lastName: {type: String, required : true},
    birthDate: {type: Date, required : true},
    email: {type: String, required : true, unique: true},
    password : { type : String, required : true, minlength: 6 },
    phoneNumber : { type : String },
    adress : { type : String, required : true},
    orders: [{ type : mongoose.Schema.Types.ObjectId, ref : "Order" }],
    cart : { type : mongoose.Schema.Types.ObjectId, ref : "Cart"},
    paymentMethods : [{ type : mongoose.Schema.Types.ObjectId, ref : "PaymentMethod"}],
}, {
    timestamps : true
})
// UserSchema.plugin(uniqueValidator)
const User = mongoose.model('User', UserSchema)
module.exports = User