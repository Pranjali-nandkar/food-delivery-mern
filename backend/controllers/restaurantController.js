const mongoose = require("mongoose");
const { Restaurant, Menu } = require("../models/restaurantModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
require("dotenv").config();

const restaurantAdd = async (req, res) => {
  const { name, description, address, image, menus } = req.body;

  if (!name || !description || !address || !image || !menus) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const restaurant = new Restaurant({
      name,
      description,
      address,
      image,
      user_id: req.userId,
    });
    await restaurant.save();

    const menuItems = menus.map((menu) => ({
      name: menu.name,
      price: menu.price,
      restaurant_id: restaurant._id,
    }));
    await Menu.insertMany(menuItems);

    return res.status(200).json({ message: "Restaurant added" });
  } catch (err) {
    console.error("❌ Restaurant add error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const restaurantList = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    const formatted = restaurants.map((r) => ({
      restaurant_id: r._id,
      name: r.name,
      description: r.description,
      address: r.address,
      image: r.image,
      user_id: r.user_id,
    }));
    return res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ Restaurant list error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const restaurantGetByUserId = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ user_id: req.userId });
    if (restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }

    const formattedResults = await Promise.all(
      restaurants.map(async (r) => {
        const menus = await Menu.find({ restaurant_id: r._id });
        return {
          restaurant_id: r._id,
          _id: r._id,
          name: r.name,
          description: r.description,
          address: r.address,
          image: r.image,
          menus: menus.map((m) => ({
            menu_id: m._id,
            _id: m._id,
            name: m.name,
            price: m.price,
          })),
        };
      })
    );

    return res.status(200).json(formattedResults);
  } catch (err) {
    console.error("❌ Restaurant get by user error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const restaurantUpdate = async (req, res) => {
  const { name, description, address, image, menus } = req.body;

  if (!name || !description || !address || !image || !menus) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const restaurant = await Restaurant.findOne({ user_id: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.name = name;
    restaurant.description = description;
    restaurant.address = address;
    restaurant.image = image;
    await restaurant.save();

    await Menu.deleteMany({ restaurant_id: restaurant._id });
    const menuItems = menus.map((menu) => ({
      name: menu.name,
      price: menu.price,
      restaurant_id: restaurant._id,
    }));
    await Menu.insertMany(menuItems);

    return res.status(200).json({ message: "Restaurant updated" });
  } catch (err) {
    console.error("❌ Restaurant update error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const restaurantDelete = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOneAndDelete({ user_id: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    await Menu.deleteMany({ restaurant_id: restaurant._id });
    return res.status(200).json({ message: "Restaurant deleted" });
  } catch (err) {
    console.error("❌ Restaurant delete error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const restaurantCount = async (req, res) => {
  try {
    const count = await Restaurant.countDocuments({ user_id: req.userId });
    return res.status(200).json({ count });
  } catch (err) {
    console.error("❌ Restaurant count error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const restaurantMenu = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid restaurant ID format" });
  }

  try {
    const menus = await Menu.find({ restaurant_id: id });
    const formatted = menus.map((m) => ({
      menu_id: m._id,
      _id: m._id,
      name: m.name,
      price: m.price,
      restaurant_id: m.restaurant_id,
    }));
    return res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ Restaurant menu error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const getOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user_id: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const orders = await Order.find({ restaurant_id: restaurant._id })
      .populate("user_id", "fname lname address")
      .populate("items")
      .sort({ date: -1 });

    const formattedOrders = orders.map((o) => ({
      order_id: o._id,
      date: o.date,
      price: o.price,
      restaurant_name: restaurant.name,
      customer: `${o.user_id.fname} ${o.user_id.lname}`,
      items: o.items.map((i) => ({ name: i.name, price: i.price })),
    }));

    return res.status(200).json(formattedOrders);
  } catch (err) {
    console.error("❌ Get orders error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

const addOrder = async (req, res) => {
  const { price, items } = req.body;
  const restaurant_id = req.params.restaurant_id || req.body.restaurant_id;

  if (!mongoose.Types.ObjectId.isValid(restaurant_id)) {
    return res.status(400).json({ message: "Invalid restaurant ID format" });
  }

  // Ensure all item IDs are valid
  if (items && Array.isArray(items)) {
    const invalidItems = items.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidItems.length > 0) {
      return res.status(400).json({ message: "Invalid item ID format in order" });
    }
  }

  try {
    const order = new Order({
      user_id: req.userId,
      restaurant_id,
      price,
      items,
    });
    await order.save();
    return res.status(200).json({ message: "Order placed successfully", order_id: order._id });
  } catch (err) {
    console.error("❌ Add order error:", err);
    return res.status(500).json({ message: "Error occurred" });
  }
};

module.exports = {
  restaurantAdd,
  restaurantList,
  restaurantGetByUserId,
  restaurantUpdate,
  restaurantDelete,
  restaurantCount,
  restaurantMenu,
  getOrders,
  addOrder,
};
