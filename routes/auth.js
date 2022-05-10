var express = require("express");
var router = express.Router();

// controllers
const {
  login,
  signup,
  confirmEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/AuthController");

router.post("/signup", signup);
router.get("/email-confirmation/:token", confirmEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
