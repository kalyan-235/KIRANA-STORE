import React from 'react';
import { Link } from 'react-router-dom';
import CartItemCard from './CartItemCard';
import FreeDeliveryBar from './FreeDeliveryBar';

/**
 * CartItemList  — Left section of the cart page
 *
 * Props:
 *  cartItems   — array of cart item objects
 *  totalPrice  — calculated total (for delivery bar)
 *  onIncrease  — fn(id)
 *  onDecrease  — fn(id)
 *  onRemove    — fn(id)
 */
const CartItemList = ({ cartItems, totalPrice, onIncrease, onDecrease, onRemove }) => {
  return (
    <section className="cart-items-section">

      {/* Free delivery progress bar */}
      <FreeDeliveryBar totalPrice={totalPrice} />

      {/* Product cards */}
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <CartItemCard
            key={item.key}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="cart-continue">
        <Link to="/categories" className="cart-continue-btn">
          ← Continue Shopping
        </Link>
      </div>

    </section>
  );
};

export default CartItemList;
