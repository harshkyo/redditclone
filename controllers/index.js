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
  // console.log(session);
  page = "home";
  activity = "loggedin";
  if (session.userid === undefined) {
    activity = "notloggedin";
  }
  const username = session.user;

  Post.find({}).sort({"_id": -1})
    .populate("author")
    .then((posts) => {
      // console.log(posts);
      res.render("index", {
        posts,
        currentUser,
        page,
        activity,
        username, 
      });
    })
});

router.get("/about", function (req, res) {
  const currentUser = req.session.userid;
  session = req.session;
  page = "about";
  activity = "loggedin";
//   console.log(session);
  if (session.userid === undefined) {
    activity = "notloggedin";
  }
  const username = session.user;

  res.render("about", {
      currentUser,
      page,
      activity,
      username,
  })
});

module.exports = router;
