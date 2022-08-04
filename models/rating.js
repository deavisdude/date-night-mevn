const { Schema, model } = require('mongoose')

const RatingSchema = new Schema({
    rating: {
        type: number,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        required: false,
    },
})

//Declare and export model and schema
const Rating = model('rating', RatingSchema)
module.exports = Rating