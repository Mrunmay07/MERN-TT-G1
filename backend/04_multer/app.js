import express from "express"
import multer from "multer"
import crypto from "node:crypto"
import path from "node:path"

const app = express()

app.use(express.static("uploads"))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const id = crypto.randomUUID()
    const extension = path.extname(file.originalname)
    cb(null, `${id}${extension}`)
  }
})

const upload = multer({ storage: storage })

app.get('/' , (req , res) => {
    res.json({message:"Hello world"})
})

app.post("/upload" , upload.single('profilePic'),(req , res) => {
   console.log(req.body) // Text field
   console.log(req.file) // File
   return res.json({message : "Data mil gaya"})
})

app.listen(7000 , () => {
    console.log('Server started at http://localhost:7000/')
})