const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  profileImg: {
    url: String,
    publicId: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  roles: [{ type: "String", enum: ["ADMIN", "USER"], default: ["USER"] }],
  forgotPasswordOtp: Number,
  forgotPasswordExpires: Date,
  likedProducts: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
