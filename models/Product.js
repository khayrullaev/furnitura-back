const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: false,
  },
  isSale: {
    type: Boolean,
    required: false,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  information: {
    size: String,
    material: String,
    colors: [String],
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
