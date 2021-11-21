const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

require("./database/riddit-db");

var indexRouter = require("./controllers/index");
var usersRouter = require("./controllers/user");
var postsRouter = require("./controllers/post");
var commentsRouter = require("./controllers/comment");

const app = express();

const port = 5000;

app.use(cookieParser());

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/post", postsRouter);
app.use("/comment", commentsRouter);
app.use("/user", usersRouter);

app.listen(port, () => console.info(`App listening on port ${port}`));
