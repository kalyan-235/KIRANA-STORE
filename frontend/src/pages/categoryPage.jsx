import React, { useEffect, useMemo, useState } from 'react';
import CategoryHeader from '../components/category-components/CategoryHeader';
import CategoryGrid   from '../components/category-components/CategoryGrid';
import APProductGrid from '../components/all-products-components/APProductGrid';
import { getCategories, getProducts } from '../services/api';
import '../styles/categorypage.css';
import '../styles/all-products.css';

const CategoryPage = () => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [productPage, setProductPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [productTotal, setProductTotal] = useState(0);
  const [loadedProductKey, setLoadedProductKey] = useState('');
  const [productsError, setProductsError] = useState('');

  const productRequestKey = JSON.stringify([productCategory, search, sortBy, productPage]);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.map((category) => ({
        ...category,
        id: category._id,
        sub: category.subcategories.map((subcategory) => subcategory.name),
      }))))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    let active = true;
    getProducts({
      category: productCategory || undefined,
      search: search.trim() || undefined,
      sortBy,
      page: productPage,
      limit: 20,
    })
      .then((result) => {
        if (!active) return;
        setProductsError('');
        setProducts(result.data.map((product) => ({
          ...product,
          id: product._id,
          catId: product.category?._id,
          catName: product.category?.name || '',
        })));
        setProductTotal(result.total);
      })
      .catch((requestError) => {
        if (!active) return;
        setProducts([]);
        setProductTotal(0);
        setProductsError(requestError.message);
      })
      .finally(() => {
        if (active) setLoadedProductKey(productRequestKey);
      });
    return () => { active = false; };
  }, [productCategory, productRequestKey, productPage, search, sortBy]);

  const filtered = useMemo(() => categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  ), [categories, search]);
  const totalPages = Math.ceil(productTotal / 20);
  const productsLoading = loadedProductKey !== productRequestKey;

  return (
    <main className="cat-page">
      <CategoryHeader
        search={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setProductPage(1);
        }}
      />

      {error ? <p role="alert">{error}</p> : null}
      {!error && !loaded ? <p>Loading categories...</p> : null}

      <section className="section categories-section mobile-category-strip">
        <div className="section-container">
          {filtered.length === 0 && loaded && !error ? (
            <p className="mobile-category-empty">No categories found.</p>
          ) : (
            <div className="categories-grid">
              {filtered.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className={`category-card${productCategory === category.id ? ' selected' : ''}`}
                  aria-pressed={productCategory === category.id}
                  onClick={() => {
                    setProductCategory(category.id);
                    setProductPage(1);
                  }}
                >
                  <div className="cat-img-wrap">
                    <img
                      src={category.img}
                      alt={category.name}
                      className="cat-img"
                      loading="lazy"
                    />
                  </div>
                  <span className="cat-name">{category.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="cat-grid-section">
        <div className="cat-grid-container">
          <CategoryGrid categories={filtered} search={search} />
        </div>
      </section>

      <section className="mobile-product-catalog">
        <div className="mobile-catalog-controls">
          <label className="mobile-catalog-control">
            <span aria-hidden="true">☷</span>
            <select
              value={productCategory}
              onChange={(event) => {
                setProductCategory(event.target.value);
                setProductPage(1);
              }}
              aria-label="Filter products by category"
            >
              <option value="">Filter</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <label className="mobile-catalog-control">
            <span aria-hidden="true">↕</span>
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
                setProductPage(1);
              }}
              aria-label="Sort products"
            >
              <option value="default">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Most Discount</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>

        <div className="mobile-catalog-heading">
          <h2>All Products</h2>
          <span>{productTotal} Products</span>
        </div>

        {productsError ? <p role="alert">{productsError}</p> : null}
        {productsLoading && !productsError ? <p>Loading products...</p> : (
          !productsError && (
            <APProductGrid
              products={products}
              viewMode="grid"
              search={search}
              page={productPage}
              totalPages={totalPages}
              onPageChange={setProductPage}
              onClearSearch={() => { setSearch(''); setProductPage(1); }}
            />
          )
        )}
      </section>
    </main>
  );
};

export default CategoryPage;
