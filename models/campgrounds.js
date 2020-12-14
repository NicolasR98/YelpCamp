//--Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//--Schema
const campgroundSchema = new Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

//--Exports
module.exports = mongoose.model("Campground", campgroundSchema);
