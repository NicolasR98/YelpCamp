//--Mongoose & passport
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//--Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
userSchema.plugin(passportLocalMongoose);

//--Exports
module.exports = mongoose.model("User", userSchema);
