const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const {createOTP} = require("../models/userOTP.js");

// Nodemailer
const transporter =  nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GOOGLE_PASS,
  },
});


// Function for sending an OTP mail to user
const sendVerificationOTP  = async ({id, email}) => {
    try {
        // generate an OTP
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`

        // mail options
        const mailOptions = {
            from: process.env.GMAIL,
            to: email,
            subject: "Verify your Email",
            html: `<p>Your verification code is <b>${otp}</b>.</p>
            <p>This code expires in <b>1 hour</b></p>`
        }

        // Hash OTP and store it in database
        const hashedOTP = await bcrypt.hash(otp, 10);
        const expires = new Date(Date.now() + 3600000);
        await createOTP(id, hashedOTP, expires);


        // send the OTP mail to user
        await transporter.sendMail(mailOptions)
    } catch (error) {
        throw error;
    }
}

module.exports = sendVerificationOTP ;