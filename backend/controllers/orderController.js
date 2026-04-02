const Order = require("../models/orderModel");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.userId })
      .populate("restaurant_id", "name")
      .populate("user_id", "fname lname address")
      .populate("items")
      .sort({ date: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    const formatted = orders.map((order, index) => ({
      order_id: order._id,
      display_id: index + 1,
      date: order.date,
      price: order.price,
      restaurant_name: order.restaurant_id?.name || "Unknown Restaurant",
      status: order.status,
      customer: order.user_id ? `${order.user_id.fname} ${order.user_id.lname}` : "Unknown Customer",
      address: order.user_id?.address || "No Address",
      items: (order.items || []).map((item) => ({
        item_name: item?.name || "Unknown Item",
        item_price: item?.price || 0,
      })),
    }));

    return res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ Get orders error:", err);
    return res.status(500).json({ message: "Error occurred", error: err });
  }
};

module.exports = { getOrders };
