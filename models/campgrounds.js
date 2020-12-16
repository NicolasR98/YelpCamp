//--Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//--Schema
const campgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
});

//--Exports
module.exports = mongoose.model("Campground", campgroundSchema);
