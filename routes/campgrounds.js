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
//Index
router.get("/", catchAsync(campgrounds.index));

//New
router.get("/new", isLoggedIn, campgrounds.newCamp);

//Create
router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(campgrounds.createCamp)
);

//Show
router.get("/:id", catchAsync(campgrounds.showCamp));

//Edit
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editCamp));

//Update
router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(campgrounds.updateCamp)
);

//Destroy
router.delete("/:id", isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp));

module.exports = router;
