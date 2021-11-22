const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const router = express.Router();

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

var session;

const Comment = require("../models/comment.js");
const Post = require("../models/post.js");

router.post("/:postId", (req, res) => {
  const currentUser = req.session.user;
  const comment = new Comment(req.body);
  if (currentUser) {
    comment.author = req.session.userid;

    Post.findById(req.params.postId)
      .then((post) => {
        post.comments.unshift(comment);
        post.save();
        return res.redirect(`/post/${req.params.postId}`);
      })
      .catch((err) => {
        console.error(err);
        return res.status(400).send();
      });
  } else {
    return res.status(401).send();
  }
});

module.exports = router;
