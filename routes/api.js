var express = require("express");
var app = express();

// routers
var authRouter = require("./auth");
var testRouter = require("./test");

app.use("/auth/", authRouter);
app.use("/test/", testRouter);

module.exports = app;
