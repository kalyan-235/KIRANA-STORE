import React from 'react';

/**
 * APSidebar — Left sidebar with flat subcategory list.
 *
 * Props:
 *  sidebarItems  — flat array of { key, catId, subcatId, name, emoji, count }
 *  allCount      — total products count
 *  selected      — { catId, subcatId }
 *  onSelect      — fn(catId, subcatId)
 *  onReset       — fn() — select All Products
 */
const APSidebar = ({ sidebarItems, allCount, selected, onSelect, onReset }) => {
  const isAllActive = !selected.catId;

  return (
    <aside className="ap-sidebar">

      {/* Header */}
      <div className="ap-sidebar-header">
        <span>☰</span>
        <h3>Sub Categories</h3>
      </div>

      {/* All Products root item */}
      <button
        type="button"
        className={`ap-root-item${isAllActive ? ' active' : ''}`}
        onClick={onReset}
      >
        <span className="ap-root-icon">🛍️</span>
        <span className="ap-root-label">All Products</span>
        <span className="ap-root-count">{allCount}</span>
      </button>

      {/* Flat subcategory list */}
      <ul className="ap-flat-list">
        {sidebarItems.map((item) => {
          const isActive =
            selected.catId === item.catId &&
            (selected.subcatId === item.subcatId ||
              (item.subcatId === 'all' && !selected.subcatId));

          return (
            <li key={item.key}>
              <button
                type="button"
                className={`ap-flat-item${isActive ? ' active' : ''}`}
                onClick={() => onSelect(item.catId, item.subcatId)}
              >
                <span className="ap-flat-emoji">{item.emoji}</span>
                <span className="ap-flat-name">{item.name}</span>
                {Number.isFinite(item.count) && <span className="ap-flat-count">{item.count}</span>}
              </button>
            </li>
          );
        })}
      </ul>

    </aside>
  );
};

export default APSidebar;
