var express = require("express");
var router = express.Router();

// controllers
const { uploadTest, insertSeedData } = require("../controllers/TestController");
const { upload } = require("../utils/uploader");

router.post("/upload", upload.single("image"), uploadTest);
router.post("/seed", insertSeedData);

module.exports = router;
