import express from "express";
import blogsData from "./blogsDB.json" with { type: "json" };
import crypto from "node:crypto";
import { writeFile } from "node:fs/promises"
import path from "path"
import multer from "multer"

const app = express(); // Object

app.use(express.json());

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

app.post("/blogs", upload.single("image") ,async (req, res) => {
  const { title, content, author } = req.body;
  console.log(req.body)
  if (!title || !content || !author) {
    return res.status(400).json({ message: "All fields are requried" });
  }

  const newBlog = {
    id: crypto.randomUUID(),
    title,
    content,
    author,
    image: req.file ? `/uploads/` : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  blogsData.push(newBlog);

  try {
    await writeFile("./blogsDB.json", JSON.stringify(blogsData));
    return res.status(201).json({ message: "Blog created successfully" });
  } catch (err) {
    return res.status(401).json({message : err})
  }
});

app.listen(7000, () => {
  console.log("Server started at http://localhost:7000/");
});
