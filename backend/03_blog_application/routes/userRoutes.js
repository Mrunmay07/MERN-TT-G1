import express from "express"
import { loginController, logoutAllController, logoutController, registerController } from "../controllers/userContoller.js";
import crypto from "node:crypto"
import nodemailer from "nodemailer"
import 'dotenv/config'


const router = express.Router()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// register
router.post("/register" , registerController )

// login
router.post("/login" , loginController)

// logout
router.post("/logout" ,logoutController)

// logout all devices
router.post("/logout-all"  , logoutAllController)

// OTP generate
router.post("/request-otp" , async (req , res) => {
    const {email} = req.body

    if(!email){
        return res.json({message : "Email is required for OTP"})
    }

    // 4 digit
    const otp = crypto.randomInt(100000 , 1000000)
    
    // send to email 
    await transporter.sendMail({
    from: process.env.SMTP_USER, // sender address
    to: email ,  // list of recipients
    subject: "Your OTP ", // subject line
    text: `Your OTP is ${otp}`, // plain text body
  });

    return res.json({message : "OTP generated"})
})

export default router