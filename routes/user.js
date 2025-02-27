const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.rednderSignupForm)
.post(
  wrapAsync(userController.signUp))


router.route("/login")
.get(userController.renderLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login);
  

//LOgout USer routes..
router.get("/logout",userController.logout);

module.exports = router;
