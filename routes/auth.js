var express = require("express");

// controllers
const { login, signup } = require("../controllers/AuthController");

var router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
