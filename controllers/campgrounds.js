const Campground = require("../models/campgrounds");

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({}); //Get campgrounds from DB
  res.render("campgrounds/index", { campgrounds });
};

module.exports.newCamp = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createCamp = async (req, res) => {
  if (!req.body.campground)
    throw new ExpressError("Invalid Campground Data", 400);
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  req.flash("success", "Successfully created a campground");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCamp = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!campground) {
    req.flash("error", "Campground not found");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

module.exports.editCamp = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Campground not found");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
};

module.exports.updateCamp = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  req.flash("success", "Campground updated");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCamp = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
};
