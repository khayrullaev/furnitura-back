var express = require("express");
var router = express.Router();

// controllers
const {
  login,
  signup,
  confirmEmail,
} = require("../controllers/AuthController");

router.post("/signup", signup);
router.get("/email-confirmation/:token", confirmEmail);
router.post("/login", login);

module.exports = router;
