const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');
const mongoose = require('mongoose')



const getAll = async (req, res) => {
    const items = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(items)
}

const getItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No Such Item Found" })

    }
    const item = await User.findById(id)

    if (!item) {
        return res.status(404).json({ error: "No Such Item Found" })
    }

    res.status(200).json(item)
}

const updateItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Item Found' })
    }
    const item = await User.findOneAndUpdate({ _id: id }, {
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
            // text: `http://localhost:3000/resetPassword/${user._id}`
            html: `<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'/>
                     <html dir='ltr' xmlns='http://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office'>
        
        <head>
            <meta charset='UTF-8'>
            <meta content='width=device-width, initial-scale=1' name='viewport'>
            <meta name='x-apple-disable-message-reformatting'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <meta content='telephone=no' name='format-detection'>
            <title></title>
            <!--[if (mso 16)]>
            <style type='text/css'>
            a {text-decoration: none;}
            </style>
            <![endif]-->
            <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
            <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
            <!--[if !mso]><!-- -->
            <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i' rel='stylesheet'>
            <!--<![endif]-->
        </head>
        
        <body data-new-gr-c-s-loaded='14.1162.0'>
            <div dir='ltr' class='es-wrapper-color'>
                <!--[if gte mso 9]>
                    <v:background xmlns:v='urn:schemas-microsoft-com:vml' fill='t'>
                        <v:fill type='tile' color='#f6f6f6'></v:fill>
                    </v:background>
                <![endif]-->
                <table class='es-wrapper' width='100%' cellspacing='0' cellpadding='0'>
                    <tbody>
                        <tr>
                            <td class='esd-email-paddings' valign='top'>
                                <table class='esd-header-popover es-header' cellspacing='0' cellpadding='0' align='center'>
                                    <tbody>
                                        <tr>
                                            <td class='esd-stripe' align='center'>
                                                <table class='es-header-body' width='600' cellspacing='0' cellpadding='0'
                                                    bgcolor='#ffffff' align='center'>
                                                    <tbody>
                                                        <tr>
                                                            <td class='es-p20t es-p20r es-p20l esd-structure' align='left'>
                                                                <!--[if mso]><table width='560' cellpadding='0'
                                    cellspacing='0'><tr><td width='180' valign='top'><![endif]-->
                                                                <table class='es-left' cellspacing='0' cellpadding='0'
                                                                    align='left'>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class='es-m-p0r es-m-p20b esd-container-frame'
                                                                                width='180' valign='top' align='center'>
                                                                                <table width='100%' cellspacing='0'
                                                                                    cellpadding='0'>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align='center'
                                                                                                class='esd-block-image'
                                                                                                style='font-size: 0px;'><a
                                                                                                    target='_blank'><img
                                                                                                        class='adapt-img'
                                                                                                        src='https://demo.stripocdn.email/content/guids/16587984-7aa9-4d50-889a-49e3feb18820/images/logo.png'
                                                                                                        alt
                                                                                                        style='display: block;'
                                                                                                        width='180'></a></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <!--[if mso]></td><td width='20'></td><td width='360' valign='top'><![endif]-->
                                                                <table cellspacing='0' cellpadding='0' align='right'>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class='esd-container-frame' width='360'
                                                                                align='left'>
                                                                                <table width='100%' cellspacing='0'
                                                                                    cellpadding='0'>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align='center'
                                                                                                class='esd-block-text es-m-txt-c'>
                                                                                                <h2
                                                                                                    style='font-size: 20px; font-family: 'open sans', 'helvetica neue', helvetica, arial, sans-serif; color: #000080;'>
                                                                                                    <br>
                                                                                                </h2>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align='center'
                                                                                                class='esd-block-text es-m-txt-c'>
                                                                                                <h2
                                                                                                    style='font-size: 30px; font-family: &quot;open sans&quot;, &quot;helvetica neue&quot;, helvetica, arial, sans-serif; color: #f45050;'>
                                                                                                    <strong>MARKETIFY</strong>
                                                                                                </h2>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align='center'
                                                                                                class='esd-block-text'>
                                                                                                <p><strong>Reset
                                                                                                        Password</strong></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <!--[if mso]></td></tr></table><![endif]-->
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class='es-content' cellspacing='0' cellpadding='0' align='center'>
                                    <tbody>
                                        <tr>
                                            <td class='esd-stripe' align='center'>
                                                <table class='es-content-body' width='600' cellspacing='0' cellpadding='0'
                                                    bgcolor='#ffffff' align='center'>
                                                    <tbody>
                                                        <tr>
                                                            <td class='es-p20t es-p20r es-p20l esd-structure' align='left'>
                                                                <table width='100%' cellspacing='0' cellpadding='0'>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class='esd-container-frame' width='560'
                                                                                valign='top' align='center'>
                                                                                <table width='100%' cellspacing='0'
                                                                                    cellpadding='0'>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align='left'
                                                                                                class='esd-block-text'>
                                                                                                <p style='color: #f45050;'>
                                                                                                    <strong>Hello,</strong>
                                                                                                </p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align='left'
                                                                                                class='esd-block-text'>
                                                                                                <p><br></p>
                                                                                                <p>Your request to <strong>reset
                                                                                                        your password</strong>
                                                                                                    has been received. Please
                                                                                                    follow the instructions sent
                                                                                                    to your email to set up a
                                                                                                    new password.<br></p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class='es-p20t es-p20r es-p20l esd-structure' align='left'>
                                                                <table width='100%' cellspacing='0' cellpadding='0'>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class='esd-container-frame' width='560'
                                                                                valign='top' align='center'>
                                                                                <table width='100%' cellspacing='0'
                                                                                    cellpadding='0'>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align='left'
                                                                                                class='esd-block-text'>
                                                                                                <p>To Reset your password,
                                                                                                    please follow the link
                                                                                                    below:&nbsp;&nbsp;</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                        <td align="left" class="esd-block-button"><span class="es-button-border" style="border-width: 0px; border-radius: 5px; background: #f45050; border-color: #2cb543; padding: 10px"><a href="http://localhost:3000/resetPassword/${user._id}" class="es-button" target="_blank" style="border-radius: 5px; background: #f45050; mso-border-alt: 10px solid #F45050; text-decoration: none; color: #FFFFFF">Reset Password</a></span></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class='esd-footer-popover es-footer' cellspacing='0' cellpadding='0' align='center'>
                                    <tbody>
                                        <tr>
                                            <td class='esd-stripe' align='center'>
                                                <table class='es-footer-body' width='600' cellspacing='0' cellpadding='0'
                                                    bgcolor='#ffffff' align='center'>
                                                    <tbody>
                                                        <tr>
                                                            <td class='esd-structure es-p20t es-p20r es-p20l' align='left'>
                                                                <table cellpadding='0' cellspacing='0' width='100%'>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width='560' class='esd-container-frame'
                                                                                align='center' valign='top'>
                                                                                <table cellpadding='0' cellspacing='0'
                                                                                    width='100%'>
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align='left'
                                                                                                class='esd-block-text'>
                                                                                                <p style='color: #b6b5b5;'>
                                                                                                    <i>Please ingnore this email
                                                                                                        if you didn't request a
                                                                                                        password change.</i>
                                                                                                </p>
                                                                                                <p style='color: #b6b5b5;'>
                                                                                                    <i></i><br>
                                                                                                </p>
                                                                                            </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td align='right'
                                                                                                class='esd-block-social es-p20'
                                                                                                style='font-size: 0px; background-color: #f45050; padding: 20px'
                                                                                                bgcolor='#F45050'>
                                                                                                <table cellpadding='0'
                                                                                                    cellspacing='0'
                                                                                                    class='es-table-not-adapt es-social'
                                                                                                    dir='ltr'>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td align='center'
                                                                                                                valign='top'
                                                                                                                class='es-p10r'>
                                                                                                                <a target='_blank'
                                                                                                                    href='https://twitter.com/MarketifyUTM'><img
                                                                                                                        src='https://stripo.email/static/assets/img/social-icons/circle-colored/x-circle-colored.png'
                                                                                                                        alt='X'
                                                                                                                        title='X'
                                                                                                                        width='32'
                                                                                                                        height='32'></a>
                                                                                                            </td>
                                                                                                            <td align='center'
                                                                                                                valign='top'
                                                                                                                class='es-p10r'>
                                                                                                                <a target='_blank'
                                                                                                                    href='https://www.facebook.com/profile.php?id=100088505045143&mibextid=ZbWKwL'><img
                                                                                                                        src='https://stripo.email/static/assets/img/social-icons/circle-colored/facebook-circle-colored.png'
                                                                                                                        alt='Fb'
                                                                                                                        title='Facebook'
                                                                                                                        width='32'
                                                                                                                        height='32'></a>
                                                                                                            </td>
                                                                                                            <td align='center'
                                                                                                            valign='top'
                                                                                                            class='es-p10r'>
                                                                                                            <a target='_blank'
                                                                                                                href='https://www.instagram.com/marketify.utm/'><img
                                                                                                                    src='https://ffgnbpw.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png'
                                                                                                                    alt='Ig'
                                                                                                                    title='Instagram'
                                                                                                                    width='32'
                                                                                                                    height='32'></a>
                                                                                                        </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
        
        </html>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                return res.send({ Status: 'Success' })
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
    getItem,
    updateItem,
    loginUser,
    RegisterUser,
    ForgotPassword,
    ResetPassword
}
