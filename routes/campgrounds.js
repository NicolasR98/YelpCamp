//--Packages
const express = require("express");
const router = express.Router();

//--Utils
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");

//--Models / Schema
const Campground = require("../models/campgrounds");
const { campgroundSchema } = require("../schemas");

//Middleware funcs
const { isLoggedIn } = require("../middleware");

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    console.log(msg);
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//--Routes
//Index
router.get("/", async (req, res) => {
  const campgrounds = await Campground.find({}); //Get campgrounds from DB
  res.render("campgrounds/index", { campgrounds });
});

//New
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

//Create
router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res) => {
    if (!req.body.campground)
      throw new ExpressError("Invalid Campground Data", 400);
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Successfully created a campground");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

//Show
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
      .populate("reviews")
      .populate("author");
    console.log(campground);
    if (!campground) {
      req.flash("error", "Campground not found");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
  })
);

//Edit
router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Campground not found");
      return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
  })
);

//Update
router.put(
  "/:id",
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    req.flash("success", "Campground updated");
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

//Destroy
router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

module.exports = router;
