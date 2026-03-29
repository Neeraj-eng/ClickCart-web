import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import CheckoutPopup from "./CheckoutPopup";
import { Button } from "react-bootstrap";
import Footer from "./Footer";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // ✅ Sync cart with local state
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  // ✅ Calculate total price
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  // ✅ Increase quantity
  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  // ✅ Decrease quantity
  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCartItems(updatedCart);
  };

  // ✅ Remove item
  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  // ✅ Simple checkout
  const handleCheckout = () => {
    alert("Order placed successfully!");
    clearCart();
    setCartItems([]);
    setShowModal(false);
  };

  return (
    <div className="cart-container">
      <div className="shopping-cart">
        <div className="title">Shopping Bag</div>

        {cartItems.length === 0 ? (
          <div className="empty" style={{ padding: "2rem" }}>
            <h4>Your cart is empty</h4>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <div
                  className="item"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {/* ✅ Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100px", height: "80px", objectFit: "cover" }}
                  />

                  {/* ✅ Info */}
                  <div className="description" style={{ marginLeft: "10px" }}>
                    <span>{item.brand}</span>
                    <br />
                    <span>{item.name}</span>
                  </div>

                  {/* ✅ Quantity */}
                  <div className="quantity" style={{ marginLeft: "20px" }}>
                    <button onClick={() => handleIncreaseQuantity(item._id)}>
                      +
                    </button>

                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      style={{ width: "40px", textAlign: "center" }}
                    />

                    <button onClick={() => handleDecreaseQuantity(item._id)}>
                      -
                    </button>
                  </div>

                  {/* ✅ Price */}
                  <div
                    className="total-price"
                    style={{ marginLeft: "20px" }}
                  >
                    ₹ {item.price * item.quantity}
                  </div>

                  {/* ✅ Remove */}
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    style={{ marginLeft: "20px" }}
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}

            {/* ✅ Total */}
            <div className="total" style={{ marginTop: "20px" }}>
              <h4>Total: ₹ {totalPrice}</h4>
            </div>

            {/* ✅ Checkout */}
            <Button
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "10px" }}
              onClick={() => setShowModal(true)}
            >
              Checkout
            </Button>
          </>
        )}
      </div>

      {/* ✅ Popup */}
      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
      />

      <Footer />
    </div>
  );
};

export default Cart;