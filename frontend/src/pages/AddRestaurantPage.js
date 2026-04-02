import React from "react";
import RestaurantForm from "../components/RestaurantForm";
import API from "../services/api";

const AddRestaurantPage = () => {
  const handleSubmit = (data) => {
    API.post("/restaurants/add", data)
      .then(() => alert("Restaurant added successfully!"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Restaurant</h2>
      <RestaurantForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddRestaurantPage;