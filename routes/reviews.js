//--Packages
const express = require("express");
const router = express.Router({ mergeParams: true });

//--Utils
const catchAsync = require("../utils/catchAsync");

//--Controller
const reviews = require("../controllers/reviews");

//Middleware funcs
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

//--Routes
//Create (reviews)
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

//Destroy (reviews)
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
