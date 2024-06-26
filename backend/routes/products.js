const express = require('express');
const {
    getAll,
    getItem,
    createItem,
    deleteItem,
    updateItem,
    getFirstProductByUserId
} = require("../controllers/productController")

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()


// require auth for all routes
router.use(requireAuth)


// Get All
router.get('/', getAll)


// Get Single
router.get('/:id', getItem)


router.get('user/:userID', getFirstProductByUserId)

//Insert Product
router.post('/', createItem)


//Delete Product
router.delete('/:id', deleteItem)

//Update Product
router.patch('/:id', updateItem)

module.exports = router