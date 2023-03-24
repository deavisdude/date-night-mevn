const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    user_id: { type: String, required: true },
    visits: [{ type: Schema.Types.ObjectId, ref: 'Visit' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    destinations: [{ type: Schema.Types.ObjectId, ref: 'Destination'}]
  })

//Declare and export model and schema
const User = model('User', UserSchema)
module.exports = User