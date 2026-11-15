import React from 'react';

/**
 * APTopbar — Search + Sort + View Toggle + title bar.
 *
 * Props:
 *  activeLabel  — current section title
 *  totalCount   — number of filtered products
 *  search       — current search value
 *  sortBy       — current sort value
 *  viewMode     — 'grid' | 'list'
 *  onSearch     — fn(e)
 *  onSort       — fn(e)
 *  onViewChange — fn('grid'|'list')
 */
const APTopbar = ({
  activeLabel, totalCount,
  search, sortBy, viewMode,
  onSearch, onSort, onViewChange,
}) => {
  return (
    <div className="ap-topbar">

      {/* Left: title + count */}
      <div className="ap-topbar-left">
        <h2>{activeLabel}</h2>
        <span className="ap-count">({totalCount} Products)</span>
      </div>

      {/* Right: search + sort + view toggle */}
      <div className="ap-topbar-right">

        {/* Search */}
        <div className="ap-search">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={onSearch}
            aria-label="Search products"
          />
        </div>

        {/* Sort */}
        <select
          className="ap-sort"
          value={sortBy}
          onChange={onSort}
          aria-label="Sort products"
        >
          <option value="default">Default</option>
          <option value="name">Name A–Z</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Most Discount</option>
        </select>

        {/* View toggle */}
        <div className="ap-view-toggle">
          <button
            type="button"
            className={`ap-view-btn${viewMode === 'grid' ? ' active' : ''}`}
            onClick={() => onViewChange('grid')}
            title="Grid view"
          >⊞</button>
          <button
            type="button"
            className={`ap-view-btn${viewMode === 'list' ? ' active' : ''}`}
            onClick={() => onViewChange('list')}
            title="List view"
          >☰</button>
        </div>

      </div>
    </div>
  );
};

export default APTopbar;
