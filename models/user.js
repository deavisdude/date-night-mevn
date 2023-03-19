const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    user_id: { type: String, required: true },
    visits: [{ type: Schema.Types.ObjectId, ref: 'Visit' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  })

//Declare and export model and schema
const User = model('User', userSchema)
module.exports = User