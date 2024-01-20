var express = require("express");
const authenticate = require("../middlewares/authenticate");
var router = express.Router();

// controllers
const { info } = require("../controllers/UserController");

router.get("/info", authenticate, info);

module.exports = router;
