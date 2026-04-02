import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./components/CartContext"; // ✅ Cart context

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MenuPage from "./pages/MenuPage";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";
import CartPage from "./pages/CartPage";
import RestaurantPage from "./pages/RestaurantPage";
import OrdersPage from "./pages/OrdersPage";
import RestaurantOrdersPage from "./pages/RestaurantOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import AddRestaurantPage from "./pages/AddRestaurantPage";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleRegister = (userData) => {
    console.log("User registered:", userData);
    window.location.href = "/login";
  };

  return (
    <CartProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:restaurantName" element={<RestaurantMenuPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Protected Routes */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute isAuthenticated={isLoggedIn}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/restaurant-orders"
            element={
              <ProtectedRoute isAuthenticated={isLoggedIn}>
                <RestaurantOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isLoggedIn}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-restaurant"
            element={
              <ProtectedRoute isAuthenticated={isLoggedIn}>
                <AddRestaurantPage />
              </ProtectedRoute>
            }
          />

          {/* Optional */}
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
