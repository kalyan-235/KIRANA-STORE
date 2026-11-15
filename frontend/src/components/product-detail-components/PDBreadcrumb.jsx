import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PDBreadcrumb
 * Props:
 *  catId      — category id
 *  catName    — category display name
 *  subcatName — subcategory display name
 *  productName— current product name
 */
const PDBreadcrumb = ({ catId, catName, subcatName, productName }) => {
  return (
    <div className="pd-breadcrumb">
      <div className="pd-bc-inner">
        <Link to="/">🏠</Link>
        <span className="bc-sep">›</span>
        <Link to="/categories">Categories</Link>
        <span className="bc-sep">›</span>
        <Link to={`/categories/${catId}`}>{catName}</Link>
        <span className="bc-sep">›</span>
        <Link to={`/categories/${catId}`}>{subcatName}</Link>
        <span className="bc-sep">›</span>
        <span className="bc-active">{productName}</span>
      </div>
    </div>
  );
};

export default PDBreadcrumb;
