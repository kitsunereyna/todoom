const alert = require("alert");
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

router
  .get("/login", (req, res) => {
    const cookies = req.cookies.userAuth;
    if (cookies) res.redirect("/profile");

    res.render("login");
  })
  .post("/login/auth", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const timeFirst = Date.now();

    try {
      const user = await User.findOne({
        userEmail: email,
      });

      if (user) {
        const isValid = await bcrypt.compare(password, user.userPassword);

        if (isValid) {
          res.cookie(
            `userAuth`,
            { name: user.userName, email: email, timeFirst: timeFirst },
            { maxAge: 7_200_000 }
          );

          user.userEntry = timeFirst;
          user.save();

          if(user.isAdmin == true){
            res.redirect("/admin");
          } else res.redirect("/zodiac");
        } else {
          alert("Incorrect password");
          res.redirect("/login");
        }
      } else alert("No registered account");
    } catch (error) {
      alert(error);
      res.redirect("/login");
    }
  });

module.exports = router;
