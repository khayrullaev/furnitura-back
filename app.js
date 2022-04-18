const express = require("express");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
require("dotenv").config();
var cors = require("cors");
var path = require("path");
var response = require("./utils/response");

// Routes
var apiRouter = require("./routes/api");
var indexRouter = require("./routes/index");

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

// throw 404 if URL not found
app.all("*", function (req, res) {
  return response.notFound(res, "Not found");
});

// throw unauthorized if UnauthorizedError
app.use((err, req, res) => {
  if (err.name == "UnauthorizedError") {
    return response.unauthorized(res, err.message);
  }
});

// Run the server on PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Listening to requests in port: ", PORT);
});

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
