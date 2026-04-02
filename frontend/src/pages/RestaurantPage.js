import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import API from "../services/api";

const RestaurantPage = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    API.get(`/restaurants/${id}/menu`)
      .then(res => setMenu(res.data))
      .catch(() => setMenu([]));
  }, [id]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      {menu.map(item => (
        <MenuItem key={item.menu_id} name={item.name} price={item.price} />
      ))}
    </div>
  );
};

export default RestaurantPage;