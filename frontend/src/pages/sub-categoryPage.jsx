import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategory, getProducts } from '../services/api';
import { useCart } from '../context/useCart';
import '../styles/sub-categoryPage.css';

const PRODUCTS_PER_PAGE = 25;

const SubCategoryPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [category, setCategory] = useState(null);
  const [subcategoryCounts, setSubcategoryCounts] = useState({});
  const [loadedId, setLoadedId] = useState(null);
  const [error, setError] = useState('');

  const [activeSubcat, setActiveSubcat] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [page, setPage] = useState(1);

  useEffect(() => {
    let active = true;
    Promise.all([getCategory(id), getProducts({ category: id, limit: 50 })])
      .then(async ([categoryData, productResult]) => {
        const countEntries = await Promise.all(
          categoryData.subcategories
            .filter((subcategory) => subcategory.id !== 'all')
            .map(async (subcategory) => {
              const result = await getProducts({
                category: id,
                subcat: subcategory.id,
                limit: 1,
              });
              return [subcategory.id, result.total];
            })
        );
        if (!active) return;
        setCategory({
          ...categoryData,
          products: productResult.data.map((product) => ({ ...product, id: product._id })),
        });
        setSubcategoryCounts(Object.fromEntries([
          ['all', productResult.total],
          ...countEntries,
        ]));
        setError('');
        setActiveSubcat('all');
        setPage(1);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoadedId(id);
      });
    return () => { active = false; };
  }, [id]);

  // ── If category not found ──
  const categoryProducts = useMemo(() => category?.products || [], [category]);
  const filteredProducts = useMemo(() => {
    let list =
      activeSubcat === 'all'
        ? categoryProducts
        : categoryProducts.filter((product) => product.subcat === activeSubcat);

    if (sortBy === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === 'discount') list = [...list].sort((a, b) => b.discount - a.discount);

    return list;
  }, [activeSubcat, sortBy, categoryProducts]);

  if (loadedId !== id) {
    return <p>Loading category...</p>;
  }

  if (error || !category) {
    return (
      <div className="subcat-not-found">
        <span>😕</span>
        <h2>{error || 'Category not found'}</h2>
        <Link to="/categories" className="back-btn">← Back to Categories</Link>
      </div>
    );
  }

  // ── Pagination ──
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  // ── Sub-category product counts ──
  const getCount = (subcatId) => {
    return subcategoryCounts[subcatId] ?? 0;
  };

  // Handle subcat click — reset page
  const handleSubcat = (subcatId) => {
    setActiveSubcat(subcatId);
    setPage(1);
  };

  return (
    <main className="subcat-page">

      {/* ═══════════════════════════════
          HERO / CATEGORY BANNER
      ═══════════════════════════════ */}
      <section className="subcat-hero">
        {/* Background image */}
        <img
          src={category.img}
          alt={category.name}
          className="subcat-hero-bg"
        />
        {/* Dark overlay */}
        <div className="subcat-hero-overlay" />
        {/* Text on top */}
        <div className="subcat-hero-inner">
          <div className="subcat-hero-text">
            <h1>{category.name}</h1>
            <p>{category.tagline}</p>
          </div>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className="subcat-breadcrumb">
        <div className="subcat-breadcrumb-inner">
          <Link to="/">🏠</Link>
          <span className="bc-sep">›</span>
          <Link to="/categories">Categories</Link>
          <span className="bc-sep">›</span>
          <span className="bc-active">{category.name}</span>
        </div>
      </div>

      {/* ═══════════════════════════════
          SIDEBAR + MAIN CONTENT
      ═══════════════════════════════ */}
      <div className="subcat-body">
        <div className="subcat-container">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="subcat-sidebar">
            <div className="sidebar-header">
              <span>⊞</span>
              <h3>Sub Categories</h3>
            </div>

            <ul className="sidebar-list">
              {category.subcategories.map((sub) => (
                <li key={sub.id}>
                  <button
                    type="button"
                    className={`sidebar-item${activeSubcat === sub.id ? ' active' : ''}`}
                    onClick={() => handleSubcat(sub.id)}
                  >
                    <span className="sidebar-emoji">{sub.emoji}</span>
                    <span className="sidebar-name">{sub.name}</span>
                    <span className="sidebar-count">{getCount(sub.id)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* ── RIGHT MAIN CONTENT ── */}
          <section className="subcat-main">

            {/* Top bar: title + sort + view toggle */}
            <div className="subcat-topbar">
              <div className="subcat-topbar-left">
                <h2>
                  {activeSubcat === 'all'
                    ? category.name
                    : category.subcategories.find((s) => s.id === activeSubcat)?.name}
                </h2>
                <span className="product-count">({filteredProducts.length} Products)</span>
              </div>
              <div className="subcat-topbar-right">
                <label htmlFor="sort-select" className="sort-label">Sort by:</label>
                <select
                  id="sort-select"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Discount</option>
                </select>
                <div className="view-toggle">
                  <button
                    type="button"
                    className={`view-btn${viewMode === 'grid' ? ' active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                    title="Grid view"
                  >
                    ⊞
                  </button>
                  <button
                    type="button"
                    className={`view-btn${viewMode === 'list' ? ' active' : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                    title="List view"
                  >
                    ☰
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {paginatedProducts.length === 0 ? (
              <div className="no-products">
                <span>📦</span>
                <p>No products found in this subcategory.</p>
              </div>
            ) : (
              <div className={`products-grid${viewMode === 'list' ? ' list-mode' : ''}`}>
                {paginatedProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className={`product-card${viewMode === 'list' ? ' list-card' : ''}`}
                  >
                    {/* Discount badge */}
                    {product.discount > 0 && (
                      <span className="product-badge">{product.discount}% OFF</span>
                    )}

                    {/* Product image area */}
                    <div className="product-img-wrap">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="product-img"
                        loading="lazy"
                      />
                    </div>

                    {/* Info */}
                    <div className="product-info">
                      <p className="product-name">{product.name}</p>
                      <p className="product-weight">{product.weight}</p>

                      {/* Price */}
                      <div className="product-price-row">
                        <span className="product-original">₹{product.original}</span>
                        <span className="product-price">₹{product.price}</span>
                      </div>

                      {/* Stock */}
                      <div className={`product-stock${product.inStock ? '' : ' out'}`}>
                        {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                      </div>

                      {/* Add to cart — stop propagation so card click doesn't fire */}
                      <button
                        type="button"
                        className={`add-to-cart${!product.inStock ? ' disabled' : ''}`}
                        disabled={!product.inStock}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        🛒 Add to Cart
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  className="page-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`page-btn${page === p ? ' active' : ''}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  type="button"
                  className="page-btn"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  ›
                </button>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
};

export default SubCategoryPage;
