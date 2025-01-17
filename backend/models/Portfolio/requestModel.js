const mongoose = require('mongoose')

const Schema = mongoose.Schema

const requestSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
    },
    service: {
        type: String,
        required: true
    },
    serviceId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        required: true

    }


}, { timestamps: true })


module.exports = mongoose.model("Requests", requestSchema)