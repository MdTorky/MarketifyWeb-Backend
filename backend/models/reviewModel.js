const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewsSchema = new Schema({

    reviewerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewComment: {
        type: String,
        required: true
    },
    reviewRating: {
        type: Number,
        required: true
    },
}, { timestamps: true })


module.exports = mongoose.model("Reviews", reviewsSchema)