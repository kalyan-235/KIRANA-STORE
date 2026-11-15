import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';

/**
 * APProductCard — single product card (grid or list mode).
 *
 * Props:
 *  product  — product object with catId, id, img, name, etc.
 *  listMode — bool
 */
const APProductCard = ({ product, listMode }) => {
  const { addToCart } = useCart();

  return (
    <Link
      to={`/product/${product.id}`}
      className={`ap-product-card${listMode ? ' list-card' : ''}`}
    >
      {/* Discount badge */}
      {product.discount > 0 && (
        <span className="ap-badge">{product.discount}% OFF</span>
      )}

      {/* Image */}
      <div className="ap-product-img">
        <img
          src={product.img}
          alt={product.name}
          className="ap-prod-img"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="ap-product-info">
        <span className="ap-product-cat">{product.catName}</span>
        <p className="ap-product-name">{product.name}</p>
        <p className="ap-product-weight">{product.weight}</p>

        <div className="ap-price-row">
          <span className="ap-price">₹{product.price}</span>
          <span className="ap-original">₹{product.original}</span>
        </div>

        <div className={`ap-stock${product.inStock ? '' : ' out'}`}>
          {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
        </div>

        <button
          type="button"
          className={`ap-cart-btn${!product.inStock ? ' disabled' : ''}`}
          disabled={!product.inStock}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            addToCart(product);
          }}
        >
          🛒 Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default APProductCard;
