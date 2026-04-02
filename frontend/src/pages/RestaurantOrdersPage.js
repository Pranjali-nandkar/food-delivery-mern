import React, { useEffect, useState } from "react";
import RestaurantOrders from "../components/RestaurantOrders";
import API from "../services/api";

const RestaurantOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/restaurants/orders")
      .then(res => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer Orders</h2>
      <RestaurantOrders orders={orders} />
    </div>
  );
};

export default RestaurantOrdersPage;