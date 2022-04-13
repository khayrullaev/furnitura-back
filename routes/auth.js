var express = require("express");

// controllers
const { login } = require("../controllers/AuthController");

var router = express.Router();

router.get("/login", login);

module.exports = router;
