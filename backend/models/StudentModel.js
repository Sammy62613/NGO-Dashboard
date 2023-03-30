const mongoose = require('mongoose')
//SCHEMA

const Schema = mongoose.Schema

const StudentSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    USN: {
        type: String,
        required:true
    },
    Phno: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password:{
        type: String,
        hidden: true,
        required: true
    }
}, { timestamp: true })

module.exports = mongoose.model('Student', StudentSchema)