import React from 'react';

/**
 * CartItemCard
 * Renders a single product row in the cart.
 *
 * Props:
 *  item        — cart item object
 *  onIncrease  — fn(id) increase qty
 *  onDecrease  — fn(id) decrease qty
 *  onRemove    — fn(id) remove item
 */
const CartItemCard = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="cart-item-card">

      {/* Product image */}
      <div className="cart-item-img">
        <img src={item.img} alt={item.name} loading="lazy" />
      </div>

      {/* Product info */}
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-weight">Weight: {item.weight}</p>

        <div className="cart-item-price-row">
          <span className="cart-item-price">₹{item.price}</span>
          <span className="cart-item-original">₹{item.original}</span>
          <span className="cart-item-discount">{item.discount}% OFF</span>
        </div>
      </div>

      {/* Quantity + Remove */}
      <div className="cart-item-actions">

        {/* Qty control */}
        <div className="cart-qty-ctrl">
          <button
            type="button"
            className="cart-qty-btn"
            onClick={() => onDecrease(item.key)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="cart-qty-num">{item.qty}</span>
          <button
            type="button"
            className="cart-qty-btn"
            onClick={() => onIncrease(item.key)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Item total */}
        <p className="cart-item-total">
          ₹{(item.price * item.qty).toLocaleString()}
        </p>

        {/* Remove button */}
        <button
          type="button"
          className="cart-remove-btn"
          onClick={() => onRemove(item.key)}
          aria-label={`Remove ${item.name}`}
        >
          <svg className="cart-delete-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" />
          </svg>
          <span className="cart-remove-text">Remove</span>
        </button>

      </div>
    </div>
  );
};

export default CartItemCard;
