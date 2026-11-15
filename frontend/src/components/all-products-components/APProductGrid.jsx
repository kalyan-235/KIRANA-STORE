import React from 'react';
import APProductCard from './APProductCard';

/**
 * APProductGrid — product grid + empty state + pagination.
 *
 * Props:
 *  products    — paginated product array
 *  viewMode    — 'grid' | 'list'
 *  search      — current search string (for empty message)
 *  page        — current page number
 *  totalPages  — total number of pages
 *  onPageChange — fn(pageNumber)
 *  onClearSearch — fn()
 */
const APProductGrid = ({
  products, viewMode, search,
  page, totalPages, onPageChange, onClearSearch,
}) => {

  /* ── Empty state ── */
  if (products.length === 0) {
    return (
      <div className="ap-empty">
        <span>📦</span>
        <p>No products found{search ? ` for "${search}"` : ''}.</p>
        {search && (
          <button className="ap-clear-btn" onClick={onClearSearch}>
            Clear Search
          </button>
        )}
      </div>
    );
  }

  /* ── Build smart pagination numbers ── */
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
    .reduce((acc, p, idx, arr) => {
      if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
      acc.push(p);
      return acc;
    }, []);

  return (
    <>
      {/* Product grid */}
      <div className={`ap-products-grid${viewMode === 'list' ? ' list-mode' : ''}`}>
        {products.map((product) => (
          <APProductCard
            key={`${product.catId}-${product.id}`}
            product={product}
            listMode={viewMode === 'list'}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="ap-pagination">

          <button
            type="button"
            className="ap-page-btn"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >‹</button>

          {pageNumbers.map((item, idx) =>
            item === '...' ? (
              <span key={`dots-${idx}`} className="ap-page-dots">…</span>
            ) : (
              <button
                key={item}
                type="button"
                className={`ap-page-btn${page === item ? ' active' : ''}`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            )
          )}

          <button
            type="button"
            className="ap-page-btn"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >›</button>

        </div>
      )}
    </>
  );
};

export default APProductGrid;
