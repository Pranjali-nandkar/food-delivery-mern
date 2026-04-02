const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  image: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
const Menu = mongoose.model("Menu", menuSchema);

module.exports = { Restaurant, Menu };
