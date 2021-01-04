//--Packages / Modules
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

//--Utils
const ExpressError = require("./utils/ExpressError");

//--Router
const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");

//--Database
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//--Configs
app.engine("ejs", ejsMate); //Tell express to use ejsMate instead ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

//-- Router Routes
app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

//Home
app.get("/", (req, res) => {
  res.render("home");
});

//--Error handling
//404
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

//Handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong";
  res.status(statusCode).render("error", { err });
});

//--Server Listener
app.listen(3000, () => {
  console.log("Server started at port 3000");
});
