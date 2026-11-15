import React from 'react';
import { Link } from 'react-router-dom';

/**
 * APBreadcrumb
 * Props:
 *  activeLabel — current selected category/subcat name
 *  hasSelection — bool (is a category selected?)
 *  onReset    — fn() reset selection to All Products
 */
const APBreadcrumb = ({ activeLabel, hasSelection, onReset }) => {
  return (
    <div className="ap-breadcrumb">
      <div className="ap-bc-inner">
        <Link to="/">🏠</Link>
        <span className="bc-sep">›</span>

        {hasSelection ? (
          <>
            <button className="bc-btn" onClick={onReset}>
              All Products
            </button>
            <span className="bc-sep">›</span>
            <span className="bc-active">{activeLabel}</span>
          </>
        ) : (
          <span className="bc-active">All Products</span>
        )}
      </div>
    </div>
  );
};

export default APBreadcrumb;
