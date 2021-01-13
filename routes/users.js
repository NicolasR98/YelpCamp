//--Packages
const express = require("express");
const passport = require("passport");
const router = express.Router();

//--Utils
const catchAsync = require("../utils/catchAsync");

//--Controller
const users = require("../controllers/users");

//--Routes
router.route("/register")
  //New (user)
  .get(users.newUser)
  //Create (User)
  .post(catchAsync(users.createUser));

router.route("/login")
  //Login form
  .get(users.loginUserForm)
  //Login logic
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.loginUser
  );

//Logout
router.get("/logout", users.logoutUser);

module.exports = router;
