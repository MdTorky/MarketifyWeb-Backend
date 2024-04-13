const mongoose = require('mongoose');

const Schema = mongoose.Schema

const notificationSchema = new Schema({

    type: {
        type: String,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
    },
    status: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model("Notification", notificationSchema)
