import crypto from "node:crypto"
import User from "../models/User.js";
import bcrypt from "bcrypt"
import Session from "../models/Session.js";

export async function registerController(req , res){
  const {name , email , password} = req.body

  if(!name || !email || !password){
    return res.json({message : "All field are required to register"})
  }

  const exitingUser = await User.findOne({email})

  // hash a password
  const hashedPassword = await bcrypt.hash(password ,12 )

  if(exitingUser){
    return res.json({message : "User already exists"})
  }

  await User.create({
    name,
    email ,
    password : hashedPassword
  })

  return res.status(201).json({message : "User registered"})

}

export async function loginController(req , res){
    const {email , password} = req.body
    
    const user = await User.findOne({
        email
    }) // _id , email , password , createdAt
    
    if(!user){
      return res.status(404).json({message : "Invalid credentials"})
    }

    const isPasswordValid = await bcrypt.compare(password , user.password)

    if(!isPasswordValid){
      return res.json({message : "INvalid credentials"})
    }

    const session = await Session.create({
      userId : user._id,
      expiresAt :new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })

    res.cookie("sid", session._id , {
      signed : true,
      httpOnly : true
    })

    return res.status(200).json({message : "User logged in"})
}

export function logoutController(req , res){
    res.clearCookie("uid")
    return res.status(201).json({message : "Logged out"})
}



