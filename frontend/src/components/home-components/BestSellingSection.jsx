import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/api';
import { useCart } from '../../context/useCart';

const BestSellingSection = () => {
  const { addToCart } = useCart();
  const [bestSelling, setBestSelling] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getProducts({ sortBy: 'discount', limit: 5 })
      .then((result) => setBestSelling(result.data))
      .catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <section className="section offers-section">
      <div className="section-container">

        <div className="offers-header">
          <h2>🔥 Best Selling Products</h2>
          <Link to="/all-products" className="view-all">View All →</Link>
        </div>

        {error ? <p role="alert">{error}</p> : null}
        <div className="offers-grid">
          {bestSelling.map((item) => (
            <div key={item._id} className="offer-card">
              <span className="offer-tag">{item.discount}% OFF</span>

              <div className="offer-img-wrap">
                <img src={item.img} alt={item.name} loading="lazy" />
              </div>

              <p className="offer-name">{item.name} ({item.weight})</p>

              <div className="offer-price">
                <span className="original">₹{item.original}</span>
                <span className="discounted">₹{item.price}</span>
              </div>

              <button
                type="button"
                className="add-cart-btn"
                disabled={!item.inStock}
                onClick={() => addToCart(item)}
              >
                🛒 Add to Cart
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BestSellingSection;
