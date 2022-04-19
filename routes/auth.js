var express = require("express");

// controllers
const {
  login,
  signup,
  confirmEmail,
} = require("../controllers/AuthController");

var router = express.Router();

router.post("/signup", signup);
router.get("/email-confirmation/:token", confirmEmail);
router.post("/login", login);

module.exports = router;
