import React from "react";

const OrderCard = ({ order }) => (
  <div className="border p-4 rounded shadow mb-4">
    <h3 className="font-semibold">Order #{order.order_id} - {order.restaurant_name}</h3>
    <p>Date: {new Date(order.date).toLocaleString()}</p>
    <p>Status: {order.status}</p>
    <p>Total: ₹{order.price}</p>
    <ul className="list-disc list-inside mt-2">
      {order.items.map((item, idx) => (
        <li key={idx}>{item.item_name} - ₹{item.item_price}</li>
      ))}
    </ul>
  </div>
);

export default OrderCard;