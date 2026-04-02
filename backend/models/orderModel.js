const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "successful" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
