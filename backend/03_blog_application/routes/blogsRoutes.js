import express from "express";
import crypto from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "path";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import Blog from "../models/Blog.js";
import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config"

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const id = crypto.randomUUID();
    const extension = path.extname(file.originalname);
    cb(null, `${id}${extension}`);
  },
});

const upload = multer({ storage: storage });

// READ
router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  return res.status(200).json(blogs);
});

// Dynamic route
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  return res.status(200).json(blog);
});

// CREATE
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are requried" });
  }

  let imageUrl = null;

  if(req.file){
     const uploadResult = await cloudinary.uploader
       .upload(
           req.file.path, {
               folder : "blogs-images"
           }
       )
    
      imageUrl = uploadResult.secure_url
    
  }
 
  await Blog.create({
    title,
    content,
    author,
    userId: req.user._id,
    image: imageUrl,
  });

  return res.status(201).json({message : "Blog Created"})
});

// Blog UPdate -> PATCH
router.patch("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  
  const updatedBlog = await Blog.findOneAndUpdate(
    {
      _id : id,
      userId : req.user._id
    },
    req.body ,
    {
      new : true,
      runValidators : true
    }
  )

  if (!updatedBlog) {
    return res.status(404).json({ message: "Blog not found or unauthorized" });
  }

  return res.status(200).json({message : "Blog updated successfully"})
  
});

// Like
router.post("/:id/likes", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const alreadyLiked = blog.likes.find((like) => {
    return like.userId === req.user.id;
  });

  if (alreadyLiked) {
    return res.json({ message: "Already liked" });
  }

  blog.likes.push({
    userId: req.user._id
  });

  return res.status(200).json({message : "Blog liked"})
});

// Comment
router.post("/:id/comment", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if(!text){
    return res.status(400).json({message : "Comment text is required"})
  } 

  const updatedBlog = await Blog.findByIdAndUpdate(
    id , 
    {
      $push : {
        comments : {
          userId : req.user._id,
          username : req.user.name,
          text
        }
      }
    },
    {
      new : true
    }
  )

  if(!updatedBlog){
    return res.status(404).json({message : "Blog not found"})
  }

  return res.status(201).json({message :  "Comment added" , comments : updatedBlog.comments})
});

// Blog Delete
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  
  const deletedBlog = await Blog.findOneAndDelete({
    _id : id ,
    userId : req.user._id
  })

  if(!deletedBlog){
    return res.status(404).json({message : "Blog not found or unauthorized"})
  }

  return res.status(200).json({message : "Blog deleted successfully" , blog : deletedBlog})

  
});

export default router;
