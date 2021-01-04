//--Packages
const express = require("express");
const router = express.Router({ mergeParams: true });

//--Utils
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");

//--Models / Schema
const Campground = require("../models/campgrounds");
const Review = require("../models/review");
const { reviewSchema } = require("../schemas");

//Middleware func
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    console.log(msg);
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

//--Routes
//Create (reviews)
router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Review submited")
    res.redirect(`/campgrounds/${id}`);
  })
);

//Destroy (reviews)
router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted")
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
