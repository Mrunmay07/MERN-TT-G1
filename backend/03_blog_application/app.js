import express from "express";
import blogsData from "./blogsDB.json" with { type: "json" };
import usersData from "./usersDB.json" with { type: "json" };
import crypto from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "path";
import multer from "multer";

const app = express(); // Object

app.use(express.json());

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
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.get("/blogs", (req, res) => {
  res.json(blogsData);
});

// Dynamic route
app.get("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const blog = blogsData.find((blog) => blog.id === id);
  res.json(blog);
});

// CREATE 
app.post("/blogs", upload.single("image"), async (req, res) => {
  const { title, content, author } = req.body;
  console.log(req.body);
  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are requried" });
  }

  const newBlog = {
    id: crypto.randomUUID(),
    title,
    content,
    author,
    like: 0,
    comment: [],
    image: req.file ? `/uploads/` : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  blogsData.push(newBlog);

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    return res.status(401).json({ message: err });
  }
});

// Blog UPdate -> PATCH
app.patch("/blogs/:id", async (req, res) => {
  const { id } = req.params; // id = 5b505468-0b7a-4501-b8d0-49f8a2ca7d3b
  const blog = blogsData.find((blog) => blog.id === id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const { title, content, author } = req.body;

  if (title !== undefined) blog.title = title;
  if (content !== undefined) blog.content = content;
  if (author !== undefined) blog.author = author;

  blog.updatedAt = new Date().toISOString();

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Blog updated" });
  } catch (err) {
    return res.json({ message: "Blog failed to update" });
  }
});

// Like
app.post("/blogs/:id/likes", async (req, res) => {
  const { id } = req.params;
  const blog = blogsData.find((blog) => blog.id === id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  blog.like += 1;

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Blog Liked" });
  } catch (err) {
    return res.status(401).json({ message: "Failed to Like on a blog" });
  }
});

// Comment
app.post("/blogs/:id/comment", async (req, res) => {
  const { id } = req.params;
  const blog = blogsData.find((blog) => blog.id === id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const { user, text } = req.body;

  const newComment = {
    id: crypto.randomUUID(),
    user,
    text,
    createdAt: new Date().toISOString(),
  };

  blog.comment.push(newComment);

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Comment added" });
  } catch (err) {
    return res.json({ message: " failed to comment" });
  }
});

// Blog Delete
app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const blogIndex = blogsData.findIndex((blog) => blog.id === id); // 4

  if (!blogIndex) {
    return res.status(404).json({ message: "Blog not found" });
  }

  blogsData.splice(blogIndex, 1);

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData, null, 2));
    return res.status(201).json({ message: "Blog deleted" });
  } catch (err) {
    return res.json({ message: " Failed to Delete a blog" });
  }
});


// register
app.post("/users/register" , async (req , res) => {
  const {username , email , password} = req.body

  if(!username || !email || !password){
    return res.json({message : "All field are required to register"})
  }

  const user = {
    id : crypto.randomUUID(),
    username ,
    email,
    password,
    createdAt : new Date().toISOString(),
    updatedAt : new Date().toISOString()
  }
  usersData.push(user)

   try {
    await writeFile("./usersDB.json", JSON.stringify(usersData, null, 2));
    return res.status(201).json({ message: "User registered" });
  } catch (err) {
    return res.json({ message: " failed to register" });
  }

})

// login
app.post("/users/login" , (req , res) => {
    const {email , password} = req.body

    const user = usersData.find((user) => user.email === email && user.password === password)

    if(!user){
      return res.status(404).json({message : "Invalid credentials"})
    }

    return res.status(200).json({message : "User logged in"})
})



app.listen(7000, () => {
  console.log("Server started at http://localhost:7000/");
});
