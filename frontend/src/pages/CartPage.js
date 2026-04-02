import { useCart } from "../components/CartContext";
import API from "../services/api";
import "./CartPage.css";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, group) => {
      const groupTotal = group.items.reduce((sum, item) => {
        const price = Number(item?.price);
        return sum + (isNaN(price) ? 0 : price * item.quantity);
      }, 0);
      return total + groupTotal;
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      for (const group of cart) {
        const menuIds = group.items.flatMap((item) =>
          Array(item.quantity).fill(item.menu_id)
        );

        console.log("📦 Sending menuIds:", menuIds);

        if (!Array.isArray(menuIds) || menuIds.length === 0) {
          alert("❌ Invalid items in cart. Cannot proceed.");
          return;
        }

        const totalGroupPrice = group.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        await API.post(`/restaurants/${group.restaurant_id}/order`, {
          items: menuIds,
          price: totalGroupPrice
        });
      }

      alert("✅ Order(s) placed successfully!");
      clearCart();
      window.location.href = "/orders";
    } catch (err) {
      console.error("❌ Order error:", err);
      alert("Order failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((group, i) => (
            <div key={i} className="restaurant-cart">
              <h3>🍽️ {group.restaurant_name}</h3>
              <ul>
                {group.items.map((item, j) => {
                  const itemPrice = Number(item?.price);
                  const validPrice = !isNaN(itemPrice)
                    ? itemPrice.toFixed(2)
                    : "0.00";
                  const subtotal = !isNaN(itemPrice)
                    ? (itemPrice * item.quantity).toFixed(2)
                    : "0.00";

                  return (
                    <li key={j} className="cart-item">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                      )}
                      <div className="cart-item-info">
                        <strong>{item.name}</strong>
                        <span>₹{validPrice} per unit</span>
                      </div>
                      <div className="cart-item-controls">
                        <input
                          type="number"
                          min="1"
                          className="quantity-input"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              group.restaurant_id,
                              item.menu_id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                        <span>₹{subtotal}</span>
                        <button
                          className="remove-btn"
                          onClick={() =>
                            removeFromCart(group.restaurant_id, item.menu_id)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{calculateTotal().toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout & Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
