const express = require('express');

const {
    getAll,
    getItem,
    getBySenderId,
    createItem,
    deleteByReceiverId,
    deleteBySenderAndReceiverId,
    updateStatusToSeen
} = require("../controllers/notificationController")
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()


// require auth for all routes
router.use(requireAuth)


// Get All
router.get('/:receiverId', getBySenderId)
// router.get("/", fetchChats);

// Get Single
// router.get('/:id', getItem)

// //Insert Product
router.post('/', createItem)


// //Delete Product
router.delete('/:senderId/:receiverId', deleteBySenderAndReceiverId)

router.delete('/:receiverId', deleteByReceiverId)

// //Update Product
// router.patch('/:id', updateItem)
router.patch('/:receiverId', updateStatusToSeen)

module.exports = router