const express = require("express");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var path = require("path");
require("dotenv").config();
var cors = require("cors");

// Routes
var apiRouter = require("./routes/api");
var indexRouter = require("./routes/index");

// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //don't show the log when it is test
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to Database");
      console.log("App is running ... \n");
    }
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
    process.exit(1);
  });
var db = mongoose.connection;

// Run the app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Listening to requests in port 5000");
});
