const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const {createUser, getUserById} = require("../models/userModel.js");
const validateUser = require("../middlewares/inputValidatior.js");
const {hashPassword, comparePassword} = require("../helpers/hash.js");
const sendVerificationOTP = require("../helpers/otp.js");
const { getUserOTP, deleteOTP, updateUserVerification } = require("../models/userOTP.js");

// User signup - POST
router.post("/signup", validateUser, async (req, res, next) => {
    try {
        const {name, email, password, phone} = req.body;

        // hash user password
        const hashedPassword = await hashPassword(password)

        // Store user in db 
        const user = await createUser(name, email, hashedPassword, phone);

        // send otp to user
        await sendVerificationOTP(user);

        return res.status(201).json({message: "User created successfully", data: user});
        
    } catch (error) {
        next(error);
    }
});

// verify user - POST
router.post("/verify/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const {code} = req.body;
        
        // get user data
        const user = await getUserById(id);
        if (! user)
            return res.status(404).json({message: "User not found"});
        
        // check if user is already verified
        if (user.verified)
            return res.status(400).json({message: "User is already verified"});

        // check if code match and not expired
        const otp = await getUserOTP(user.id);
        if (!otp){
            await sendVerificationOTP(user);
            return res.status(400).json({ message: "No OTP found. a new one is sent." });
        }
        const match = await bcrypt.compare(code, otp.otp);
        
        if (!match)
            return res.status(400).json({message: "Invalid OTP code"});
        
        if (Date.now() > new Date(otp.expires).getTime()){
            await deleteOTP(otp.id);
            return res.status(400).json({message: "OTP is expired. A new one is sent"})
        }
        
        // update user verification status
        await updateUserVerification(user.id);
        
        // delete otp
        await deleteOTP(otp.id);
        
        return res.status(200).json({message: "User verified successfully"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;