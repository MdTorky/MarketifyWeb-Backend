const express = require('express');

const { loginUser, RegisterUser, ForgotPassword, ResetPassword, getAll, updateItem } = require("../controllers/userController")

const router = express.Router()



router.get('/', getAll)

router.patch('/:id', updateItem)



//Login Route
router.post('/login', loginUser)

//Register Route
router.post('/register', RegisterUser)

router.post('/forgot-password', ForgotPassword)

router.post('/reset-password', ResetPassword)


module.exports = router