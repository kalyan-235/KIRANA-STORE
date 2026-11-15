import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../services/imageUrl';

const FreshProduceBanner = () => {
  return (
    <section className="fresh-banner">

      {/* Full background image */}
      <img
        src={imageUrl('/bottom-image.webp')}
        alt="Fresh vegetables and fruits"
        className="fresh-bg-img"
      />

      {/* Dark overlay */}
      <div className="fresh-overlay" />

      {/* Text on top */}
      <div className="fresh-content">
        <div className="fresh-text">
          <h2>
            Fresh Vegetables<br />
            <em>&amp; Fruits</em>
          </h2>
          <p>Straight from the Farm!</p>
          <Link to="/categories" className="fresh-btn">
            Shop Fresh Produce →
          </Link>
        </div>
      </div>

    </section>
  );
};

export default FreshProduceBanner;
