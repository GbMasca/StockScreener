const mongoose = require('mongoose')
const { Schema } = mongoose

const searchIndexSchema = new Schema({
    index: String,
    value: String,
    errorMargin: {type: String, default: 10},
})

module.exports = searchIndexSchema
