const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    user_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    painting_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Painting"
    },
    quantity:
    {
        type: Number,
        min: 1,
        default: 1
    }
})

const Cart = mongoose.model("cart", cartSchema)
module.exports = Cart