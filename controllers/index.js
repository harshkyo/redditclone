const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const router = express();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;

router.use(
  sessions({
    secret: "secrctekeyfhrgfgrfrty84fwihahar767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

const Post = require("../models/post.js");

var session;

router.get("/", function (req, res, next) {
  const currentUser = req.session.userid;
  session = req.session;
  page = "home";
  user = "loggedin";
  if (session.userid === undefined) {
    user = "notloggedin";
  }

  Post.find({})
    .populate("author")
    .then((posts) => {
      res.render("index", {
        posts,
        currentUser,
        page,
        user, 
      });
    })
});

router.get("/about", function (req, res) {
  const currentUser = req.session.userid;
  session = req.session;
  page = "about";
  user = "loggedin";
//   console.log(session);
  if (session.userid === undefined) {
    user = "notloggedin";
  }
  res.render("about", {
      currentUser,
      page,
      user
  })
});

module.exports = router;
