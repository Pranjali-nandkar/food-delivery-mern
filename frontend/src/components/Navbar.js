import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // make sure this import exists

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-title">FoodApp</Link>
      <div className="navbar-links">
        <Link to="/" className="nav-button">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/cart" className="nav-button">Cart</Link>
            <Link to="/orders" className="nav-button">Orders</Link>
            <Link to="/profile" className="nav-button">Profile</Link>
            <button onClick={onLogout} className="nav-button logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/register" className="nav-button">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
