var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var app = express();
var indexRouter = require("./routes/index");

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore(),
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to Database"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
