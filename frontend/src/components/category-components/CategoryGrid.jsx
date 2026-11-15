import React from 'react';
import CategoryCard from './CategoryCard';

/**
 * CategoryGrid
 * Renders the 3-column grid of category cards, or a no-results message.
 *
 * Props:
 *  categories — filtered array of category objects
 *  search     — current search string (for no-results message)
 */
const CategoryGrid = ({ categories, search }) => {
  if (categories.length === 0) {
    return (
      <div className="no-results">
        <span>😕</span>
        <p>No categories found for "<strong>{search}</strong>"</p>
      </div>
    );
  }

  return (
    <div className="cat-grid">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
};

export default CategoryGrid;
