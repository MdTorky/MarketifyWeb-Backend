const Review = require('../models/reviewModel')
const mongoose = require('mongoose')

//get all items

const getAll = async (req, res) => {
    const items = await Review.find({}).sort({ createdAt: -1 })
    res.status(200).json(items)
}


// get single item
const getItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Item Found" })

    }
    const item = await Review.findById(id)

    if (!item) {
        return res.status(404).json({ error: "No Such Item Found" })
    }

    res.status(200).json(item)
}






//create a new item
const createItem = async (req, res) => {
    const { reviewerID, sellerID, reviewComment, reviewRating, proof } = req.body

    try {
        const item = await Review.create({ reviewerID, sellerID, reviewComment, reviewRating, poof: null })
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

    const item = await Review.findOneAndDelete({ _id: id })

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
    const item = await Review.findOneAndUpdate({ _id: id }, {
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



