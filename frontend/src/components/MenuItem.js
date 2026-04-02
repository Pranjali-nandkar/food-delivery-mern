// src/components/MenuItem.js
import React from "react";

const MenuItem = ({ name, description, price }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-green-600 font-semibold">${price}</p>
    </div>
  );
};

export default MenuItem;
