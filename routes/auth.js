var express = require("express");
const uploadMiddleware = require("../middlewares/multer");

// controllers
const {
  login,
  signup,
  confirmEmail,
  uploadTest,
} = require("../controllers/AuthController");

var router = express.Router();

router.post("/signup", signup);
router.get("/email-confirmation/:token", confirmEmail);
router.post("/login", login);
router.post("/upload", uploadTest);

module.exports = router;
