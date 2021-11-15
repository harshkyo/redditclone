const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const app = express();
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
  res.render("index", { text: "Hey" });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/about", (req, res) => {
  res.render("about");
});


app.post("/login", (req, res) => {
  
});

app.post("/signup", (req, res) => {

});

app.listen(port, () => console.info(`App listening on port ${port}`));
