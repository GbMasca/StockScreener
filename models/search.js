const mongoose = require('mongoose')
const { Schema } = mongoose
const SearchIndexSchema = require('./searchIndex')

const searchSchema = new Schema({
    _user: {type: Schema.Types.ObjectId, ref: "User"},
    name: String,
    sector: String,
    industry: String,
    searchIndex: {type: [SearchIndexSchema], default: []},
})

mongoose.model('search', searchSchema)
