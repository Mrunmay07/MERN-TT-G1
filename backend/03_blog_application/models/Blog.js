import { Schema , model } from "mongoose";

// Schema defination
const commentSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    username : {
        type : String,
        required : true
    },
    text : {
        type : String ,
        required : true
    }
} ,{
    timestamps : true
} )


const blogSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    image : {
        type : String
    },
    likes : {
        type : [{userId : String}]
    },
    comments :[commentSchema]    
})

const Blog = model("Blog" , blogSchema)
export default Blog