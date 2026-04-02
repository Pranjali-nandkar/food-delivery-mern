
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import API from "../services/api";
import "./RestaurantMenuPage.css";

const RestaurantMenuPage = () => {
  const { restaurantName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);

  const imageMap = {
    "Margherita Pizza": "/pizza.jpg",
    "Veggie Supreme Pizza": "/veggies.jpg",
    "Masala Lemonade": "/lemonade.jpg",
    "Cheese Burst Pizza": "/cheese.jpg",
    "Cheese Bread": "/Bread.jpg",
    "Paneer Butter Masala": "/buttermasala.jpg",
    "Veg Biryani": "/biryani.jpg",
    "Manchurian Rice": "/Manchurian.jpg",
    "Fried Rice": "/Rice.jpg",
    "Paneer Tikka Appetizer": "/Paneer.jpg",
    "Mysore Masala Dosa": "/Dosa.jpg",
    "Hakka Noodles": "/noodles.jpg",
    "Manchurian Gravy": "/gravy.jpg",
    "Veg Manchow Soup": "/soup.jpg",
    "Chinese Seafood": "/Seafood.jpg"
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Fetch all restaurants and find the one matching the name slug
    API.get("/restaurants")
      .then((res) => {
        const found = res.data.find(r => r.name.toLowerCase().replace(/\s+/g, '-') === restaurantName);
        if (found) {
          setRestaurant(found);
          return API.get(`/restaurants/${found.restaurant_id}/menu`);
        }
        throw new Error("Restaurant not found");
      })
      .then((res) => {
        if (res) {
          const menuWithImages = res.data.map((item) => ({
            ...item,
            image: imageMap[item.name] || "/placeholder.jpg",
          }));
          setMenu(menuWithImages);
        }
      })
      .catch((err) => console.error("❌ Error loading menu:", err));
  }, [restaurantName]);

  const handleAdd = (item) => {
    // Ensure the menu_id and restaurant_id are correctly passed for MongoDB
    const cartItem = {
      menu_id: item.menu_id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    };
    
    // Pass the actual restaurant object
    const restaurantData = restaurant || {
      restaurant_id: item.restaurant_id,
      name: restaurantName.replace("-", " ")
    };

    addToCart(cartItem, restaurantData);
    navigate("/cart");
  };

  return (
    <div className="restaurant-menu-page">
      <h2 className="restaurant-title">
        Menu - {restaurant?.name || restaurantName.replace("-", " ")}
      </h2>
      <div className="menu-items">
        {menu.length === 0 ? (
          <p>No items found for this restaurant.</p>
        ) : (
          menu.map((item) => (
            <div key={item.menu_id} className="menu-card">
              <img
                src={item.image}
                alt={item.name}
                className="menu-card-image"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
              <div className="menu-card-content">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price}</p>
                <button onClick={() => handleAdd(item)}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantMenuPage;
