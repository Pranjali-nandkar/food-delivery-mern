import React, { useState } from "react";

const RestaurantForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({ name: "", description: "", address: "", image: "", ...initialData });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Restaurant Name" />
      <input name="description" value={form.description} onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Description" />
      <input name="address" value={form.address} onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Address" />
      <input name="image" value={form.image} onChange={handleChange} className="w-full p-2 border mb-2" placeholder="Image URL" />
      <button type="submit" className="bg-blue-600 text-white p-2 w-full">Save Restaurant</button>
    </form>
  );
};

export default RestaurantForm;