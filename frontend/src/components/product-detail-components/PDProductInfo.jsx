import React from 'react';
import { useNavigate } from 'react-router-dom';
import PDStars from './PDStars';

/**
 * PDProductInfo — Center column:
 *   name, description, rating, price, weight selector, qty, cart/buy buttons, trust badges.
 *
 * Props:
 *  pd               — full product object
 *  variant          — currently selected variant { label, price, original, discount }
 *  selectedVariant  — index
 *  qty              — current qty
 *  cartMsg          — success message string (or '')
 *  onVariantChange  — fn(index)
 *  onQtyIncrease    — fn()
 *  onQtyDecrease    — fn()
 *  onAddToCart      — fn()
 */
const PDProductInfo = ({
  pd, variant, selectedVariant, qty, cartMsg,
  onVariantChange, onQtyIncrease, onQtyDecrease, onAddToCart,
}) => {
  const navigate = useNavigate();

  return (
    <div className="pd-info">

      {/* Name + description */}
      <h1 className="pd-name">{pd.name}</h1>
      <p className="pd-desc">{pd.description}</p>

      {/* Rating row */}
      <div className="pd-rating-row">
        <PDStars rating={pd.rating} />
        <span className="pd-rating-num">{pd.rating}</span>
        <span className="pd-reviews">({pd.reviews.toLocaleString()} Reviews)</span>
        <span className={`pd-stock-badge${pd.inStock ? '' : ' out'}`}>
          {pd.inStock ? '✅ In Stock' : '❌ Out of Stock'}
        </span>
      </div>

      {/* Price */}
      <div className="pd-price-block">
        <span className="pd-price">₹{variant.price}</span>
        <span className="pd-mrp">₹{variant.original}</span>
        {variant.discount > 0 && (
          <span className="pd-discount-tag">{variant.discount}% OFF</span>
        )}
      </div>
      <p className="pd-tax-note">Inclusive of all taxes</p>

      {/* Weight / Variant selector */}
      <div className="pd-select-row">
        <span className="pd-select-label">Select Weight:</span>
        <div className="pd-variants">
          {pd.variants.map((v, i) => (
            <button
              key={i}
              type="button"
              className={`pd-variant-btn${selectedVariant === i ? ' active' : ''}`}
              onClick={() => onVariantChange(i)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="pd-qty-row">
        <span className="pd-select-label">Quantity:</span>
        <div className="pd-qty-ctrl">
          <button
            type="button"
            className="pd-qty-btn"
            onClick={onQtyDecrease}
            aria-label="Decrease quantity"
          >−</button>
          <span className="pd-qty-num">{qty}</span>
          <button
            type="button"
            className="pd-qty-btn"
            onClick={onQtyIncrease}
            aria-label="Increase quantity"
          >+</button>
        </div>
      </div>

      {/* Cart message */}
      {cartMsg && <div className="pd-cart-msg">{cartMsg}</div>}

      {/* Action buttons */}
      <div className="pd-actions">
        <button
          type="button"
          className="pd-add-cart"
          onClick={onAddToCart}
          disabled={!pd.inStock}
        >
          🛒 Add to Cart
        </button>
        <button
          type="button"
          className="pd-buy-now"
          onClick={() => navigate('/checkout')}
          disabled={!pd.inStock}
        >
          ⚡ Buy Now
        </button>
      </div>

      {/* Trust badges */}
      <div className="pd-trust">
        <div className="trust-item">
          <span>🚚</span>
          <div>
            <p>Free Delivery</p>
            <small>Above ₹500</small>
          </div>
        </div>
        <div className="trust-item">
          <span>🔒</span>
          <div>
            <p>Secure Payments</p>
            <small>UPI / Cards</small>
          </div>
        </div>
        <div className="trust-item">
          <span>↩️</span>
          <div>
            <p>Easy Returns</p>
            <small>Within 7 Days</small>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PDProductInfo;
