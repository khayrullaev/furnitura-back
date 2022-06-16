var express = require("express");
var router = express.Router();
const authenticate = require("../middlewares/authenticate");

// controllers
const {
  getList,
  getHomePageProducts,
} = require("../controllers/ProductController");

router.get("/list", authenticate, getList);
router.get("/home", authenticate, getHomePageProducts);

module.exports = router;
