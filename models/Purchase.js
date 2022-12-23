const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    user_id:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    total_cash:
    {
        type: Number,
        required: [true, 'total amount of cash is missing!'] 
    }
}, {timestamps: true})

const Purchase = mongoose.model("purchase", purchaseSchema)
module.exports = Purchase