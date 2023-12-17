const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      productId: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: Schema.Types.String,
    default: "ORDERED",
  },
  orderDate: { type: Date, default: Date.now },
  receiver: {
    name: String,
    phone: String,
    address: String,
    zipcode: String,
  },
  cancellationDate: Date,
  shipmentDate: Date,
  deliveryDate: Date,
});

module.exports = mongoose.model("Order", orderSchema);
