var express = require("express");
var router = express.Router();

// controllers
const {
  uploadTest,
  insertSeedData,
  insertCollectionsSeedData,
} = require("../controllers/TestController");

router.post("/upload", uploadTest);
router.post("/seed", insertSeedData);
router.post("/collections-seed", insertCollectionsSeedData);

module.exports = router;
