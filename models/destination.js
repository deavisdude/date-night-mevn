const { Schema, model } = require('mongoose')
  
const DestinationSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    cuisine: { type: String },
    visits: [{ type: Schema.Types.ObjectId, ref: 'Visit' }],
    rating: {
        type: Number,
        default: 0,
        get: v => Math.round(v * 10) / 10, // Round to one decimal place
        set: v => Math.round(v * 10) / 10, // Round to one decimal place
    }
})
  
DestinationSchema.virtual('numRatings').get(function () {
    return this.visits.length
})

DestinationSchema.methods.updateRating = function () {
    const numRatings = this.visits.length
    if (numRatings > 0) {
        const totalRating = this.visits.reduce((acc, curr) => acc + curr.rating, 0)
        this.rating = totalRating / numRatings
    } else {
        this.rating = 0
    }
}
  

//Declare and export model and schema
const Destination = model('Destination', DestinationSchema)
module.exports = Destination