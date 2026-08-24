import express from "express";

const app = express(); // Object

app.use(express.static("public"));

app.get("/", (req, res) => {
 /*  res.send("Hello world") */
 res.setHeader('Content-Type','text/html; utf=8')
  res.end('Hello world')
});

app.get("/holl" , (req , res) =>{
    // cloud -s3 
    res.sendFile(`${import.meta.dirname}/public/hollow.jpg`)
})

app.listen(7000, () => {
  console.log("Server started at http://localhost:7000/");
});
