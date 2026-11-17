import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../services/api';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.slice(0, 8).map((category) => ({
        ...category,
        id: category._id,
      }))))
      .catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <section className="section categories-section">
      <div className="section-container">

        <div className="section-title">
          <span className="line" />
          <h2>Shop by Categories</h2>
          <span className="line" />
          <Link to="/categories" className="mobile-category-view-all">
            View All →
          </Link>
        </div>

        {error ? <p role="alert">{error}</p> : null}
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              to={`/categories?category=${encodeURIComponent(cat.id)}`}
              key={cat.id}
              className="category-card"
            >
              <div className="cat-img-wrap">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="cat-img"
                  loading="lazy"
                />
              </div>
              <span className="cat-name">{cat.name}</span>
            </Link>
          ))}
        </div>

        <div className="center-btn">
          <Link to="/categories" className="outline-btn">
            View All Categories →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CategoriesSection;
