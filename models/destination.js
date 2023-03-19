const { Schema, model } = require('mongoose')
  
const destinationSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    cuisine: { type: String },
    visits: [visitSchema],
    rating: {
        type: Number,
        default: 0,
        get: v => Math.round(v * 10) / 10, // Round to one decimal place
        set: v => Math.round(v * 10) / 10, // Round to one decimal place
    }
})
  
destinationSchema.virtual('numRatings').get(function () {
    return this.visits.length
})

destinationSchema.methods.updateRating = function () {
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