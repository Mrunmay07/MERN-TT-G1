import express from "express"
import { loginController, logoutAllController, logoutController, registerController } from "../controllers/userContoller.js";
import crypto from "node:crypto"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import 'dotenv/config'
import User from "../models/User.js";
import OTP from "../models/OTP.js";
import Session from "../models/Session.js";


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
    const {email , password} = req.body

    if(!email || !password){
        return res.json({message : "Invalid credentials"})
    }

    const user = await User.findOne({email}) // _id , email , password

    if(!user){
      return res.status(401).json({message : "User not found"})
    }

    // check password
    const isPasswordValid = await bcrypt.compare(password , user.password )

    if(!isPasswordValid){
      return res.json({message : "Invalid credentials"})
    }

    // 4 digit
    const otp = crypto.randomInt(1000 , 10000)

    // otp hash
    const otpHash = await bcrypt.hash(otp.toString() , 12 )

    const expiresAt =  new Date( Date.now() + 5 * 60 * 1000)

    await OTP.deleteMany({email})

    // store otp in database
    await OTP.create({
      email ,
      otpHash,
      expiresAt,
      attempts : 0
    })
    
    // send to email 
    await transporter.sendMail({
    from: process.env.SMTP_USER, // sender address
    to: email ,  // list of recipients
    subject: "Your OTP ", // subject line
    text: `Your OTP is ${otp} . OTP is valid for 5 minutes`, // plain text body
  });

    return res.json({message : "OTP generated"})
})

// OTP verify
router.post("/verify-otp" , async (req , res) => {
    const {email , otp} = req.body

    if(!otp || !email){
      return res.json({message : "OTP not found"})
    }

    const storedOTP = await OTP.findOne({email})

    if(!storedOTP){
      return res.status(401).json({message : "OTP not found or expired"})
    }

    if(storedOTP.expiresAt < new Date() ){
      await OTP.findByIdAndDelete(storedOTP._id)

      return res.json({message : "OTP expired"})
    }

    if(storedOTP.attempts >= 3){
      await OTP.findByIdAndDelete(storedOTP._id)
      return res.json({message : "Too many incorrect attmepts"})
    }

    // compare otp
    const isOTPValid = await bcrypt.compare(storedOTP.otpHash , otp)
    console.log(isOTPValid)

    if(!isOTPValid){
      storedOTP.attempts += 1
      await storedOTP.save()
      return res.json({message : "Invalid OTP"})
    }

    // OTP is one time use -> delete OTP 
    await OTP.findByIdAndDelete(storedOTP._id)

    const user = await User.findOne({
        email
    }) // _id , email , password , createdAt
    
    if(!user){
      return res.status(404).json({message : "Invalid credentials"})
    }

    const session = await Session.create({
      userId : user._id,
      expiresAt :new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })

    res.cookie("sid", session._id , {
      signed : true,
      httpOnly : true
    })

    return res.json({message : "Email verified and Login successful"})

})

export default router