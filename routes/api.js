var express = require("express");
var app = express();

// routers
var authRouter = require("./auth");

app.use("/auth/", authRouter);

module.exports = app;
