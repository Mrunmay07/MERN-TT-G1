import User from "../models/User.js"

async function authMiddleware(req , res , next){
    const uid = req.cookies.uid

    if(!uid){
        res.json({message : "Please Login first"})
    }

    const user = await User.findById(uid)

    if(!user){
        res.json({message : "Session Invalid"})
    }

    req.user = user 

    next()

}

export default authMiddleware