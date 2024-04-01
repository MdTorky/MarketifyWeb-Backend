const express = require('express');

const { getAll, sendMessage } = require('../controllers/messageController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

router.use(requireAuth)


router.get('/:chatId', getAll)


router.post('/', sendMessage)


module.exports = router
