const mongoose = require('mongoose')

const paintingSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: [true, 'painting name is missing!']
    },
    categories:
    {
        type: Array,
        required: [true, 'category is missing!']
    },
    price:
    {
        type: Number,
        required: [true, 'price is missing!']
    },
    size:
    {
        type: String,
        required: [true, 'size is missing!']
    },
    image:
    {
        type: String,
        required: [true, 'image is missing!']
    },
    quantity:
    {
        type: Number,
        required: [true, 'quantity is missing!']
    },
    description:
    {
        type: String
    },

}, {timestamps: true})

const Painting = mongoose.model("painting", paintingSchema)
module.exports = Painting