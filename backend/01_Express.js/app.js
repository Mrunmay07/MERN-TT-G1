import express from "express";

const app = express(); // Object

// Global middleware
app.use(
  // Middleware 1
  (req, res, next) => {
    console.log("Middleware 1 called");
    next();
    res.end("Middleware 1");
  },

  // Middleware 2
  (req, res, next) => {
    console.log("middleware 2 called");
    res.write("Middleware 2");
    next();
  }
);

app.get("/", (req, res) => {
  res.end("Hello world");
});

app.get(
  "/login",
  (req, res) => {
    res.write("Logged In");
  },
);

app.get(
  "/register",
  (req, res) => {
    res.end("User registered successfully");
  },
);



app.listen(7000, () => {
  console.log("Server started at http://localhost:7000/");
});
