import React from 'react';

const MobileSearchBar = ({ value, onChange }) => (
  <div className="mobile-home-search" role="search">
    <input
      type="search"
      placeholder="Search for products..."
      aria-label="Search for products"
      value={value}
      onChange={onChange}
    />
    <span className="mobile-home-search-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </svg>
    </span>
  </div>
);

export default MobileSearchBar;
