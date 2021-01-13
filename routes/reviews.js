//--Packages
const express = require("express");
const router = express.Router({ mergeParams: true });

//--Utils
const catchAsync = require("../utils/catchAsync");

//--Models
const Campground = require("../models/campgrounds");
const Review = require("../models/review");

//Middleware func
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

//--Routes
//Create (reviews)
router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Review submited");
    res.redirect(`/campgrounds/${id}`);
  })
);

//Destroy (reviews)
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted");
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
