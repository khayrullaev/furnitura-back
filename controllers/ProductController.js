var response = require("../utils/response");
const Product = require("../models/Product");

const getList = async (req, res, next) => {};

const getOneProduct = async (req, res, next) => {};

const getHomePageProducts = async (req, res) => {
  const collections = [
    {
      id: 1,
      url: "https://res.cloudinary.com/dd4vsoahe/image/upload/v1653205673/furnitura/collections/pexels-max-vakhtbovych-6492397_mqxygh.jpg",
    },
    {
      id: 2,
      url: "https://res.cloudinary.com/dd4vsoahe/image/upload/v1653205643/furnitura/collections/pexels-pixabay-271816_yhu1n8.jpg",
    },
  ];
  const popularProducts = await Product.find([{ $sample: { size: 2 } }]);
  const saleProducts = await Product.aggregate([
    { $match: { isSale: true } },
    { $sample: { size: 2 } },
  ]);

  return response.successWithData(res, "Success", {
    collections,
    popularProducts,
    saleProducts,
  });
};

module.exports = {
  getList,
  getOneProduct,
  getHomePageProducts,
};
