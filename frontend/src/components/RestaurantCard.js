import { useNavigate } from "react-router-dom";
import "./RestaurantCard.css";

const RestaurantCard = ({ id, name, description, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const formattedName = name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/menu/${formattedName}`);
  };

  return (
    <div className="restaurant-card" onClick={handleClick}>
      <img
        src={image || "https://via.placeholder.com/300x200"}
        alt={name}
        className="restaurant-image"
      />
      <div className="restaurant-info">
        <h2 className="restaurant-name">{name}</h2>
        <p className="restaurant-description">{description}</p>
        <button className="view-menu-btn">View Menu & Order</button>
      </div>
    </div>
  );
};

export default RestaurantCard;
