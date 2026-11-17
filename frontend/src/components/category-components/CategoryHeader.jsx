import React from 'react';
import { Link } from 'react-router-dom';
import MobileSearchBar from '../MobileSearchBar';

/**
 * CategoryHeader
 * Page title, subtitle, search input + breadcrumb.
 *
 * Props:
 *  search    — current search string
 *  onChange  — fn(e) input change handler
 */
const CategoryHeader = ({ search, onChange }) => {
  return (
    <>
      <MobileSearchBar value={search} onChange={onChange} />

      {/* ── Page Header ── */}
      <div className="cat-header">
        <div className="cat-header-inner">
          <h1>All Categories</h1>
          <p>Browse our wide range of fresh and quality products</p>

          <div className="cat-search">
            <span className="cat-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={onChange}
              aria-label="Search categories"
            />
          </div>
        </div>
      </div>

      {/* ── Breadcrumb ── */}
      <div className="breadcrumb-bar">
        <div className="breadcrumb-inner">
          <Link to="/">Home</Link>
          <span className="bc-sep">›</span>
          <span className="bc-active">All Categories</span>
        </div>
      </div>
    </>
  );
};

export default CategoryHeader;
