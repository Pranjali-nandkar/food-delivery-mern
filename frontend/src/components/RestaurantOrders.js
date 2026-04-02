// ✅ Correct export setup
import React from "react";

const RestaurantOrders = ({ order }) => (
  <div className="border p-4 mb-4 rounded">
    <h3>Order #{order.order_id} - {order.customer}</h3>
    <p>Date: {new Date(order.date).toLocaleString()}</p>
    <p>Total: ₹{order.price}</p>
    <ul className="list-disc list-inside">
      {order.items.map((item, index) => (
        <li key={index}>{item.item_name} - ₹{item.item_price}</li>
      ))}
    </ul>
  </div>
);

export default RestaurantOrders; // ✅ Must be default export
