const express = require("express");
var path = require("path");
var apiRouter = require("./routes/api");
var indexRouter = require("./routes/index");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);

app.listen(5000);
