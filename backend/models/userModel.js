const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema


const userSchema = new Schema({


    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userFname: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userPhoneNo: {
        type: String,
        required: true,
    },
    userAddress: {
        type: String,
    },
    userImage: {
        type: String,
    },
    userPassport: {
        type: String,
        required: true,
        unique: true
    },
    userPassportImage: {
        type: String,
    },
    userStatus: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    userFine: {
        type: Number,
    },
    userError: {
        type: String,
    },
}, { timestamps: true })





// Static Signup Method
userSchema.statics.register = async function (userEmail, userFname, userPassword, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError) {

    //Validation
    if (!userEmail || !userFname || !userPassword || !userPhoneNo || !userPassport) {
        throw Error("All Fields Must Be Filled")
    }

    if (!validator.isEmail(userEmail)) {
        throw Error("Email is not Valid")
    }

    if (!validator.isStrongPassword(userPassword)) {
        throw Error("Password is not strong enough")
    }

    const emailExists = await this.findOne({ userEmail })
    const passportExists = await this.findOne({ userPassport })

    if (emailExists) {

        throw Error("Email Already Exists")
    }

    if (passportExists) {
        throw Error("Passport Already Exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(userPassword, salt)

    const user = await this.create({ userEmail, userFname, userPassword: hash, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError })

    return user
}



//Static Login Method

userSchema.statics.login = async function (userEmail, userPassword) {
    if (!userEmail || !userPassword) {
        throw Error("All Fields Must Be Filled")
    }

    const user = await this.findOne({ userEmail })

    if (!user) {
        // throw Error("Incorrect Email")
        throw Error("Invalid Login Credentials")

    }

    const match = await bcrypt.compare(userPassword, user.userPassword)

    if (!match) {
        throw Error("Invalid Login Credentials")
    }

    return user
}


userSchema.statics.resetPassword = async function (id, userPassword) {
    if (!userPassword) {
        throw Error("Please Enter The New Password")
    }

    if (!validator.isStrongPassword(userPassword)) {
        throw Error("Password is not strong enough")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(userPassword, salt)
    const item = await this.findOneAndUpdate({ _id: id }, { userPassword: hash })

    return item
}







userSchema.statics.forgotPassword = async function (userEmail) {
    if (!userEmail) {
        throw Error("Please Enter An Email")
    }

    const user = await this.findOne({ userEmail })

    if (!user) {
        throw Error("User Don't Exist")
    }

    return user

}

module.exports = mongoose.model('User', userSchema)