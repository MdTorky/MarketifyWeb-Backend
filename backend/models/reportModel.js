const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reportsSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reportMessage: {
        type: String,
        required: true
    },
    reportStatus: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })


module.exports = mongoose.model("Reports", reportsSchema)