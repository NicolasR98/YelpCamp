//--Packages
const express = require("express");
const passport = require("passport");
const router = express.Router();

//--Utils
const catchAsync = require("../utils/catchAsync");

//--Controller
const users = require("../controllers/users");

//--Routes
//New (user)
router.get("/register", users.newUser);

//Create (User)
router.post("/register", catchAsync(users.createUser));

//Login form
router.get("/login", users.loginUserForm);

//Login logic
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  users.loginUser
);

//Logout
router.get("/logout", users.logoutUser);

module.exports = router;
