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
    const userQrImage = user.userQrImage
    const userBankType = user.userBankType
    const userBankAccount = user.userBankAccount
    const lastDonation = user.lastDonation

    res.status(200).json({ userEmail, token, userFname, userPassword, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError, userId, userQrImage, userBankAccount, userBankType, lastDonation })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}








// Register User

const RegisterUser = async (req, res) => {
  const { userEmail, userFname, userPassword, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError, userQrImage, userBankAccount, userBankType, lastDonation } = req.body

  try {
    const user = await User.register(userEmail, userFname, userPassword, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError, userQrImage, userBankAccount, userBankType, lastDonation)

    //Create Token
    const token = createToken(user._id)

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'Marketify.utm@gmail.com',
        pass: 'xmlk mtyn kxup ooev'
      }
    });


    var html = `
       
        <!DOCTYPE HTML
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
      
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
      
        <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      
        <style type="text/css">
          @media only screen and (min-width: 520px) {
            .u-row {
              width: 500px !important;
            }
      
            .u-row .u-col {
              vertical-align: top;
            }
      
            .u-row .u-col-100 {
              width: 500px !important;
            }
      
          }
      
          @media (max-width: 520px) {
            .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
            }
      
            .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
      
            .u-row {
              width: 100% !important;
            }
      
            .u-col {
              width: 100% !important;
            }
      
            .u-col>div {
              margin: 0 auto;
            }
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          table,
          tr,
          td {
            vertical-align: top;
            border-collapse: collapse;
          }
      
          p {
            margin: 0;
          }
      
          .ie-container table,
          .mso-container table {
            table-layout: fixed;
          }
      
          * {
            line-height: inherit;
          }
      
          a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
          }
      
          table,
          td {
            color: #000000;
          }
      
          #u_body a {
            color: #0000ee;
            text-decoration: underline;
          }
        </style>
      
      
      
      </head>
      
      <body class="clean-body u_body"
        style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f7f8f9;color: #000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body"
          style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f7f8f9;width:100%"
          cellpadding="0" cellspacing="0">
          <tbody>
            <tr style="vertical-align: top">
              <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f7f8f9;"><![endif]-->
      
      
      
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                      <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
                        <div
                          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--<![endif]-->
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
                                          <img align="center" border="0"
                                            src='https://res.cloudinary.com/du1c6dplu/image/upload/v1716310390/admin/logo_jkuk05.png'
                                            alt="Marketify" title=""
                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 57%;max-width: 273.6px;"
                                            width="273.6" />
      
                                        </td>
                                      </tr>
                                    </table>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <!--[if mso]><table width="100%"><tr><td><![endif]-->
                                    <h1
                                      style="margin: 0px; color: #b41d1d; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 27px; font-weight: 700;">
                                      <span><span><span><span>MARKETIFY</span></span></span></span>
                                    </h1>
                                    <!--[if mso]></td></tr></table><![endif]-->
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <div
                                      style="font-size: 14px; font-weight: 700; line-height: 140%; text-align: left; word-wrap: break-word;">
                                      <p style="line-height: 140%;">We are excited you're joining us</p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <div
                                      style="font-size: 16px; font-weight: 700; color: #b41d1d; line-height: 140%; text-align: left; word-wrap: break-word;">
                                      <p style="line-height: 140%;">Welcome ${userFname} to Marketify</p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <div
                                      style="font-size: 14px; line-height: 140%; text-align: justify; word-wrap: break-word;">
                                      <p style="line-height: 140%;">You have created an account successfully </p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                      style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                            <span>&#160;</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                      <p style="line-height: 140%;"><strong>Please be sure to submit additional information
                                          before
                                          using the application</strong></p>
                                    </div>
      
                                  </td>
                                </tr>
                              </tbody>
                            </table>
      
                            <!--[if (!mso)&(!IE)]><!-->
                          </div><!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
      
      
      
      
      
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 100%;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
                      <!--[if (mso)|(IE)]><td align="center" width="100%" style="background-color: #b41d1d;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                      <div class="u-col u-col-100"
                        style="max-width: 100%;min-width: 100%;display: table-cell;vertical-align: top;">
                        <div
                          style="background-color: #b41d1d;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <!--<![endif]-->
      
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
      
                                    <div align="right">
                                      <div style="display: table; max-width:116px;">
                                        <table width="116" cellpadding="0" cellspacing="0" border="0">
                                          <tr>
                                            <td style="border-collapse:collapse; width: 100%;" align="right">
                                              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                                                style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:100%; display: flex"
                                                <tr>
      
      
                                                <td width=" 100%" style="width:100%; padding-right: 7px;" valign="top">
                                                  <table align="right" border="0" cellspacing="0" cellpadding="0" width="100%"
                                                    height="32"
                                                    style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 7px">
                                                    <tbody>
                                                      <tr style="vertical-align: top">
                                                        <td align="right" valign="middle"
                                                          style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                          <a href="https://twitter.com/MarketifyUTM" title="X"
                                                            target="_blank">
                                                            <img
                                                              src="https://res.cloudinary.com/dmv4mxgn5/image/upload/v1716310801/icons/twitter_qoxsm2.png"
                                                              alt="X" title="X" width="32"
                                                              style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                          </a>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                                <td width="32" style="width:32px; padding-right: 7px;" valign="top"><![endif]-->
      <table align="right" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 7px">
      <tbody><tr style="vertical-align: top"><td align="right" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <a href="https://www.facebook.com/profile.php?id=100088505045143&mibextid=ZbWKwL" title="Facebook" target="_blank">
      <img src="https://res.cloudinary.com/dmv4mxgn5/image/upload/v1713476650/icons/facebook_rwr4b3.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
      </a>
      </td></tr>
      </tbody></table>
      
                                                <td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
      <table align="right" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="right" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <a href="https://www.instagram.com/marketify.utm/" title="Instagram" target="_blank">
      <img src="https://res.cloudinary.com/dmv4mxgn5/image/upload/v1713476650/icons/instagram_uozpif.png" alt="Instagram" title="Instagram" width="32"
      style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
      </a>
      </td></tr>
      </tbody></table>
      <!--[if (mso)|(IE)]></td><![endif]-->
      
      
      <!--[if (mso)|(IE)]>
                                          </tr>
                                        </table>
                                  </td>
                                </tr>
                            </table><![endif]-->
      </div>
      </div>
      
      </td>
      </tr>
      </tbody>
      </table>
      
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>
      
      
      
                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
      </body>
      
      </html>
        `;


    var mailOptions = {
      from: {
        name: 'Marketify',
        address: 'Marketify.utm@gmail.com'
      },
      to: userEmail,
      subject: 'Marketify - Welcome To Marketify',
      html: html

    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: 'Success' })
      }
    });

    res.status(200).json({ userEmail, token, userFname, userPassword, userPhoneNo, userAddress, userImage, userPassport, userPassportImage, userStatus, userType, userFine, userError, userQrImage, userBankAccount, userBankType })
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

    var html = `
        <!DOCTYPE HTML
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
      
      <head>
      
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
      
        <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  
    <style type="text/css">
      @media only screen and (min-width: 520px) {
  .u-row {
    width: 500px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 500px !important;
  }

}

@media (max-width: 520px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
    </style>
  
  

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f7f8f9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f7f8f9;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f7f8f9;"><![endif]-->
    
  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src='https://res.cloudinary.com/du1c6dplu/image/upload/v1716310390/admin/logo_jkuk05.png' alt="Marketify" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 57%;max-width: 273.6px;" width="273.6"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <!--[if mso]><table width="100%"><tr><td><![endif]-->
    <h1 style="margin: 0px; color: #b41d1d; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 27px; font-weight: 700;"><span><span><span><span>MARKETIFY</span></span></span></span></h1>
  <!--[if mso]></td></tr></table><![endif]-->

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 14px; font-weight: 700; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;">Reset Password</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 16px; font-weight: 700; color: #b41d1d; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;">Hello ${user.userFname}</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 14px; line-height: 140%; text-align: justify; word-wrap: break-word;">
    <p style="line-height: 140%;">Your request to <strong>reset your password</strong> has been received. Please follow the instructions sent to your email to set up a new password.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;">To <strong>Reset your Password</strong>, please follow the link below:  </p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
<div align="center">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:43px; v-text-anchor:middle; width:142px;" arcsize="9.5%"  stroke="f" fillcolor="#b41d1d"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
    <a href="http://localhost:3000/resetPassword/${user._id} target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #b41d1d; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 19px;">
      <span style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 16.8px;">Reset Password</span></span>
    </a>
    <!--[if mso]></center></v:roundrect><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 14px; color: #bbbbbb; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;"><em>Please ignore this email if you didn't request a password change.</em></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="100%" style="background-color: #b41d1d;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="background-color: #b41d1d;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
      <div align="right">
      <div style="display: table; max-width:116px;">
        <table width="116" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="border-collapse:collapse; width: 100%;" align="right">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:100%; display: flex"
                <tr>


                <td width=" 100%" style="width:100%; padding-right: 7px;" valign="top">
                  <table align="right" border="0" cellspacing="0" cellpadding="0" width="100%"
                    height="32"
                    style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 7px">
                    <tbody>
                      <tr style="vertical-align: top">
                        <td align="right" valign="middle"
                          style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                          <a href="https://twitter.com/MarketifyUTM" title="X"
                            target="_blank">
                            <img
                              src="https://res.cloudinary.com/dmv4mxgn5/image/upload/v1716310801/icons/twitter_qoxsm2.png"
                              alt="X" title="X" width="32"
                              style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td width="32" style="width:32px; padding-right: 7px;" valign="top"><![endif]-->
<table align="right" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 7px">
<tbody><tr style="vertical-align: top"><td align="right" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
<a href="https://www.facebook.com/profile.php?id=100088505045143&mibextid=ZbWKwL" title="Facebook" target="_blank">
<img src="https://res.cloudinary.com/dmv4mxgn5/image/upload/v1713476650/icons/facebook_rwr4b3.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
</a>
</td></tr>
</tbody></table>

                <td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
<table align="right" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
<tbody><tr style="vertical-align: top"><td align="right" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
<a href="https://www.instagram.com/marketify.utm/" title="Instagram" target="_blank">
<img src="https://res.cloudinary.com/dmv4mxgn5/image/upload/v1713476650/icons/instagram_uozpif.png" alt="Instagram" title="Instagram" width="32"
style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
</a>
</td></tr>
</tbody></table>
    <!--[if (mso)|(IE)]></td><![endif]-->
    
    
    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
  </div>
</div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>

        `;


    var mailOptions = {
      from: {
        name: 'Marketify',
        address: 'Marketify.utm@gmail.com'
      },
      to: userEmail,
      subject: 'Marketify - Reset Your Password!',
      // text: `http://localhost:3000/resetPassword/${user._id}`
      html: html

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
