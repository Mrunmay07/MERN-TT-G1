import crypto from "node:crypto"
import User from "../models/User.js";

export async function registerController(req , res){
  const {name , email , password} = req.body

  if(!name || !email || !password){
    return res.json({message : "All field are required to register"})
  }

  const exitingUser = await User.findOne({email})

  // hash a password
  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

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

    const recalculatedPasswordHash = crypto.createHash("sha256").update(password).digest("hex")

    if(user.password !== recalculatedPasswordHash){
      return res.json("Ivalid credentials")
    }

    res.cookie("uid", user._id , {
      signed : true
    })

    return res.status(200).json({message : "User logged in"})
}

export function logoutController(req , res){
    res.clearCookie("uid")
    return res.status(201).json({message : "Logged out"})
}



