const express = require('express');

const { loginUser, RegisterUser, ForgotPassword, ResetPassword, getAll, getItem, updateItem } = require("../controllers/userController")

const router = express.Router()



router.get('/', getAll)

router.get('/:id', getItem)

router.patch('/:id', updateItem)



//Login Route
router.post('/login', loginUser)

//Register Route
router.post('/register', RegisterUser)

router.post('/forgot-password', ForgotPassword)

router.post('/reset-password', ResetPassword)


module.exports = router