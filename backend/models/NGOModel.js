const mongoose = require('mongoose')
//SCHEMA

const Schema = mongoose.Schema

const NGOSchema = new Schema({
    NGOName:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    Phno:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    }
}, { timestamp: true })

module.exports = mongoose.model('NGO', NGOSchema)

