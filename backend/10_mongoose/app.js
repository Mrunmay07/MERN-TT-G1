import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/")
console.log('Database connected')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true,
        min:[18 , "18 se upar wale wale aao"]
    }
}, 
{
    strict : "throw",
    timestamps : true
})

const User = mongoose.model("User" , userSchema)

// Read 
console.log(await User.find())