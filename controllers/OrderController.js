var response = require("../utils/response");
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { products = [], receiver } = req.body;

    const order = new Order({
      userId: req.userId,
      products,
      receiver,
    });
    order.save();

    return response.successWithData(res, "Success");
  } catch (error) {
    return response.error(res, error.message);
  }
};

module.exports = {
  createOrder,
};
