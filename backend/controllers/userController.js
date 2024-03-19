const User = require("../models/userModel.js")
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');



const getAll = async (req, res) => {
    const items = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(items)
}

const updateItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Item Found" })
    }
    const item = await Product.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!item) {
        return res.status(404).json({ error: "No Such Item Found" })
    }

    res.status(200).json(item)

}


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
        const userFname = user.userFname
        const userPhoneNo = user.userPhoneNo
        const userAddress = user.userAddress
        const userImage = user.userImage
        const userPassport = user.userPassport
        const userPassportImage = user.userPassportImage
        const userStatus = user.userStatus
        const userType = user.userType
        const userFine = user.userFine
        const userError = user.userError
        const userId = user._id

        res.status(200).json({ userEmail, token, userFname, userPassword, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError, userId })
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


        res.status(200).json({ userEmail, token, userFname, userPassword, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const ForgotPassword = async (req, res) => {
    const { userEmail } = req.body;

    try {
        const user = await User.forgotPassword(userEmail)
        const token = createToken(user._id)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'Marketify.utm@gmail.com',
                pass: 'xmlk mtyn kxup ooev'
            }
        });

        var mailOptions = {
            from: 'Marketify.utm@gmail.com',
            to: userEmail,
            subject: 'Marketify - Reset Your Password!',
            text: `http://localhost:3000/resetPassword/${user._id}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.send({ Status: "Success" })
            }
        });

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const ResetPassword = async (req, res) => {
    const { id, userPassword } = req.body

    try {

        const user = await User.resetPassword(id, userPassword)
        res.status(200).json({ userPassword, user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}





module.exports = {
    getAll,
    updateItem,
    loginUser,
    RegisterUser,
    ForgotPassword,
    ResetPassword
}
