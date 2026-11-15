import React from 'react';
import { useNavigate } from 'react-router-dom';

const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_CHARGE = 40;

/**
 * OrderSummary  — Right section of the cart page
 *
 * Props:
 *  cartItems — array of cart item objects
 */
const OrderSummary = ({ cartItems }) => {
  const navigate = useNavigate();

  /* ── Price calculations ── */
  const subtotal   = cartItems.reduce((sum, i) => sum + i.original * i.qty, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount   = subtotal - totalPrice;
  const delivery   = totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const total      = totalPrice + delivery;
  const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);

  return (
    <aside className="cart-summary">

      <h2 className="summary-title">Order Summary</h2>

      {/* Price rows */}
      <div className="summary-rows">
        <div className="summary-row">
          <span>Subtotal ({totalItems} items)</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="summary-row discount">
          <span>Discount</span>
          <span>− ₹{discount.toLocaleString()}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Charges</span>
          <span className={delivery === 0 ? 'free-tag' : ''}>
            {delivery === 0 ? 'FREE' : `₹${delivery}`}
          </span>
        </div>
      </div>

      <div className="summary-divider" />

      {/* Total */}
      <div className="summary-total">
        <span>Total Amount</span>
        <span>₹{total.toLocaleString()}</span>
      </div>

      {/* Saving message */}
      <p className="summary-saving">
        🎉 You are saving <strong>₹{discount.toLocaleString()}</strong> on this order!
      </p>

      {/* Checkout button */}
      <button
        type="button"
        className="checkout-btn"
        onClick={() => navigate('/checkout')}
      >
        Proceed to Checkout →
      </button>

      {/* Trust badges */}
      <div className="summary-trust">
        <span>🔒 Secure Checkout</span>
        <span>↩️ Easy Returns</span>
        <span>✅ Quality Assured</span>
      </div>

    </aside>
  );
};

export default OrderSummary;
