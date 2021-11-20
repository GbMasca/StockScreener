const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    googleID: String,
    currentSearch: {type: Schema.Types.ObjectId, ref: "Search", default: null}
})

mongoose.model('user', userSchema)
