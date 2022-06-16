var response = require("../utils/response");

const getList = async (req, res, next) => {};

const getOneProduct = async (req, res, next) => {};

const getHomePageProducts = async (req, res, next) => {
  return response.success(res, req.userId);
};

module.exports = {
  getList,
  getOneProduct,
  getHomePageProducts,
};
