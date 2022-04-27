var express = require("express");
var app = express();

// routers
var authRouter = require("./auth");
var testRouter = require("./test");
var productRouter = require("./product");
var userRouter = require("./user");

app.use("/auth/", authRouter);
app.use("/product/", productRouter);
app.use("/user/", userRouter);
app.use("/test/", testRouter);

module.exports = app;
