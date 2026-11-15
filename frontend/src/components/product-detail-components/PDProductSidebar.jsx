import React from 'react';

/**
 * PDProductSidebar — Right column: key features + product details table.
 *
 * Props:
 *  features   — string[]
 *  brand      — string
 *  type       — string
 *  category   — string
 *  shelfLife  — string
 *  variantLabel — currently selected weight label
 */
const PDProductSidebar = ({ features, brand, type, category, shelfLife, variantLabel }) => {
  return (
    <aside className="pd-sidebar">

      {/* Key Features */}
      <div className="pd-features-box">
        <h3>
          <span className="box-icon">🛡️</span> Key Features
        </h3>
        <ul>
          {features.map((f, i) => (
            <li key={i}>
              <span className="feat-check">✅</span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Details table */}
      <div className="pd-details-box">
        <h3>Product Details</h3>
        <table className="pd-details-table">
          <tbody>
            <tr><td>Brand</td>     <td>{brand}</td></tr>
            <tr><td>Type</td>      <td>{type}</td></tr>
            <tr><td>Weight</td>    <td>{variantLabel}</td></tr>
            <tr><td>Category</td>  <td>{category}</td></tr>
            <tr><td>Shelf Life</td><td>{shelfLife}</td></tr>
          </tbody>
        </table>
      </div>

    </aside>
  );
};

export default PDProductSidebar;
