const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const mongoose = require("mongoose");
const userRoutes = require("./auth/userroutes");

const app = express();

// const myusername = "user1";
// const mypassword = "mypassword";

// var MongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017/ MongoDatabase";
mongoose
  .connect("mongodb://localhost:27017/demo", { useNewUrlParser: true })
  .then((_) => console.log("Connected to DB"))
  .catch((err) => console.error("error", err));

app.use("/auth", userRoutes);
var session;

// const app = express();
const port = 5000;
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
    secret: "secrctekeyfhrgfgrfrty84fwihahar767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser());

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.render("index", { page: "loggedin" });
  } else res.render("index", { page: "home" });
  
});

app.get("/login", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.render("index", { page: "loggedin" });
  } else res.render("login", { page: "login" });
});

app.get("/signup", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.render("index", { page: "loggedin" });
  } else res.render("signup", { page: "signup" });
});

app.get("/about", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.render("about", { page: "loggedin" });
  } else res.render("about", { page: "about" });
  
});

app.get("/newpost", (req, res) => {
  session = req.session;
  if (session.userid) {
    res.render("index", { page: "loggedin" });
  } else res.render("newpost", { page: "newpost" });
});

// app.post("/login", (req, res) => {
//   if (req.body.username == myusername && req.body.password == mypassword) {
//     session = req.session;
//     session.userid = req.body.username;
//     console.log(req.session);
//     res.render("index", { page: "loggedin" });
//   } else {
//     res.send("Invalid username or password");
//   }
// });

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// app.post("/signup", (req, res) => {
  
// });

app.listen(port, () => console.info(`App listening on port ${port}`));
