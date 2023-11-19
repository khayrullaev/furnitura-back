var express = require("express");
var router = express.Router();
const authenticate = require("../middlewares/authenticate");

// controllers
const { getList } = require("../controllers/CollectionsController");

router.get("/list", authenticate, getList);

module.exports = router;
