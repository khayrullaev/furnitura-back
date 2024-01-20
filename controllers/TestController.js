var response = require("../utils/response");
const { seedData, collectionsSeedData } = require("../constants/seed_products");
const Product = require("../models/Product");
const Collections = require("../models/Collections");

const uploadTest = async (req, res) => {
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

const insertCollectionsSeedData = async (req, res) => {
  for (const collection of collectionsSeedData) {
    console.log(`  🛍️ Adding collection: ${collection.title}`);
    var newCollection = new Collections({
      ...collection,
    });
    await newCollection.save();
  }
  console.log(`✅ Seed Data Inserted: ${seedData.length} Collections`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );

  const insertedCollections = await Collections.find();

  return response.successWithData(res, "Success", {
    insertedCollections,
  });
};

module.exports = {
  uploadTest,
  insertSeedData,
  insertCollectionsSeedData,
};
