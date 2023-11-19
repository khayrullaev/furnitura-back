var express = require("express");
var app = express();

// routers
var authRouter = require("./auth");
var testRouter = require("./test");
var productRouter = require("./product");
var userRouter = require("./user");
var collectionsRouter = require("./collections");

app.use("/auth/", authRouter);
app.use("/product/", productRouter);
app.use("/user/", userRouter);
app.use("/collections", collectionsRouter);
app.use("/test/", testRouter);

module.exports = app;
