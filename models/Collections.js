const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  views: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model("Collections", collectionsSchema);
