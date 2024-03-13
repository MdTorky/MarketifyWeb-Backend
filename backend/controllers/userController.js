const User = require("../models/userModel.js")
const jwt = require('jsonwebtoken')



const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })

}
// Login User
const loginUser = async (req, res) => {
    const { userEmail, userPassword } = req.body
    try {
        const user = await User.login(userEmail, userPassword)

        //Create Token
        const token = createToken(user._id)


        res.status(200).json({ userEmail, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}




// Register User

const RegisterUser = async (req, res) => {
    const { userEmail, userFname, userPassword, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError } = req.body

    try {
        const user = await User.register(userEmail, userFname, userPassword, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError)

        //Create Token
        const token = createToken(user._id)


        res.status(200).json({ userEmail, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {
    loginUser,
    RegisterUser
}
