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

DestinationSchema.methods.updateRating = async function () {
    // Populate the visits array with the actual visit documents
    const populatedDestination = await this.populate('visits')
    const numRatings = populatedDestination.visits.length;
    if (numRatings > 0) {
        try {
            let totalRating = 0;
            for (let i = 0; i < numRatings; i++) {
                totalRating += populatedDestination.visits[i].rating;
            }
            this.rating = totalRating / numRatings;
            this.save()
        } catch (error) {
            console.error(error);
        }
    } else {
        this.rating = 0;
        this.save()
    }
};

  

//Declare and export model and schema
const Destination = model('Destination', DestinationSchema)
module.exports = Destination