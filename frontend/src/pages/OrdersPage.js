import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const allowedRestaurants = ["Pizza Hut", "Sai Sagar", "Ming Yang"];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No successful orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={order.order_id} className="order-box">
            <h3>
              Order #{order.display_id}
              {allowedRestaurants.includes(order.restaurant_name) &&
                ` - ${order.restaurant_name}`}
            </h3>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.date).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Customer:</strong> {order.customer}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <div className="order-items">
              {order.items.map((item, i) => (
                <p key={i}>
                  {item.item_name} - ₹
                  {isNaN(item.item_price)
                    ? "N/A"
                    : parseFloat(item.item_price).toFixed(2)}
                </p>
              ))}
            </div>
            <p className="order-total">
              <strong>Total:</strong> ₹
              {isNaN(order.price)
                ? "N/A"
                : parseFloat(order.price).toFixed(2)}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
