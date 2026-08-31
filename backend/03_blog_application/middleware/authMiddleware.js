import usersData from "../usersDB.json" with {type:"json"}

function authMiddleware(req , res , next){
    const uid = req.cookies.uid

    if(!uid){
        res.json({message : "Please Login first"})
    }

    const user = usersData.find((user) => user.id === uid )

    if(!user){
        res.json({message : "Session Invalid"})
    }

    req.user = user 

    next()

}

export default authMiddleware