import Session from "../models/Session.js"
import User from "../models/User.js"

async function authMiddleware(req , res , next){
    const sid = req.signedCookies.sid

    if(!sid){
        res.json({message : "Please Login first"})
    }

    // Database check -> Session exists ? 
    const session = await Session.findById(sid)

    if(!session){
        return res.json({message : "Invalid Session"})
    }

    // check expiry
    if(session.expiresAt < new Date()){
        await Session.findByIdAndDelete(session._id)

        return res.json({message : "Session expired"})
    }
    
    const user = await User.findById(session.userId)

    if(!user){
        res.json({message : "Session Invalid"})
    }

    req.user = user 

    next()

}

export default authMiddleware