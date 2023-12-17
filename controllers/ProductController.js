var response = require("../utils/response");
const Product = require("../models/Product");
const Collections = require("../models/Collections");

const getList = async (req, res, next) => {};

const getOneProduct = async (req, res, next) => {};

const getHomePageProducts = async (req, res) => {
  try {
    const collections = await Collections.aggregate().sample(2);
    const popularProducts = await Product.aggregate([{ $sample: { size: 2 } }]);
    const saleProducts = await Product.aggregate([
      { $match: { isSale: true } },
      { $sample: { size: 2 } },
    ]);

    return response.successWithData(res, "Success", {
      collections,
      popularProducts,
      saleProducts,
    });
  } catch (error) {
    return response.error(res, error.message);
  }
};

const getStorePageProducts = async (req, res) => {
  try {
    const products = !!req.query.category
      ? await Product.find({
          category: req.query.category,
        })
      : await Product.aggregate().sample(8);

    return response.successWithData(res, "Success", {
      products,
    });
  } catch (error) {
    return response.error(res, error.message);
  }
};

module.exports = {
  getList,
  getOneProduct,
  getHomePageProducts,
  getStorePageProducts,
};
