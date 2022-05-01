var response = require("../utils/response");
const seedData = require("../constants/seed_products");
const Product = require("../models/Product");

const uploadTest = async (req, res) => {
  console.log(req.file);
  //   const result = await uploader(req);
  //   console.log(result);

  return response.successWithData(res, "Success", {
    fileUrl: req.file.filename,
  });
};

const insertSeedData = async (req, res) => {
  for (const product of seedData) {
    console.log(`  🛍️ Adding Product: ${product.title}`);
    var newProduct = new Product({
      ...product,
    });
    await newProduct.save();
  }
  console.log(`✅ Seed Data Inserted: ${seedData.length} Products`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );

  const insertedProductList = await Product.find();

  return response.successWithData(res, "Success", {
    insertedProductList,
  });
};

module.exports = {
  uploadTest,
  insertSeedData,
};
