import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CategoryCard
 * Single category card — text left, image right.
 *
 * Props:
 *  cat — { id, name, img, bg, sub[] }
 */
const CategoryCard = ({ cat }) => {
  return (
    <div
      className="cat-card"
      style={{ backgroundColor: cat.bg || '#f6f7f6' }}
    >
      {/* ── Left: name + sub-list + button ── */}
      <div className="cat-card-body">
        <div className="cat-card-title-row">
          <h3 className="cat-card-name">{cat.name}</h3>
          {/* <span className="cat-card-arrow">›</span> */}
        </div>

        <ul className="cat-sub-list">
          {(cat.sub || cat.subcategories?.map((subcategory) => subcategory.name) || []).slice(0, 4).map((s) => (
            <li key={s}>
              <Link to={`/categories/${cat.id}`}>• {s}</Link>
            </li>
          ))}
        </ul>

        <Link to={`/categories/${cat.id}`} className="cat-view-btn">
          View all ›
        </Link>
      </div>

      {/* ── Right: image ── */}
      <div className="cat-card-img-wrap">
        <img
          src={cat.img}
          alt={cat.name}
          className="cat-card-img"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CategoryCard;
