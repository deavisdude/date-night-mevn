const { Schema, model } = require('mongoose')

const DestinationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
})

//Declare and export model and schema
const Destination = model('destination', DestinationSchema)
module.exports = Destination