import express from "express";
import blogsData from "./blogsDB.json" with { type: "json" };

const app = express(); // Object

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.get("/blogs", (req, res) => {
  res.json(blogsData);
});

// Dynamic route
app.get("/blogs/:id", (req, res) => {
  const { id } = req.params;
  console.log(typeof id)
  const blog = blogsData.find((blog) => blog.id === id);
  res.json(blog);
});

app.listen(7000, () => {
  console.log("Server started at http://localhost:7000/");
});
