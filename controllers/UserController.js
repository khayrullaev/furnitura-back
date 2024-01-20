const User = require("../models/User");

// utils
var response = require("../utils/response");

const info = async (req, res) => {
  if (req.userId) {
    const user = await User.findById(req.userId);
    return response.successWithData(res, "User info", user);
  } else {
    return response.error(res, "User not valid");
  }
};

const editInfo = async (req, res) => {};

const addToCart = async (req, res) => {};

const removeFromCart = async (req, res) => {};

module.exports = {
  info,
  editInfo,
  addToCart,
  removeFromCart,
};
