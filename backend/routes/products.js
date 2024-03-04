const express = require('express');
const {
    getAll,
    getItem,
    createItem,
    deleteItem,
    updateItem
} = require("../controllers/productController")

const router = express.Router()



// Get All
router.get('/', getAll)


// Get Single
router.get('/:id', getItem)

//Insert Product
router.post('/', createItem)


//Delete Product
router.delete('/:id', deleteItem)

//Update Product
router.patch('/:id', updateItem)

module.exports = router