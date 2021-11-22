var express = require("express");
var router = express();
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const User = require("../models/user");

var sess;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;

router.use(
  sessions({
    secret: "secrctekeyfhrgfgrfrty84fwihahar767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);


router.get("/signup", (req, res) => {
  res.render("signup", { page: "signup", user : "notloggedin", });
});

router.post("/signup", (req, res) => {
  const user = new User(req.body);
  sess = req.session;
  sess.userid = user._id;
  sess.user = user.username;
  user
    .save()
    .then((user) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/logout", (req, res) => {
  console.log("destroying session");
  req.session.destroy();
  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("login", { page: "login", user : "notloggedin", });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }, "_id username password")
    .then((user) => {
      if (!user) {

        return res.status(401).send({ message: "Wrong Username or Password" });
      }
      
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          return res
            .status(401)
            .send({ message: "Wrong Username or password" });
        }
        sess = req.session;
        sess.userid = user._id;
        sess.user = user.username;
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
