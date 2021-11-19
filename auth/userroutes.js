const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../database/usermodel");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/signup", async (req, res) => {
  const body = req.body;
    console.log(body);
  if (!(body.username && body.email && body.password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }

  // createing a new mongoose doc from user data
  const user = new User(body);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.render("index", { page: "loggedin" }));
});

router.post("/login", async (req, res) => {
  const body = req.body;
    // console.log(req);
  const user = await User.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.render("index", { page: "loggedin" });
    } else {
      res.render("login", { page: "login" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});

module.exports = router;
