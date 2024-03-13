const express = require('express');

const { loginUser, RegisterUser } = require("../controllers/userController")

const router = express.Router()



//Login Route
router.post('/login', loginUser)


//Register Route
router.post('/register', RegisterUser)


module.exports = router