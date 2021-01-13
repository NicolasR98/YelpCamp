const User = require("../models/user");

module.exports.newUser = (req, res) => {
  res.render("users/register");
};

module.exports.createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Yelpcamp");
      res.redirect("/campgrounds");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
};

module.exports.loginUserForm = (req, res) => {
  res.render("users/login");
};

module.exports.loginUser = (req, res) => {
  const username = req.user.username;
  req.flash("success", `Welcome back ${username}!`);
  const redirectUrl = req.session.returnTo || "/campgrounds";
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  req.flash("success", "Logged you out");
  res.redirect("/campgrounds");
};
