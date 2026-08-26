import express from "express"

const app = express()

app.use((req , res , next) => {
    res.setHeader('Access-Control-Allow-Origin' , 'http://127.0.0.1:5500')
    res.setHeader('Access-Control-Allow-Credentials' , 'true')
    next()
})

app.use(express.json())

app.get('/', (req, res) => {
    res.cookie("uid" , "ae321d183u9ff" , {
        sameSite : 'none',
        secure:true,
        httpOnly:true
    })
    console.log(req.headers.cookie)
    res.json({message : "Hello world"})
})

app.listen(7000, () => {
    console.log('Server started at http://localhost:7000')
})