import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';

/**
 * PDRelatedProducts — Bottom section: related products grid.
 *
 * Props:
 *  relatedProducts — array of product objects
 *  catId           — current category id (for links)
 *  catImg          — fallback image
 */
const PDRelatedProducts = ({ relatedProducts, catId, catImg }) => {
  const { addToCart } = useCart();
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="pd-related">
      <div className="pd-related-container">

        {/* Header */}
        <div className="pd-related-header">
          <h2>⭐ Related Products</h2>
          <Link to={`/categories/${catId}`} className="pd-view-all">
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="pd-related-grid">
          {relatedProducts.map((rp) => (
            <Link
              key={rp.id}
              to={`/product/${rp.id}`}
              className="pd-related-card"
            >
              <div className="rp-img">
                <img src={rp.img || catImg} alt={rp.name} loading="lazy" />
              </div>
              <p className="rp-brand">{rp.name.split(' ').slice(0, 2).join(' ')}</p>
              <p className="rp-name">{rp.name}</p>
              <p className="rp-weight">{rp.weight}</p>
              <p className="rp-price">₹{rp.price}</p>
              <button
                type="button"
                className="rp-cart-btn"
                disabled={!rp.inStock}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  addToCart(rp);
                }}
              >
                🛒 Add to Cart
              </button>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PDRelatedProducts;
