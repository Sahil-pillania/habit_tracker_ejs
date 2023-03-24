const express = require("express");
const router = express.Router();

//---------model----------
const User = require("../models/User");

//---------Login Page----------//
router.get("/login", (req, res) => res.render("login"));

//---------Register Page----------
router.get("/register", (req, res) => res.render("register"));

//---------Register Handle----------
router.post("/register", (req, res) => {
  const { name, email } = req.body;
  //   console.log("registering", name, email);

  if (!name || !email) {
    return res.redirect("/users/register");
  }
  //---------Validation Passed----------
  User.findOne({ email: email }).then((user) => {
    if (user) {
      //---------User already exists----------
      console.log("User already exists");
      return res.json({ msg: "Email ID already exists" });
    } else {
      //   console.log("Creating");
      const newUser = new User({
        name,
        email,
      });

      //---------Save user----------//
      newUser
        .save()
        .then((user) => {
          res.redirect("/users/login");
        })
        .catch((err) => console.log(err));
    }
  });
});

//---------Login Handle----------//
router.post("/login", (req, res) => {
  const { name, email } = req.body;

  //---------Checking if user exists----------//
  User.findOne({
    email: email,
  }).then((user) => {
    if (!user) {
      console.log("no user found");
      return res.json({ msg: "User not found" });
    }
    //---------Redirecting with email data----------
    else {
      res.redirect(`/dashboard?user=${user.email}`);
    }
  });
});

//---------Logout----------
router.get("/logout", (req, res) => {
  // req.logout();

  res.redirect("/users/login");
});

module.exports = router;
