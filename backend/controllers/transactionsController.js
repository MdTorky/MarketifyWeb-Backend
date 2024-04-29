const Transaction = require('../models/transactionsModel')
const mongoose = require('mongoose')

//get all items

const getAll = async (req, res) => {
    const items = await Transaction.find({}).sort({ createdAt: -1 })
    res.status(200).json(items)
}


// get single item
const getItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Item Found" })

    }
    const item = await Transaction.findById(id)

    if (!item) {
        return res.status(404).json({ error: "No Such Item Found" })
    }

    res.status(200).json(item)
}






//create a new item
const createItem = async (req, res) => {
    const { sellerID, buyerID, productID, paymentMethod } = req.body

    try {
        const item = await Transaction.create({ sellerID, buyerID, productID, paymentMethod, transactionStatus: "Not Paid" })
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete an item
const deleteItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Item Found" })
    }

    const item = await Transaction.findOneAndDelete({ _id: id })

    if (!item) {
        return res.status(404).json({ error: "No Such Item Found" })
    }

    res.status(200).json(item)

}


//update an item
const updateItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Item Found" })
    }
    const item = await Transaction.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!item) {
        return res.status(404).json({ error: "No Such Item Found" })
    }

    res.status(200).json(item)

}



module.exports = {
    getAll,
    getItem,
    createItem,
    deleteItem,
    updateItem,
}



