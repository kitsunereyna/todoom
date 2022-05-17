const alert = require("alert");
const cookieParser = require("cookie-parser");
const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();

router
  .get("/profile", (req, res) => {
    const cookies = req.cookies.userAuth;
    const name = cookies?.name;
    res.render("profile", { name: name });
  })
  .post("/profile/logout", (req, res) => {
    res.clearCookie("userAuth");
    res.redirect("/login");
  });

module.exports = router;
