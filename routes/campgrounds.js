//--Packages
const express = require("express");
const router = express.Router();

//--Utils
const catchAsync = require("../utils/catchAsync");

//--Controller
const campgrounds = require("../controllers/campgrounds");

//Middleware funcs
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

//--Routes
router.route("/")
  //Index
  .get(catchAsync(campgrounds.index))
  //Create
  .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCamp));

//New  
router.get("/new", isLoggedIn, campgrounds.newCamp);

router.route("/:id")
  //Show
  .get(catchAsync(campgrounds.showCamp))
  //Update
  .put(
    isLoggedIn,
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.updateCamp)
  )
  //Delete
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp));

//Edit
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editCamp));

module.exports = router;
