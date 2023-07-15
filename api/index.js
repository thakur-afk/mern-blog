const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Usermodel = require("./Models/user");
const bcrypt = require("bcrypt");
const Post = require("./Models/Post");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = "khasgyudvyuevdyuvqwed";
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());

app.use(cookieParser());

try {
  mongoose.connect(
    "mongodb+srv://harshitthakur:YVrIEcdHcbCCF1pE@cluster0.pjgjfqu.mongodb.net/?retryWrites=true&w=majority"
  );

  console.log("database is connected");
} catch (error) {
  console.log(error);
}
// console.log(Usermodel);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await Usermodel.create({
      username,
      password: bcrypt.hashSync(password, saltRounds),
    });

    res.json(userDoc);
  } catch (e) {
    // console.log(Usermodel);
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await Usermodel.findOne({ username });
  //res.json(userDoc);

  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});

app.get("/profile", (req, res) => {
  console.log(req.cookies);
  const { token } = req.cookies;
  if (token !== "") {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });

  res.json(postDoc);
});

app.get("/post", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.listen(4000);
//YVrIEcdHcbCCF1pE
