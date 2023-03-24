const { Schema, model } = require('mongoose')

const VisitSchema = new Schema({
    rating: { type: Number, min: 1, max: 10 },
    dateVisited: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: Schema.Types.ObjectId, ref: 'Destination', required: true } 
})

//Declare and export model and schema
const Visit = model('Visit', VisitSchema)
module.exports = Visit