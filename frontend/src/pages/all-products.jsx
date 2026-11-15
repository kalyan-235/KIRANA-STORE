import React, { useEffect, useMemo, useState } from 'react';
import { getCategories, getProductCounts, getProducts } from '../services/api';

import APBreadcrumb  from '../components/all-products-components/APBreadcrumb';
import APSidebar     from '../components/all-products-components/APSidebar';
import APTopbar      from '../components/all-products-components/APTopbar';
import APProductGrid from '../components/all-products-components/APProductGrid';
import '../styles/all-products.css';

const PRODUCTS_PER_PAGE = 25;

const AllProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [subcategoryCounts, setSubcategoryCounts] = useState({});
  const [selected, setSelected] = useState({ catId: null, subcatId: null });
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);
  const [loadedKey, setLoadedKey] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [countsError, setCountsError] = useState('');
  const [productsError, setProductsError] = useState('');

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((requestError) => setCategoryError(requestError.message));
    getProductCounts()
      .then(({ data }) => {
        const nextCategoryCounts = {};
        const nextSubcategoryCounts = {};
        let nextAllCount = 0;

        data.forEach(({ categoryId, subcategoryId, count }) => {
          nextCategoryCounts[categoryId] = (nextCategoryCounts[categoryId] || 0) + count;
          nextSubcategoryCounts[`${categoryId}-${subcategoryId}`] = count;
          nextAllCount += count;
        });

        setCategoryCounts(nextCategoryCounts);
        setSubcategoryCounts(nextSubcategoryCounts);
        setAllCount(nextAllCount);
      })
      .catch((requestError) => setCountsError(requestError.message));
  }, []);

  const requestKey = JSON.stringify([selected.catId, selected.subcatId, search, sortBy, page]);

  useEffect(() => {
    let active = true;
    getProducts({
      category: selected.catId,
      subcat: selected.subcatId === 'all' ? undefined : selected.subcatId,
      search: search.trim() || undefined,
      sortBy,
      page,
      limit: PRODUCTS_PER_PAGE,
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
        setTotal(result.total);
      })
      .catch((requestError) => {
        if (active) {
          setProducts([]);
          setTotal(0);
          setProductsError(requestError.message);
        }
      })
      .finally(() => {
        if (active) setLoadedKey(requestKey);
      });
    return () => { active = false; };
  }, [selected, search, sortBy, page, requestKey]);

  const sidebarItems = useMemo(() => categories.flatMap((category) => [
    {
      key: `${category._id}-all`,
      catId: category._id,
      subcatId: 'all',
      name: `All ${category.name}`,
      emoji: category.emoji,
      count: categoryCounts[category._id] || 0,
    },
    ...category.subcategories
      .filter((subcategory) => subcategory.id !== 'all')
      .map((subcategory) => ({
        key: `${category._id}-${subcategory.id}`,
        catId: category._id,
        subcatId: subcategory.id,
        name: subcategory.name,
        emoji: subcategory.emoji,
        count: subcategoryCounts[`${category._id}-${subcategory.id}`] || 0,
      })),
  ]), [categories, categoryCounts, subcategoryCounts]);

  const activeCategory = categories.find((category) => category._id === selected.catId);
  const activeLabel = !activeCategory
    ? 'All Products'
    : !selected.subcatId || selected.subcatId === 'all'
      ? activeCategory.name
      : activeCategory.subcategories.find((subcategory) => subcategory.id === selected.subcatId)?.name
        || activeCategory.name;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const loading = loadedKey !== requestKey;

  const handleSelect = (catId, subcatId) => {
    setSelected({ catId, subcatId });
    setPage(1);
  };
  const handleReset = () => {
    setSelected({ catId: null, subcatId: null });
    setPage(1);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };
  const handleSort = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };
  const handlePage = (nextPage) => {
    setPage(nextPage);
    window.scrollTo(0, 0);
  };

  return (
    <main className="ap-page">
      <APBreadcrumb
        activeLabel={activeLabel}
        hasSelection={!!selected.catId}
        onReset={handleReset}
      />
      <div className="ap-container">
        <div className="ap-layout">
          <APSidebar
            sidebarItems={sidebarItems}
            allCount={allCount}
            selected={selected}
            onSelect={handleSelect}
            onReset={handleReset}
          />
          <section className="ap-main">
            <APTopbar
              activeLabel={activeLabel}
              totalCount={total}
              search={search}
              sortBy={sortBy}
              viewMode={viewMode}
              onSearch={handleSearch}
              onSort={handleSort}
              onViewChange={setViewMode}
            />
            {categoryError ? <p role="alert">{categoryError}</p> : null}
            {countsError ? <p role="alert">{countsError}</p> : null}
            {productsError ? <p role="alert">{productsError}</p> : null}
            {loading ? <p>Loading products...</p> : (
              <APProductGrid
                products={products}
                viewMode={viewMode}
                search={search}
                page={page}
                totalPages={totalPages}
                onPageChange={handlePage}
                onClearSearch={() => { setSearch(''); setPage(1); }}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default AllProductsPage;
