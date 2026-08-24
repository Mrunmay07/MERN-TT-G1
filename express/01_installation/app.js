import express from "express"

const app = express()

app.get('/' , (req , res) => {
    res.end("Hello world")
})

app.get('/login' , (req , res) => {
    res.end("Logged In")
})

app.listen(7000 , () => {
    console.log('Server started at http://localhost:7000')
})