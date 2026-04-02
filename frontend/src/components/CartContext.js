import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // grouped by restaurant

  const addToCart = (item, restaurant) => {
    const cleanedItem = {
      ...item,
      price: Number(
        typeof item.price === "string"
          ? item.price.replace(/[^0-9.]/g, "")
          : item.price
      ),
    };

    setCart((prevCart) => {
      const restaurantIndex = prevCart.findIndex(
        (r) => r.restaurant_id === restaurant.restaurant_id
      );

      if (restaurantIndex > -1) {
        const existingRestaurant = { ...prevCart[restaurantIndex] };
        const itemIndex = existingRestaurant.items.findIndex(
          (i) => i.menu_id === cleanedItem.menu_id
        );

        if (itemIndex > -1) {
          existingRestaurant.items[itemIndex].quantity += 1;
        } else {
          existingRestaurant.items.push({ ...cleanedItem, quantity: 1 });
        }

        const newCart = [...prevCart];
        newCart[restaurantIndex] = existingRestaurant;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            restaurant_id: restaurant.restaurant_id,
            restaurant_name: restaurant.name,
            items: [{ ...cleanedItem, quantity: 1 }],
          },
        ];
      }
    });
  };

  const updateQuantity = (restaurant_id, menu_id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((restaurantGroup) => {
        if (restaurantGroup.restaurant_id !== restaurant_id) return restaurantGroup;
        return {
          ...restaurantGroup,
          items: restaurantGroup.items.map((item) =>
            item.menu_id === menu_id
              ? { ...item, quantity: Number(quantity) }
              : item
          ),
        };
      })
    );
  };

  const removeFromCart = (restaurant_id, menu_id) => {
    setCart((prevCart) =>
      prevCart
        .map((restaurantGroup) => {
          if (restaurantGroup.restaurant_id !== restaurant_id) return restaurantGroup;
          return {
            ...restaurantGroup,
            items: restaurantGroup.items.filter(
              (item) => item.menu_id !== menu_id
            ),
          };
        })
        .filter((group) => group.items.length > 0)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
