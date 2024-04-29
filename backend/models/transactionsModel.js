const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionsSchema = new Schema({

    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    paymentMethod: {
        type: String,
    },
    transactionStatus: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model("Transactions", transactionsSchema)