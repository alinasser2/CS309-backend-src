const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    user_id:
    {
        type: Number,
        required: [true, 'user id is missing!'] 
    },
    total_cash:
    {
        type: Number,
        required: [true, 'total amount of cash is missing!'] 
    }
}, {timestamps: true})

const Purchase = mongoose.model("purchase", purchaseSchema)
module.exports = Purchase