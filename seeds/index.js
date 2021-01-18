//--Mongoose pkg
const mongoose = require("mongoose");

//--Data
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

//--Campground Model
const Campground = require("../models/campgrounds");

//--Mongoose Database connection
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
//Database connection error handling
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//--Functions
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]; //Retrieves a random data of an array

//--Seed database
const seedDB = async () => {
  await Campground.deleteMany({}); //Deletes all campgrounds in Campgrounds collection
  //Loops 50 times to make random campground data
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1001);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "5ff8c379d6835e1b286ebde8",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url:
            "https://res.cloudinary.com/dlpp6b0kt/image/upload/v1610721551/YelpCamp/fk0xvghjaocr0pvvaurt.jpg",
          filename: "YelpCamp/fk0xvghjaocr0pvvaurt",
        },
        {
          url:
            "https://res.cloudinary.com/dlpp6b0kt/image/upload/v1610721552/YelpCamp/s2ll8claeyhagrncviv1.jpg",
          filename: "YelpCamp/s2ll8claeyhagrncviv1",
        },
      ],
      description: "A beatiful place!",
      price,
    });
    await camp.save();
  }
};

//Load the db with seed information and when it's done, close connection
seedDB().then(() => {
  db.close();
});
