const express = require('express');

const {
    accessChat, fetchChats
} = require("../controllers/chatController")
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()


// require auth for all routes
router.use(requireAuth)


// Get All
router.post('/', accessChat)
router.get("/", fetchChats);

// Get Single
// router.get('/:id', getItem)

// //Insert Product
// router.post('/', createItem)


// //Delete Product
// router.delete('/:id', deleteItem)

// //Update Product
// router.patch('/:id', updateItem)

module.exports = router