var express = require("express");
var router = express.Router();
const authenticate = require("../middlewares/authenticate");

// controllers
const { createOrder } = require("../controllers/OrderController");

router.post("/", authenticate, createOrder);

module.exports = router;
