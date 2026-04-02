// frontend/src/pages/MenuPage.js
import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import API from "../services/api";
import "./MenuPage.css";

const MenuPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    API.get("/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => {
        console.error("Error fetching restaurants:", err);
        setRestaurants([]);
      });
  }, []);

  return (
    <div className="menu-page">
      <h2 className="menu-heading">Explore Restaurants</h2>
      <div className="restaurant-list">
        {restaurants.length === 0 ? (
          <p>Loading restaurants...</p>
        ) : (
          restaurants.map((r) => (
            <RestaurantCard
              key={r.restaurant_id}
              id={r.restaurant_id}
              name={r.name}
              description={r.description}
              image={r.image}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MenuPage;
