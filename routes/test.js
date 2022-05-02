var express = require("express");
var router = express.Router();

// controllers
const { uploadTest, insertSeedData } = require("../controllers/TestController");

router.post("/upload", uploadTest);
router.post("/seed", insertSeedData);

module.exports = router;
