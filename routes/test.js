var express = require("express");
var router = express.Router();

// controllers
const { uploadTest } = require("../controllers/TestController");
const { upload } = require("../utils/uploader");

router.post("/upload", upload.single("image"), uploadTest);

module.exports = router;
