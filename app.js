const express = require("express");
var cookieParser = require("cookie-parser");
var path = require("path");

// Routes
var apiRouter = require("./routes/api");
var indexRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);

app.listen(5000);
