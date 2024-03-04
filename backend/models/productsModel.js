const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productsSchema = new Schema({

    pTitle: {
        type: String,
        required: true,
    },
    pDescription: {
        type: String,
        required: true,
    },
    pPrice: {
        type: Number,
    },
    pCondition: {
        type: String,
        required: true,
    },
    pCategory: {
        type: [String],
        required: true
    },
    pImage: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    pType: {
        type: String,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model("Product", productsSchema)

